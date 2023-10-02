<template>
    <h1 class="mt-32 mb-4 text-5xl">Tiers</h1>
    <ThirdPartiesList :list="thirdPartiesList" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <RouterLink to="/t/new">
            <q-btn round icon="add" color="orange" />
        </RouterLink>
    </q-page-sticky>
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