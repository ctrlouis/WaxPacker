<template>
    <h1>Lots de sorties</h1>
    <waxList :type="waxType" :list="waxOutList" />
    <RouterLink to="/w/out/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWaxOutList } from '@/composables/useWaxOutList';
import waxList from '@/components/waxList.vue';

const { 
    waxOutList,
    syncWaxOutList,
} = useWaxOutList();

const waxType = 'out';

onMounted(async () => {
    await syncWaxOutList();
});
</script>