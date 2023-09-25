<template>
    <q-list bordered separator>
        <ThirdPartiesItem v-for="item in list" :item="item" />
    </q-list>
</template>

<script setup lang="ts">
import ThirdPartiesItem from '@/components/thirdPartiesItem.vue';

defineProps([ 'type', 'list' ]);
</script>