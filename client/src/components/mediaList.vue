<template>
    <mediaItem v-for="media in medias" :baseUrl="baseUrl" :name="media" :recordID="recordID" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import mediaItem from '@/components/mediaItem.vue';

const props = defineProps([ 'collectionID', 'recordID', 'medias' ]);

const baseUrl = computed(() => {
    const url = `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${props.collectionID}/${props.recordID}`;
    return url;
});
</script>