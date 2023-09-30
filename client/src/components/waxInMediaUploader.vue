<template>
    <q-btn label="Ajouter" @click="onShow" />
    <q-dialog v-model="show">
        <q-card dark>
            <q-card-section>
                <q-select standout dark v-model="mediaType" :options="mediaTypeOptions" label="Type de document" />
                <q-file dark standout bottom-slots v-model="media" label="Lier un document" counter>
                    <template v-slot:prepend>
                        <q-icon name="attach_file" @click.stop.prevent />
                    </template>
                    <template v-slot:append>
                        <q-icon name="close" @click.stop.prevent="media = null" class="cursor-pointer" />
                    </template>
                </q-file>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="primary" @click="onHide" />
                <q-btn label="Lier" color="primary" @click="uploadFile" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

const props = defineProps([ 'waxItem' ]);

const {
    update: updateWaxInItem,
} = usePocketbaseItem(props.waxItem.collectionName);

const show = ref(false);
const media = ref();
const mediaType = ref();

function onShow() {
    show.value = true;
}

function onHide() {
    show.value = false;
}

async function uploadFile() {
    try {
        const formData = new FormData();
        formData.append(mediaType.value.value, media.value);
        await updateWaxInItem(formData, props.waxItem.id);
        onHide();
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

const mediaTypeOptions = computed(() => {
    let options = <any>[];
    if (props.waxItem.collectionName === 'wax_in') {
        options = [
            { label: 'Photos du lot', value: 'pictures' },
            { label: 'Analyses', value: 'analyzes' },
            { label: 'Certificat', value: 'certificates' },
            { label: 'Bon de livraison', value: 'delivery_notes' },
            { label: 'Divers', value: 'other_files' },
        ];
    } else if (props.waxItem.collectionName === 'wax_out') {
        options = [
            { label: 'Photos du lot', value: 'pictures' },
            { label: 'Analyses', value: 'analyzes' },
            { label: 'Certificat', value: 'certificates' },
            { label: 'Bon de livraison', value: 'delivery_notes' },
            { label: 'Divers', value: 'other_files' },
        ];
    }
    return options;
});
</script>