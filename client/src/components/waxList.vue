<template>
    <q-list bordered separator>
        <WaxListItem v-for="item in list" :type="type" :item="item" />
    </q-list>
</template>

<script setup lang="ts">
import WaxListItem from '@/components/waxListItem.vue';

defineProps([ 'type', 'list' ]);
</script>