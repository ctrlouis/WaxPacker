<template>
    <q-item clickable v-ripple>
        <q-item-section>
            {{ item.label }} - {{ item.number }}
        </q-item-section>
        <q-item-section>
            {{ item.weight_original }} Kg
        </q-item-section>
        <q-item-section>
            <q-icon v-if="item.bio" name="eco" size="sm" class="text-green"/>
        </q-item-section>
        <q-item-section>
            <div>
                <q-btn flat round icon="delete" color="red" @click="askDelete" />
            </div>
        </q-item-section>
    </q-item>

    <q-dialog v-model="removeAlert">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Suppression</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <p>Etes vous sur de vouloir supprimer le lot d'entrée {{ item.label }} - {{ item.number }} ?</p>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="warning" @click="closeAskDelete" />
                <q-btn label="Supprimer" color="warning" @click="onRemove" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWaxInItem } from '@/composables/useWaxInItem';

const props = defineProps([ 'item' ]);

const {
    removeWaxInItem,
} = useWaxInItem();

const removeAlert = ref(false);

function askDelete() {
    removeAlert.value = true;
}

function closeAskDelete() {
    removeAlert.value = false;
}

function onRemove() {
    removeWaxInItem(props.item.id);
    closeAskDelete();
}
</script>