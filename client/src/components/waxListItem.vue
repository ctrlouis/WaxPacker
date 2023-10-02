<template>
    <q-item dark class="my-4 rounded" clickable v-ripple @click="goItemPage">
        <q-item-section>
          <q-item-label class="mb-2 text-lg">{{ item.number }}</q-item-label>
          <q-item-label class="text-md text-grey">{{ item.label }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label class="text-sm">{{ item.weight_net }} Kg</q-item-label>
            <div class="text-sm">
                <q-icon v-if="item.perso" name="person" size="sm" class="text-grey"/>
                <q-icon v-if="item.bio" name="eco" size="sm" class="text-green"/>
            </div>
        </q-item-section>
        <!-- <q-item-section>
            <div>
                <q-btn flat round icon="delete" color="red" @click="askDelete" />
            </div>
        </q-item-section> -->
    </q-item>

    <!-- <q-dialog v-model="removeAlert">
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
    </q-dialog> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const props = defineProps([ 'type', 'item' ]);

const router = useRouter();

const {
    remove: removeWaxInItem,
} = usePocketbaseItem('wax_in');

const {
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
    if (props.type === 'in') {
        removeWaxInItem(props.item.id);
    } else if (props.type === 'out') {
        removeWaxOutItem(props.item.id);
    }
    closeAskDelete();
}

function goItemPage() {
    if (props.type === 'in') {
        router.push({ name: 'WaxInItemView', params: { id: props.item.id } });
    } else if (props.type === 'out') {
        router.push({ name: 'WaxOutItemView', params: { id: props.item.id } });
    }
}
</script>