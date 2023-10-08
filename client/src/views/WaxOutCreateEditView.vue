<template>
    <q-icon class="absolute top-0 left-0 cursor-pointer" size="lg" dark name="arrow_back" @click="goItemPage" />
    <h1 v-if="mode === 'create'" class="mt-32 mb-4 text-5xl">Ajouter un lot de sortie</h1>
    <h1 v-if="mode === 'edit'" class="mt-32 mb-4 text-5xl">Modifier le lot de sortie</h1>
    <q-input v-model="number" class="mb-4" dark standout label="Numéro de lot" required />
    <q-input v-model="label"  class="mb-4" dark standout label="Nom" />
    <q-input v-model="weight" class="mb-4" dark standout label="Quantité (Kg)" type="number" min="0" />
    <q-input v-model="startDate" class="mb-4" dark standout label="Date de début" type="date" />
    <div>
        <q-toggle v-model="perso" color="green" label="Perso" />
    </div>
    <div>
        <q-toggle v-model="bio" color="green" label="Bio" />
    </div>
    <div class="flex justify-end">
        <q-btn v-if="mode === 'create'" class="mr-4" flat label="Annuler" color="orange" @click="goListPage" />
        <q-btn v-if="mode === 'create'" label="Ajouter" color="orange" @click="onCreate" />
        <q-btn v-if="mode === 'edit'" class="mr-4" flat label="Annuler" color="orange" @click="goItemPage" />
        <q-btn v-if="mode === 'edit'" label="Modifier" color="orange" @click="onEdit" />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const route = useRoute();
const router = useRouter();
const id = ref(String(route.params.id));

const {
    item: waxOutItem,
    sync: syncWaxOutItem,
    create: createWaxOutItem,
    update: updateWaxOutItem,
} = usePocketbaseItem('wax_out');

const number = ref(defaultNumber());
const label = ref("");
const weight = ref(0);
const startDate = ref(DateTime.now().toFormat('yyyy-MM-dd'));
const perso = ref(false);
const bio = ref(false);

function defaultNumber() {
    return `SC-${DateTime.now().toFormat('yyMMdd')}`;
}

function initEdit() {
    if (waxOutItem.value) {
        number.value = waxOutItem.value.number;
        label.value = waxOutItem.value.label;
        weight.value = waxOutItem.value.weight;
        startDate.value = waxOutItem.value.start_date;
        perso.value = waxOutItem.value.perso;
        bio.value = waxOutItem.value.bio;
        initDate();
    }
}

function initDate() {
    const format = ('yyyy-MM-dd');
    let date = DateTime.now().toFormat(format);
    if (waxOutItem.value) {
        date = DateTime.fromSQL(waxOutItem.value.start_date).toFormat(format);
    }
    startDate.value = date;
}

async function onCreate() {
    const data = {
        number: number.value,
        label: label.value,
        weight: weight.value,
        weight_left: weight.value,
        start_date: startDate.value,
        perso: perso.value,
        bio: bio.value,
    }
    try {
        await createWaxOutItem(data);
        router.push({ name: 'WaxOutView' });
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

async function onEdit() {
    try {
        if (!waxOutItem.value) throw new Error("Aucuns lot de sortie trouvé");
        const data: any = {};
        if (number.value !== waxOutItem.value.number) data.number = number.value;
        if (label.value !== waxOutItem.value.label) data.label = label.value;
        if (weight.value !== waxOutItem.value.weight) data.weight = weight.value;
        if (startDate.value !== waxOutItem.value.entry_date) data.entry_date = startDate.value;
        if (perso.value !== waxOutItem.value.perso) data.perso = perso.value;
        if (bio.value !== waxOutItem.value.bio) data.bio = bio.value;
        await updateWaxOutItem(data);
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

function goItemPage() {
    router.push({ name: 'WaxOutItemView', params: { id: id.value } });
}

function goListPage() {
    router.push({ name: 'WaxOutView' });
}

const mode = computed(() => {
    let mode = null;
    if (route.name === 'WaxOutCreateView') {
        mode = 'create';
    } else if (route.name === 'WaxOutEditView') {
        mode = 'edit';
    }
    return mode;
});

onMounted(async () => {
    initDate();
    if (mode.value === 'edit') {
        await syncWaxOutItem(id.value);
        initEdit();
    }
});
</script>