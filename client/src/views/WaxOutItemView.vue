<template>
    <q-icon class="absolute top-0 left-0 cursor-pointer" size="lg" dark name="arrow_back" @click="goListPage" />

    <h1 class="mt-32 mb-4 text-5xl">Détail du lot</h1>

    <h2 class="mt-4 text-base text-bold text-indigo-300">Informations</h2>
    <q-list v-if="waxOutItem">
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Label</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxOutItem.label }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Numéro de lot</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxOutItem.number }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Quantité initial</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxOutItem.weight }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Quantité restante</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxOutItem.weight_left }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Quantité sortie</q-item-label>
                <q-item-label class="text-base text-grey">{{ weightOut }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Date de début</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxOutItem.start_date }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Type de lot</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxPerso }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Type de cire</q-item-label>
                <q-item-label class="text-base text-grey">{{ waxType }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>

    <h2 class="mt-4 text-base text-bold text-indigo-300">Media</h2>
    <h3 v-if="waxOutItem && waxOutItem.pictures.length > 0">Photos du lot</h3>
    <mediaList v-if="waxOutItem && waxOutItem.pictures.length > 0" :waxItem="waxOutItem" :medias="waxOutItem.pictures" mediaType="pictures" />
    <h3 v-if="waxOutItem && waxOutItem.analyzes.length > 0">Analyses</h3>
    <mediaList v-if="waxOutItem && waxOutItem.analyzes.length > 0" :waxItem="waxOutItem" :medias="waxOutItem.analyzes" mediaType="analyzes" />
    <h3 v-if="waxOutItem && waxOutItem.certificates.length > 0">Certificat</h3>
    <mediaList v-if="waxOutItem && waxOutItem.certificates.length > 0" :waxItem="waxOutItem" :medias="waxOutItem.certificates" mediaType="certificates" />
    <h3 v-if="waxOutItem && waxOutItem.delivery_notes.length > 0">Bon de livraison</h3>
    <mediaList v-if="waxOutItem && waxOutItem.delivery_notes.length > 0" :waxItem="waxOutItem" :medias="waxOutItem.delivery_notes" mediaType="delivery_notes" />
    <h3 v-if="waxOutItem && waxOutItem.other_files.length > 0">Divers</h3>
    <mediaList v-if="waxOutItem && waxOutItem.other_files.length > 0" :waxItem="waxOutItem" :medias="waxOutItem.other_files" mediaType="other_files" />

    <waxInMediaUploader v-if="waxOutItem" :waxItem="waxOutItem" />

    <h2 class="mt-4 text-base text-bold text-indigo-300">Tracabilité de fabrication</h2>
    <waxInOutTraceTable v-if="waxOutItem" :waxOutItem="waxOutItem" />
    <waxInOutTraceAdd v-if="waxOutItem" :waxOutItem="waxOutItem" />

    <h2 class="mt-4 text-base text-bold text-indigo-300">Tracabilité de sorties</h2>
    <waxOutTraceTable v-if="waxOutItem" :waxOutItem="waxOutItem" />
    <waxOutTraceAdd v-if="waxOutItem" :waxOutItem="waxOutItem" />

    <h2 class="mt-4 text-base text-bold text-indigo-300">Actions</h2>
    <q-list v-if="waxOutItem">
        <q-item class="rounded" dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Supprimer le lot de sortie</q-item-label>
            </q-item-section>
            <q-item-section side>
                <div>
                    <q-btn flat label="supprimer" color="red" @click="askDelete" />
                </div>
            </q-item-section>
        </q-item>
    </q-list>

    <waxItemActionButton @edit="goEditPage" />

    <!-- <q-page-sticky position="bottom-right" :offset="[32, 32]">
        <q-fab color="purple" icon="keyboard_arrow_up" direction="up">
            <q-fab-action color="primary" @click="goEditPage" icon="edit" label="Modifier" />
        </q-fab>
    </q-page-sticky> -->

    <q-dialog v-model="removeAlert">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Suppression</div>
            </q-card-section>

            <q-card-section v-if="waxOutItem" class="q-pt-none">
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
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';
import mediaList from '@/components/mediaList.vue';
import waxInMediaUploader from '@/components/waxInMediaUploader.vue';
import waxInOutTraceAdd from '@/components/waxInOutTraceAdd.vue';
import waxInOutTraceTable from '@/components/waxInOutTraceTable.vue';
import waxOutTraceTable from '@/components/waxOutTraceTable.vue';
import waxOutTraceAdd from '@/components/waxOutTraceAdd.vue';
import waxItemActionButton from '@/components/waxItemActionButton.vue';

const router = useRouter();
const route = useRoute();
const id = ref(String(route.params.id));

const {
    item: waxOutItem,
    sync: syncWaxOutItem,
    remove: removeWaxOutItem,
} = usePocketbaseItem('wax_out');

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

function goEditPage() {
    router.push({ name: 'WaxOutEditView', params: { id: id.value } });
}

function goListPage() {
    router.push({ name: 'WaxOutView' });
}

const weightOut = computed(() => {
    let w = 0;
    if (waxOutItem.value) {
        w = waxOutItem.value.weight - waxOutItem.value.weight_left;
    }
    return w;
});

const waxPerso = computed(() => {
    let type = "mélange";
    if (waxOutItem.value && waxOutItem.value.perso === true) {
        type = 'perso'
    }
    return type;
});

const waxType = computed(() => {
    let type = "conventionnel";
    if (waxOutItem.value && waxOutItem.value.bio === true) {
        type = 'bio'
    }
    return type;
});

onMounted(async () => {
    await syncWaxOutItem(id.value);
});
</script>