<template>
    <q-page-sticky position="bottom-right" :offset="offset">
        <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
            <q-fab-action color="primary" @click="onEdit" icon="edit" label="Modifier" />
            <q-fab-action color="secondary" @click="onAddFile" icon="attach_file" label="Ajouter fichier" />
            <q-fab-action color="secondary" @click="onLinkWaxIn" icon="input" label="Lier entrée" />
            <q-fab-action color="secondary" @click="onLinkWaxOut" icon="output" label="Lier sortie" />
            <q-fab-action color="secondary" @click="onTraceOut" icon="trending_flat" label="Effectuer sortie" />
        </q-fab>
    </q-page-sticky>
</template>

<script setup lang="ts">
const props = defineProps({
    offset: {
        type: Array,
        default: [32, 32],
    },
    position: {
        type: String,
        default: 'bottom-right',
    },
});
const emit = defineEmits(['edit', 'addFile', 'linkWaxIn', 'linkWaxOut', 'traceOut']);

function onEdit() {
    emit('edit');
}

function onAddFile() {
    emit('addFile');
}

function onLinkWaxIn() {
    emit('linkWaxIn');
}

function onLinkWaxOut() {
    emit('linkWaxOut');
}

function onTraceOut() {
    emit('traceOut');
}
</script>