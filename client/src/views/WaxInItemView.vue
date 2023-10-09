<template>
    <q-icon class="absolute top-0 left-0 cursor-pointer" size="lg" dark name="arrow_back" @click="goListPage" />
    <h1 class="mt-32 mb-4 text-5xl">Détail du lot</h1>

    <div>
        <h2 class="mt-4 text-base text-indigo-300">Informations</h2>
        <q-list v-if="waxInItem">
            <q-item clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Label</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.label }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Numéro de lot</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.number }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item v-if="waxInItem.lossCoef !== 0" clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Poids brute (Kg)</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.weight_raw }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item v-if="waxInItem.lossCoef !== 0" clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Coefficent de perte (%)</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.loss_coefficient }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Poids net (Kg)</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.weight_net }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Quantité restante</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.weight_left }}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable v-ripple dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Date d'entrée</q-item-label>
                    <q-item-label class="text-base text-grey">{{ waxInItem.entry_date }}</q-item-label>
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
    </div>

    <div v-if="waxInItem">
        <h2 class="mt-4 text-base text-indigo-300">Media</h2>
        <h3 v-if="waxInItem.pictures.length > 0">Photos du lot</h3>
        <mediaList v-if="waxInItem.pictures.length > 0" :waxItem="waxInItem" :medias="waxInItem.pictures" mediaType="pictures" />
        <h3 v-if="waxInItem.analyzes.length > 0">Analyses</h3>
        <mediaList v-if="waxInItem.analyzes.length > 0" :waxItem="waxInItem" :medias="waxInItem.analyzes" mediaType="analyzes" />
        <h3 v-if="waxInItem.certificates.length > 0">Certificat</h3>
        <mediaList v-if="waxInItem.certificates.length > 0" :waxItem="waxInItem" :medias="waxInItem.certificates" mediaType="certificates" />
        <h3 v-if="waxInItem.delivery_notes.length > 0">Bon de livraison</h3>
        <mediaList v-if="waxInItem.delivery_notes.length > 0" :waxItem="waxInItem" :medias="waxInItem.delivery_notes" mediaType="delivery_notes" />
        <h3 v-if="waxInItem.other_files.length > 0">Divers</h3>
        <mediaList v-if="waxInItem.other_files.length > 0" :waxItem="waxInItem" :medias="waxInItem.other_files" mediaType="other_files" />
        <waxInMediaUploader v-model="showAddFile" :waxItem="waxInItem" />
    </div>

    <div v-if="waxInItem">
        <h2 class="mt-4 text-base text-indigo-300">Tracabilité</h2>
        <waxInOutTraceTable :waxInItem="waxInItem" />
        <waxInOutTraceAdd v-model="showWaxInOutTraceAdd" :waxInItem="waxInItem" />
    </div>

    <div v-if="waxInItem">
        <h2 class="mt-4 text-base text-indigo-300">Actions</h2>
        <q-list>
            <q-item class="rounded" dark>
                <q-item-section class="py-4">
                    <q-item-label class="text-lg">Supprimer le lot d'entrée</q-item-label>
                </q-item-section>
                <q-item-section class="py-4">
                    <div>
                        <q-btn flat label="supprimer" color="red" @click="askDelete" />
                    </div>
                </q-item-section>
            </q-item>
        </q-list>
    </div>

    <waxItemActionButton @edit="goEditPage" @addFile="onAddFile" @linkWaxOut="onLinkWaxOut" />

    <q-dialog v-model="removeAlert">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Suppression</div>
            </q-card-section>

            <q-card-section v-if="waxInItem" class="q-pt-none">
                <p>Etes vous sur de vouloir supprimer le lot d'entrée {{ waxInItem.label }} - {{ waxInItem.number }} ?</p>
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
import waxItemActionButton from '@/components/waxItemActionButton.vue';

const router = useRouter();
const route = useRoute();
const id = ref(String(route.params.id));
const showAddFile = ref(false);
const showWaxInOutTraceAdd = ref(false);

const {
    item: waxInItem,
    sync: syncWaxInItem,
    remove: removeWaxInItem,
} = usePocketbaseItem('wax_in');

const removeAlert = ref(false);
function askDelete(event: Event) {
    event.stopPropagation();
    removeAlert.value = true;
}
function closeAskDelete() {
    removeAlert.value = false;
}
function onRemove() {
    if(waxInItem.value) {
        removeWaxInItem(waxInItem.value.id);
        closeAskDelete();
        router.push({ name: 'WaxInView' });
    }
}

function goEditPage() {
    router.push({ name: 'WaxInEditView', params: { id: id.value } });
}

function goListPage() {
    router.push({ name: 'WaxInView' });
}

function onAddFile() {
    showAddFile.value = true;
}

function onLinkWaxOut() {
    showWaxInOutTraceAdd.value = true;
}

const waxPerso = computed(() => {
    let type = "mélange";
    if (waxInItem.value && waxInItem.value.perso === true) {
        type = 'perso'
    }
    return type;
});

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