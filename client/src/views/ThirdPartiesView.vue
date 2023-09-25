<template>
    <h1>Tiers</h1>
    <ThirdPartiesList :list="thirdPartiesList" />
    <RouterLink to="/t/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import ThirdPartiesList from '@/components/thirdPartiesList.vue';

const { 
    list: thirdPartiesList,
    sync: syncThirdPartiesList,
} = usePocketbaseList('third_parties');

onMounted(async () => {
    await syncThirdPartiesList();
});
</script>