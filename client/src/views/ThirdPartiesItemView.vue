<template>
    <h1 class="mt-32 mb-4 text-5xl">Détail du tier</h1>
    <h2 class="mt-4 text-base text-indigo-300">Informations</h2>
    <q-list v-if="thirdPartiesItem">
        <q-item class="rounded" clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Nom</q-item-label>
                <q-item-label class="text-base text-grey">{{ thirdPartiesItem.name }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item v-if="fullAddress.length > 0" class="rounded" clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Adresse</q-item-label>
                <q-item-label class="text-base text-grey">{{ fullAddress }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item v-if="thirdPartiesItem.phone" class="rounded" clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Téléphone</q-item-label>
                <q-item-label class="text-base text-grey">{{ thirdPartiesItem.phone }}</q-item-label>
            </q-item-section>
        </q-item>
        <q-item v-if="thirdPartiesItem.mail" class="rounded" clickable v-ripple dark>
            <q-item-section class="py-4">
                <q-item-label class="text-lg">Email</q-item-label>
                <q-item-label class="text-base text-grey">{{ thirdPartiesItem.mail }}</q-item-label>
            </q-item-section>
        </q-item>
    </q-list>

    <!-- <h2 class="mt-4 text-base text-indigo-300">Tracabilité</h2> -->
    <!-- <thirdPartiesOutTraceTable v-if="thirdPartiesItem" :thirdPartiesItem="thirdPartiesItem" /> -->

    <h2 class="mt-4 text-base text-indigo-300">Actions</h2>
    <q-list v-if="thirdPartiesItem">
        <q-item class="rounded" dark>
            <q-item-section>
                <q-item-label class="text-lg">Supprimer le tier</q-item-label>
            </q-item-section>
            <q-item-section side>
                <div>
                    <q-btn flat label="supprimer" color="red" @click="askDelete" />
                </div>
            </q-item-section>
        </q-item>
    </q-list>
    
    <q-page-sticky position="bottom-right" :offset="[32, 32]">
        <q-btn round icon="edit" color="orange" size="lg" @click="goEditPage" />
    </q-page-sticky>

    <q-dialog v-model="removeAlert">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Suppression</div>
            </q-card-section>

            <q-card-section v-if="thirdPartiesItem" class="q-pt-none">
                <p>Etes vous sur de vouloir supprimer le lot d'entrée {{ thirdPartiesItem.label }} - {{ thirdPartiesItem.number }} ?</p>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="red" @click="closeAskDelete" />
                <q-btn label="Supprimer" color="red" @click="onRemove" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';
import { useThirdPartie } from '@/composables/useThirdPartie';

const router = useRouter();
const route = useRoute();
const id = ref(String(route.params.id));

const {
    item: thirdPartiesItem,
    sync: syncthirdPartiesItem,
    remove: removethirdPartiesItem,
} = usePocketbaseItem('third_parties');

const {
    thirdPartie,
    fullAddress,
} = useThirdPartie();

const removeAlert = ref(false);
function askDelete(event: Event) {
    event.stopPropagation();
    removeAlert.value = true;
}
function closeAskDelete() {
    removeAlert.value = false;
}
function onRemove() {
    if(thirdPartiesItem.value) {
        removethirdPartiesItem(thirdPartiesItem.value.id);
        closeAskDelete();
        router.push({ name: 'ThirdPartiesView' });
    }
}

function goEditPage() {
    router.push({ name: 'ThirdPartiesEditView', params: { id: id.value } });
}

onMounted(async () => {
    await syncthirdPartiesItem(id.value);
    thirdPartie.value = thirdPartiesItem.value;
});
</script>