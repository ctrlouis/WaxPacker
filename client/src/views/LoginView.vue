<template>
    <div class="h-full w-full flex justify-center content-center">
        <div>
            <h1 class="mb-4 text-4xl text-center">Connexion</h1>
            <q-form @submit="connection" class="flex flex-col gap-y-2">
                <q-input v-model="username" standout dark round placeholder="Identifiant" :disable="loading" required />
                <q-input v-model="password" standout dark round placeholder="Mot de passe" :type="!showPassword ? 'password' : 'text'" :disable="loading" required>
                    <template v-slot:append>
                        <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="toggleShowPassword"
                        />
                    </template>
                </q-input>
                <q-btn label="Connection" type="submit" dark color="primary" :disable="loading" :loading="loading" />
            </q-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthentication } from '@/stores/authentication';

const router = useRouter();
const authentication = useAuthentication();
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);

async function connection() {
    console.log("connection()");
    try {
        loading.value = true;
        await authentication.login(username.value, password.value);
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    } finally {
        loading.value = false;
    }
    if (authentication.isConnected) onConnection();
}

function onConnection() {
    router.push({ name: 'home' });
}

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}
</script>