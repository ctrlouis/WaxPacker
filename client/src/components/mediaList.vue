<template>
    <mediaItem v-for="media in medias" :baseUrl="baseUrl" :name="media" :recordID="recordID" :mediaType="mediaType" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import mediaItem from '@/components/mediaItem.vue';

const props = defineProps([ 'collectionID', 'recordID', 'medias', 'mediaType' ]);

const baseUrl = computed(() => {
    const url = `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${props.collectionID}/${props.recordID}`;
    return url;
});
</script>