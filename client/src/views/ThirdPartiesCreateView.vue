<template>
    <h1>Ajouter un tier</h1>
    <q-input v-model="name" dark standout label="Nom" required />
    <q-input v-model="number" dark standout label="Numéro" />
    <q-input v-model="mail" dark standout label="Mail" />
    <q-input v-model="address" dark standout label="Adresse" />
    <q-input v-model="zipCode" dark standout label="Code postal" />
    <q-input v-model="city" dark standout label="Ville" />
    <q-input v-model="country" dark standout label="Pays" />
    <q-input v-model="state" dark standout label="Région" />
    <q-input v-model="dolibarrID" dark standout label="dolibarr_id" />
    <q-btn label="Ajouter" color="orange" @click="onCreate" />
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

</script>