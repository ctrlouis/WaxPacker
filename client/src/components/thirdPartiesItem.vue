<template>
    <q-item dark clickable v-ripple @click="goItemPage">
        <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption>{{ address }}</q-item-label>
        </q-item-section>
        <q-item-section>
            <q-icon name="phone" size="sm" />
        </q-item-section>
        <q-item-section>
            <q-icon name="email" size="sm" />
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
                <p>Etes vous sur de vouloir supprimer le lot {{ item.label }} - {{ item.number }} ?</p>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="red" @click="closeAskDelete" />
                <q-btn label="Supprimer" color="red" @click="onRemove" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const props = defineProps([ 'item' ]);

const router = useRouter();

const {
    remove: removeThirdPartiesItem,
} = usePocketbaseItem('third_parties');

const removeAlert = ref(false);
function askDelete(event: Event) {
    event.stopPropagation();
    removeAlert.value = true;
}
function closeAskDelete() {
    removeAlert.value = false;
}
async function onRemove() {
    await removeThirdPartiesItem(props.item.id);
    closeAskDelete();
}

function goItemPage() {
    router.push({ name: 'WaxInItemView', params: { id: props.item.id } });
}

const address = computed(() => {
    return `${props.item.address}, ${props.item.zip_code} ${props.item.city}, ${props.item.country} - ${props.item.state}`;
});
</script>