<template>
    <h1>Ajouter un lot d'entré</h1>
    <q-input v-model="number" dark standout label="Numéro de lot" required />
    <q-input v-model="label" dark standout label="Nom" />
    <q-input v-model="weightOriginal" dark standout label="Quantité (Kg)" type="number" min="0" />
    <q-input v-model="entryDate" dark standout label="Date d'entrée" type="date" />
    <q-toggle v-model="bio" color="green" label="Bio" />
    <q-btn label="Ajouter" color="orange" @click="onCreate" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DateTime } from 'luxon';
import { useWaxInItem } from '@/composables/useWaxInItem';

const {
    createWaxInItem,
} = useWaxInItem();

const number = ref(defaultNumber());
const label = ref("");
const weightOriginal = ref(0);
const entryDate = ref(DateTime.now().toFormat('yyyy-MM-dd'));
const bio = ref(false);

function defaultNumber() {
    return `EC-${DateTime.now().toFormat('yyMMdd')}`;
}

async function onCreate() {
    const data = {
        number: number.value,
        label: label.value,
        weight_original: weightOriginal.value,
        entry_date: entryDate.value,
        bio: bio.value,
    }
    try {
        await createWaxInItem(data);
    } catch(error) {
        console.error(error);
    }
}

</script>