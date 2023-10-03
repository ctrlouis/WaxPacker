<template>
    <q-btn flat round dense icon="more_vert"> 
        <q-menu dark auto-close>
            <q-list dark style="min-width: 100px">
                <q-item dark clickable v-close-popup @click="logout">
                    <q-item-section avatar>
                        <q-icon name="settings" />
                    </q-item-section>
                    <q-item-section>Se deconnecter</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthentication } from '@/stores/authentication';

const { router } = useRouter();
const authentication = useAuthentication();

function logout() {
    authentication.logout();
    router.push({ name: 'login' });
} 
</script>