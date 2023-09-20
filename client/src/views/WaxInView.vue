<template>
    <h1>Lots d'entrés</h1>
    <waxList :list="waxInList" />
    <RouterLink to="/w/in/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWaxInList } from '@/composables/useWaxInList';
import waxList from '@/components/waxList.vue';

const { 
    waxInList,
    syncWaxInList,
} = useWaxInList();

onMounted(async () => {
    await syncWaxInList();
});
</script>