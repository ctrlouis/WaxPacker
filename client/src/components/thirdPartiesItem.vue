<template>

    <q-item dark class="my-4 rounded" clickable v-ripple @click="goItemPage">
        <q-item-section>
          <q-item-label class="mb-2 text-lg">{{ item.name }}</q-item-label>
          <q-item-label class="text-md text-grey">{{ address }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
            <div class="text-sm">
                <q-icon v-if="item.phone" name="phone" size="sm" />
                <q-icon v-if="item.mail" name="email" size="sm" />
            </div>
        </q-item-section>
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const props = defineProps([ 'item' ]);

const router = useRouter();

// const {
//     remove: removeThirdPartiesItem,
// } = usePocketbaseItem('third_parties');

// const removeAlert = ref(false);
// function askDelete(event: Event) {
//     event.stopPropagation();
//     removeAlert.value = true;
// }
// function closeAskDelete() {
//     removeAlert.value = false;
// }
// async function onRemove() {
//     await removeThirdPartiesItem(props.item.id);
//     closeAskDelete();
// }

function goItemPage() {
    router.push({ name: 'ThirdPartiesItemView', params: { id: props.item.id } });
}

const address = computed(() => {
    let a = "";
    a += `${props.item.address}`;
    if (props.item.zip_code || props.item.city) {
        if (a.length > 0) a += ', ';
        if (props.item.zip_code) {
            a += props.item.zip_code;
            if (props.item.city) a += ' ';
        }
        if (props.item.city) {
            a += props.item.city;
        }
    }
    if (props.item.country) {
        if (a.length > 0) a += ', ';
        a += props.item.country;
    }
    if (props.item.state) {
        if (a.length > 0) a += ' - ';
        a += props.item.state;
    }
    return a;
});
</script>