<template>
    <div class="relative">
        <img v-if="isImage" class="h-100 w-100 rounded" :src="url" :alt="name" />
        <a v-else-if="isFile" :href="url" :download="name" target="_blank">
            <q-icon rounded flat size="128px" name="description" />
        </a>
        <q-icon class="absolute h-14 w-14 -right-4 -top-4" round size="xl" name="cancel" @click="onRemove" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const props = defineProps([ 'baseUrl', 'name', 'recordID', 'mediaType' ]);

const {
    update: updateWaxInItem,
} = usePocketbaseItem('wax_in');

async function onRemove() {
    const propertie = `${props.mediaType}-`;
    const data = <any>{};
    data[propertie] = [ props.name ];
    console.log(data);
    
    await updateWaxInItem(data, props.recordID);
}

const url = computed(() => {
    return `${props.baseUrl}/${props.name}`;
});

const extension = computed(() => {
    return props.name.split(".").pop();
});

const isImage = computed(() => {
    return isGif.value || isJpg.value || isPng.value || isSvg.value;
});

const isFile = computed(() => {
    return isPdf.value;
});

const isGif = computed(() => {
    return extension.value === 'gif';
});

const isJpg = computed(() => {
    return extension.value === 'jpg';
});

const isPng = computed(() => {
    return extension.value === 'png';
});

const isSvg = computed(() => {
    return extension.value === 'svg';
});

const isPdf = computed(() => {
    return extension.value === 'pdf';
});
</script>