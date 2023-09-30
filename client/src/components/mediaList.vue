<template>
    <mediaItem v-for="media in medias" :baseUrl="baseUrl" :mediaType="mediaType" :name="media" :waxItem="waxItem" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import mediaItem from '@/components/mediaItem.vue';

const props = defineProps([ 'medias', 'mediaType', 'waxItem' ]);

const baseUrl = computed(() => {
    const url = `${import.meta.env.VITE_POCKETBASE_URL}/api/files/${props.waxItem.collectionId}/${props.waxItem.id}`;
    return url;
});
</script>