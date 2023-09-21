<template>
    <h1>Détail du lot</h1>
    <h2>Informations</h2>
    <q-list v-if="waxInItem">
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Label</q-item-label>
                <q-item-label caption>{{ waxInItem.label }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Numéro de lot</q-item-label>
                <q-item-label caption>{{ waxInItem.number }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Quantité initial</q-item-label>
                <q-item-label caption>{{ waxInItem.weight_original }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Date d'entrée</q-item-label>
                <q-item-label caption>{{ waxInItem.entry_date }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Type de cire</q-item-label>
                <q-item-label caption>{{ waxType }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
    <q-btn round icon="edit" color="orange" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useWaxInItem } from '@/composables/useWaxInItem';

const route = useRoute();
const id = ref(String(route.params.id));

const {
    waxInItem,
    syncWaxInItem,
} = useWaxInItem();

const waxType = computed(() => {
    let type = "conventionnel";
    if (waxInItem.value && waxInItem.value.bio === true) {
        type = 'bio'
    }
    return type;
});

onMounted(async () => {
    await syncWaxInItem(id.value);
});
</script>