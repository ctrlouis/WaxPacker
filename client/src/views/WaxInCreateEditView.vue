<template>
    <h1 v-if="mode === 'create'">Ajouter un lot d'entrée</h1>
    <h1 v-if="mode === 'edit'">Modifier un lot d'entrée</h1>
    <q-input v-model="number" dark standout label="Numéro de lot" required />
    <q-input v-model="label" dark standout label="Nom" />
    <q-input v-model="weightOriginal" dark standout label="Quantité (Kg)" type="number" min="0" />
    <q-input v-model="entryDate" dark standout label="Date d'entrée" type="date" />
    <q-toggle v-model="perso" color="green" label="Lot perso" />
    <q-toggle v-model="bio" color="green" label="Bio" />
    <ThirdPartiesSelect v-model="thirdPartieSelected" />
    <q-btn v-if="mode === 'create'" label="Ajouter" color="orange" @click="onCreate" />
    <q-btn v-if="mode === 'edit'" flat label="Annuler" color="orange" @click="goItemPage" />
    <q-btn v-if="mode === 'edit'" label="Modifier" color="orange" @click="onEdit" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';
import ThirdPartiesSelect from '@/components/thirdPartiesSelect.vue';

const route = useRoute();
const router = useRouter();
const id = ref(String(route.params.id));

const {
    item: waxInItem,
    sync: syncWaxInItem,
    create: createWaxInItem,
    update: updateWaxInItem,
} = usePocketbaseItem('wax_in');

const number = ref(defaultNumber());
const label = ref("");
const weightOriginal = ref(0);
const entryDate = ref();
const perso = ref(false);
const bio = ref(false);
const thirdPartieSelected = ref();

function defaultNumber() {
    return `EC-${DateTime.now().toFormat('yyMMdd')}`;
}

function initEdit() {
    if (waxInItem.value) {
        number.value = waxInItem.value.number;
        label.value = waxInItem.value.label;
        weightOriginal.value = waxInItem.value.weight_original;
        entryDate.value = waxInItem.value.entry_date;
        perso.value = waxInItem.value.perso;
        bio.value = waxInItem.value.bio;
        initDate();
        initTirdPartie();
    }
}

function initDate() {
    const format = ('yyyy-MM-dd');
    let date = DateTime.now().toFormat(format);
    if (waxInItem.value) {
        date = DateTime.fromSQL(waxInItem.value.entry_date).toFormat(format);
    }
    entryDate.value = date;
}

function initTirdPartie() {
    let thirdPartie = null;
    if (waxInItem.value && waxInItem.value.expand && waxInItem.value.expand.third_partie) {
        thirdPartie = {
            label: waxInItem.value.expand.third_partie.name,
            value: waxInItem.value.expand.third_partie,
        };
    }
    thirdPartieSelected.value = thirdPartie;
}

async function onCreate() {
    try {
        const data = {
            number: number.value,
            label: label.value,
            weight_original: weightOriginal.value,
            weight_left: weightOriginal.value,
            entry_date: entryDate.value,
            perso: perso.value,
            bio: bio.value,
            third_partie: thirdPartieSelected.value.value.id
        }
        await createWaxInItem(data);
        router.push({ name: 'WaxInView' });
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

async function onEdit() {
    try {
        if (!waxInItem.value) throw new Error("Aucuns lot d'entrée trouvé");
        const data: any = {};
        if (number.value !== waxInItem.value.number) data.number = number.value;
        if (label.value !== waxInItem.value.label) data.label = label.value;
        if (weightOriginal.value !== waxInItem.value.weight_original) data.weight_original = weightOriginal.value;
        if (entryDate.value !== waxInItem.value.entry_date) data.entry_date = entryDate.value;
        if (perso.value !== waxInItem.value.perso) data.perso = perso.value;
        if (bio.value !== waxInItem.value.bio) data.bio = bio.value;
        if (thirdPartieSelected.value !== waxInItem.value.third_partie) data.third_partie = thirdPartieSelected.value.value.id;
        await updateWaxInItem(data);
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

function goItemPage() {
    router.push({ name: 'WaxInItemView', params: { id: id.value } });
}

const mode = computed(() => {
    let mode = null;
    if (route.name === 'WaxInCreateView') {
        mode = 'create';
    } else if (route.name === 'WaxInEditView') {
        mode = 'edit';
    }
    return mode;
});

onMounted(async () => {
    initDate();
    if (mode.value === 'edit') {
        const options = { expand: 'third_partie' };
        await syncWaxInItem(id.value, options);
        initEdit();
    }
});
</script>