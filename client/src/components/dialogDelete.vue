<template>
    <q-dialog ref="dialogRef" @hide="onDialogHide" :dark="dark" :persistent="true">
        <q-card class="q-dialog-plugin">

            <q-card-section v-if="title">
                <div class="text-h6">{{ title }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <p v-if="message">{{ message }}</p>
                <p v-else>Voulez-vous vraiment supprimer l'élément sélectionné ?</p>
            </q-card-section>
            
            <q-card-actions align="right">
                <q-btn color="red" label="Annuler" flat @click="onCancel" />
                <q-btn color="red" label="Supprimer" @click="onDelete" />
            </q-card-actions>
        </q-card>
    </q-dialog>
  </template>
  
<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar';

const props = defineProps({
    dark: {
        type: Boolean,
        default: false,
    },
    persistent: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    }
});

const emit = defineEmits([...useDialogPluginComponent.emits]);
  
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

function onDelete () {
    onDialogOK();
}

function onCancel() {
    onDialogCancel();
}
</script>