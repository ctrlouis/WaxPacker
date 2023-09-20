<template>
    <div class="h-100 w-100 flex align-center justify-center item-center">
        <div>
            <h1 class="text-xl text-center">Login</h1>
            <form class="flex flex-col">
                <q-input v-model="username" class="my-1" dark round label="username" />
                <q-input v-model="password" class="my-1" dark round label="password" type="password" />
                <q-btn  class="my-1" dark color="primary" label="Connection" @click="connection" />
            </form>
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

async function connection() {
    await authentication.login(username.value, password.value);
    if (authentication.isConnected) onConnection();
}

function onConnection() {
    router.push({ name: 'home' });
}
</script>