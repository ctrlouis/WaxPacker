<template>
    <q-icon class="cursor-pointer" size="lg" dark name="arrow_back" @click="goListPage" />
    <h1 v-if="mode === 'create'" class="mt-32 mb-4 text-5xl">Ajouter un lot d'entrée</h1>
    <h1 v-if="mode === 'edit'" class="mt-32 mb-4 text-5xl">Modifier un lot d'entrée</h1>
    <q-input v-model="number" class="mb-4" dark standout label="Numéro de lot" required />
    <q-input v-model="label" class="mb-4" dark standout label="Nom" />
    <q-input v-if="showMoreWeight" v-model="weightRaw" class="mb-4" dark standout label="Quantité brute (Kg)" type="number" min="0">
        <template v-slot:append>
            <q-icon v-if="showMoreWeight && !isScale" class="mb-4 cursor-pointer" name="scale" color="orange" @click="scaleWeightRaw" />
        </template>
    </q-input>
    <q-input v-if="showMoreWeight" v-model="lossCoef" class="mb-4" dark standout label="Coefficient de perte (%)" type="number" min="0" max="100">
        <template v-slot:append>
            <q-icon v-if="showMoreWeight && !isScale" name="scale" color="orange" class="cursor-pointer" @click="scaleLossCoef" />
        </template>
    </q-input>
    <q-input v-model="weightNet" class="mb-4" dark standout label="Poids net (Kg)" type="number" min="0">
        <template v-slot:append>
            <q-icon v-if="showMoreWeight && !isScale" name="scale" color="orange" class="cursor-pointer" @click="scaleWeightNet" />
        </template>
    </q-input>
    <div class="flex justify-center">
        <q-btn v-if="!showMoreWeight" class="mb-4" dark icon="add" label="voir plus" @click="showMoreWeightToggle" />
        <q-btn v-if="showMoreWeight" class="mb-4" dark icon="remove" label="voir moins" @click="showMoreWeightToggle" />
    </div>
    <q-input v-model="entryDate" class="mb-4" dark standout label="Date d'entrée" type="date" />
    <div>
        <q-checkbox v-model="perso" class="mb-4" dark color="teal" label="Lot perso" />
    </div>
    <div>
        <q-checkbox v-model="bio" class="mb-4" dark color="green" label="Bio" />
    </div>
    <ThirdPartiesSelect v-model="thirdPartieSelected" class="mb-4" />
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
const weightRaw = ref(0);
const lossCoef = ref(0);
const weightNet = ref();
const entryDate = ref();
const perso = ref(false);
const bio = ref(false);
const thirdPartieSelected = ref();
const showMoreWeight = ref(false);

function defaultNumber() {
    return `EC-${DateTime.now().toFormat('yyMMdd')}`;
}

function initEdit() {
    if (waxInItem.value) {
        number.value = waxInItem.value.number;
        label.value = waxInItem.value.label;
        weightRaw.value = waxInItem.value.weight_raw;
        lossCoef.value = waxInItem.value.loss_coefficient;
        weightNet.value = waxInItem.value.weight_net;
        entryDate.value = waxInItem.value.entry_date;
        perso.value = waxInItem.value.perso;
        bio.value = waxInItem.value.bio;
        initDate();
        initTirdPartie();
        
        if (waxInItem.value.loss_coefficient !== 0) {
            showMoreWeight.value = true;
        }
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
        let thirdPartieID = null;
        if (thirdPartieSelected.value && thirdPartieSelected.value.value.id) thirdPartieID = thirdPartieSelected.value.value.id;
        if (!showMoreWeight) {
            lossCoef.value = 0;
            scaleWeightRaw;
        }
        const data = {
            number: number.value,
            label: label.value,
            weight_raw: weightRaw.value,
            loss_coefficient: lossCoef.value,
            weight_net: weightNet.value,
            weight_left: weightNet.value,
            entry_date: entryDate.value,
            perso: perso.value,
            bio: bio.value,
            third_partie: thirdPartieID,
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
        let thirdPartieID = null;
        if (thirdPartieSelected.value && thirdPartieSelected.value.value.id) thirdPartieID = thirdPartieSelected.value.value.id;
        const data: any = {};
        if (number.value !== waxInItem.value.number) data.number = number.value;
        if (label.value !== waxInItem.value.label) data.label = label.value;
        if (weightNet.value !== waxInItem.value.weight_net) data.weight_net = weightNet.value;
        if (entryDate.value !== waxInItem.value.entry_date) data.entry_date = entryDate.value;
        if (perso.value !== waxInItem.value.perso) data.perso = perso.value;
        if (bio.value !== waxInItem.value.bio) data.bio = bio.value;
        if (thirdPartieSelected.value !== waxInItem.value.third_partie) data.third_partie = thirdPartieID;
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

function goListPage() {
    router.push({ name: 'WaxOutView' });
}

function showMoreWeightToggle() {
    showMoreWeight.value = !showMoreWeight.value;
}

function scaleWeightNet() {
    weightNet.value = weightRaw.value/(1+(lossCoef.value/100));
}

function scaleWeightRaw() {
    weightRaw.value = weightNet.value*(1+(lossCoef.value/100));
}

function scaleLossCoef() {
    // do something
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

const isScale = computed(() => {
    return weightNet.value == weightRaw.value / (1 + (lossCoef.value/100));
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