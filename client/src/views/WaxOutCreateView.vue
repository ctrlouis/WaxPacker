<template>
    <h1>Ajouter un lot de sortie</h1>
    <q-input v-model="number" dark standout label="Numéro de lot" required />
    <q-input v-model="label" dark standout label="Nom" />
    <q-input v-model="weightOriginal" dark standout label="Quantité (Kg)" type="number" min="0" />
    <q-input v-model="startDate" dark standout label="Date de début" type="date" />
    <q-toggle v-model="bio" color="green" label="Bio" />
    <q-btn label="Ajouter" color="orange" @click="onCreate" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { DateTime } from 'luxon';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const router = useRouter();
const {
    create: createWaxOutItem,
} = usePocketbaseItem('wax_out');

const number = ref(defaultNumber());
const label = ref("");
const weightOriginal = ref(0);
const startDate = ref(DateTime.now().toFormat('yyyy-MM-dd'));
const bio = ref(false);

function defaultNumber() {
    return `SC-${DateTime.now().toFormat('yyMMdd')}`;
}

async function onCreate() {
    const data = {
        number: number.value,
        label: label.value,
        weight_original: weightOriginal.value,
        start_date: startDate.value,
        bio: bio.value,
    }
    try {
        await createWaxOutItem(data);
        router.push({ name: 'WaxOutView' });
    } catch(error) {
        console.error(error.message);
        alert(error.message);
    }
}

</script>