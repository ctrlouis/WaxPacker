<template>
    <h1>Lots de sorties</h1>
    <waxList :type="waxType" :list="waxOutList" />
    <RouterLink to="/w/out/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import waxList from '@/components/waxList.vue';

const { 
    list: waxOutList,
    sync: syncWaxOutList,
} = usePocketbaseList('wax_out');

const waxType = 'out';

onMounted(async () => {
    await syncWaxOutList();
});
</script>