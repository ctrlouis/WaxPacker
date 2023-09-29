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
                <q-item-label>Quantité restante</q-item-label>
                <q-item-label caption>{{ waxInItem.weight_left }}</q-item-label>
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
                <q-item-label>Type de lot</q-item-label>
                <q-item-label caption>{{ waxPerso }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Type de cire</q-item-label>
                <q-item-label caption>{{ waxType }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>

    <h2>Media</h2>
    <q-file dark standout bottom-slots v-model="media" label="Lier un document" counter>
        <template v-slot:prepend>
            <q-icon name="attach_file" @click.stop.prevent />
        </template>
        <template v-slot:append>
            <q-icon name="close" @click.stop.prevent="media = null" class="cursor-pointer" />
        </template>
    </q-file>
    <q-btn dark label="Lier" @click="uploadFile" />
    <mediaList v-if="waxInItem" :collectionID="waxInItem.collectionId" :recordID="waxInItem.id" :medias="waxInItem.pictures" />

    <h2>Tracabilité</h2>
    <waxInOutTraceTable v-if="waxInItem" :waxInItem="waxInItem" />

    <h2>Actions</h2>
    <q-list v-if="waxInItem">
        <q-item clickable v-ripple dark>
            <q-item-section>
                <q-item-label>Supprimer</q-item-label>
                <q-item-label caption>{{ waxInItem.label }}</q-item-label>
            </q-item-section>
            <q-item-section>
                <div>
                    <q-btn flat label="supprimer" color="red" @click="askDelete" />
                </div>
            </q-item-section>
        </q-item>
    </q-list>

    <q-btn round icon="edit" color="orange" @click="goEditPage" />

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
import waxInOutTraceTable from '@/components/waxInOutTraceTable.vue';

const router = useRouter();
const route = useRoute();
const id = ref(String(route.params.id));
const media = ref();

const {
    item: waxInItem,
    sync: syncWaxInItem,
    update: updateWaxInItem,
    remove: removeWaxInItem,
} = usePocketbaseItem('wax_in');

async function uploadFile() {
    try {
        if (!waxInItem.value) throw new Error("Aucuns lot d'entrée trouvé");
        const formData = new FormData();
        formData.append('documents', media.value);
        formData.append('pictures', media.value);
        await updateWaxInItem(formData, waxInItem.value.id);
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

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