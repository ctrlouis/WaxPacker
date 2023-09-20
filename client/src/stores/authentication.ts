import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import PocketBase from 'pocketbase';

export const useAuthentication = defineStore('authentication', () => {
    
    const pb = ref(new PocketBase(import.meta.env.VITE_POCKETBASE_URL));
    
    async function login(username: string, password: string) {
        const authData = await pb.value.collection('users').authWithPassword(username, password);
        // console.log(pb.value.authStore.isValid);
        // console.log(pb.value.authStore.token);
        // console.log(pb.value.authStore.model.id);
    }

    function logout() {
        pb.value.authStore.clear();
    }

    const isConnected = computed(() => {
        return pb.value.authStore.isValid;
    });

    return {
        pb,
        login,
        logout,
        isConnected,
    };
})
