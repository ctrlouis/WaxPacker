<template>
    <h1>Lots d'entrés</h1>
    <waxList :type="waxType" :list="waxInList" />
    <RouterLink to="/w/in/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import waxList from '@/components/waxList.vue';

const { 
    list: waxInList,
    sync: syncWaxInList,
} = usePocketbaseList('wax_in');

const waxType = 'in';

onMounted(async () => {
    await syncWaxInList();
});
</script>