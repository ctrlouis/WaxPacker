<template>
    <q-icon class="cursor-pointer" size="lg" dark name="arrow_back" @click="goListPage" />
    <h1 class="mt-32 mb-4 text-5xl">Ajouter un tier</h1>
    <q-input v-model="name" class="mb-4" dark standout label="Nom" required />
    <q-input v-model="number" class="mb-4" dark standout label="Numéro" />
    <q-input v-model="mail" class="mb-4" dark standout label="Mail" />
    <q-input v-model="address" class="mb-4" dark standout label="Adresse" />
    <q-input v-model="zipCode" class="mb-4" dark standout label="Code postal" />
    <q-input v-model="city" class="mb-4" dark standout label="Ville" />
    <q-input v-model="country" class="mb-4" dark standout label="Pays" />
    <q-input v-model="state" class="mb-4" dark standout label="Région" />
    <q-input v-model="dolibarrID" class="mb-4" dark standout label="dolibarr_id" />
    <div class="flex justify-end">
        <q-btn class="mr-4" flat label="Annuler" color="orange" @click="goListPage" />
        <q-btn label="Ajouter" color="orange" @click="onCreate" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const router = useRouter();
const {
    create: createThirdPartiesItem,
} = usePocketbaseItem('third_parties');

const name = ref("");
const number = ref("");
const mail = ref("");
const address = ref("");
const zipCode = ref("");
const city = ref("");
const country = ref("");
const state = ref("");
const dolibarrID = ref("");

async function onCreate() {
    const data = {
        name: name.value,
        number: number.value,
        mail: mail.value,
        address: address.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value,
        state: state.value,
        dolibarrID: dolibarrID.value,
    }
    try {
        await createThirdPartiesItem(data);
        router.push({ name: 'ThirdPartiesView' });
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

function goListPage() {
    router.push({ name: 'ThirdPartiesView' });
}
</script>