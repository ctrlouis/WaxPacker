<template>
    <h1>Détail du lot</h1>

    <h2>Informations</h2>
    <q-list v-if="waxOutItem">
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Label</q-item-label>
                <q-item-label caption>{{ waxOutItem.label }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Numéro de lot</q-item-label>
                <q-item-label caption>{{ waxOutItem.number }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Quantité initial</q-item-label>
                <q-item-label caption>{{ waxOutItem.weight_original }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Date de début</q-item-label>
                <q-item-label caption>{{ waxOutItem.start_date }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Type de cire</q-item-label>
                <q-item-label caption>{{ waxType }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>

    <h2>Tracabilité</h2>
    <waxInOutTraceAdd :waxOutItem="waxOutItem" @traceAdd="onTraceAdd" />

    <h2>Actions</h2>
    <q-list v-if="waxOutItem">
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Supprimer</q-item-label>
                <q-item-label caption>{{ waxOutItem.label }}</q-item-label>
            </q-item-section>
            <q-item-section>
                <div>
                    <q-btn flat label="supprimer" color="red" @click="askDelete" />
                </div>
            </q-item-section>
        </q-item>
    </q-list>
    <q-btn round icon="edit" color="orange" />

    <q-dialog v-model="removeAlert">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Suppression</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <p>Etes vous sur de vouloir supprimer le lot d'entrée {{ waxOutItem.label }} - {{ waxOutItem.number }} ?</p>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="red" @click="closeAskDelete" />
                <q-btn label="Supprimer" color="red" @click="onRemove" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useWaxOutItem } from '@/composables/useWaxOutItem';
import waxInOutTraceAdd from '@/components/waxInOutTraceAdd.vue';

const router = useRouter();
const route = useRoute();
const id = ref(String(route.params.id));

const {
    waxOutItem,
    syncWaxOutItem,
    removeWaxOutItem,
} = useWaxOutItem();

const removeAlert = ref(false);
function askDelete(event: Event) {
    event.stopPropagation();
    removeAlert.value = true;
}
function closeAskDelete() {
    removeAlert.value = false;
}
function onRemove() {
    if(waxOutItem.value) {
        removeWaxOutItem(waxOutItem.value.id);
        closeAskDelete();
        router.push({ name: 'WaxOutView' });
    }
}

const waxType = computed(() => {
    let type = "conventionnel";
    if (waxOutItem.value && waxOutItem.value.bio === true) {
        type = 'bio'
    }
    return type;
});

function onTraceAdd() {
    
}

onMounted(async () => {
    await syncWaxOutItem(id.value);
});
</script>