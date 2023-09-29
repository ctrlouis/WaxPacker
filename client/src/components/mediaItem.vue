<template>
    <img :src="url" :alt="name" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps([ 'baseUrl', 'name' ]);

const url = computed(() => {
    return `${props.baseUrl}/${props.name}`;
});
</script>