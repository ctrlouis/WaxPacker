<template>
    <q-btn label="ajouter" @click="open" />

    <q-dialog v-model="show">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Nouvelle sortie de lot</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input v-model="weight" dark type="number" min="0" :max="waxOutItem.weight_left" />
                <thirdPartiesSelect v-model="thirdPartieSelected" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="primary" @click="close" />
                <q-btn label="Ajouter" color="primary" @click="onCreate" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { RecordModel } from 'pocketbase';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';
import thirdPartiesSelect from './thirdPartiesSelect.vue';

interface SelectRecordModel {
    label: string,
    value: RecordModel,
}

const props = defineProps([ 'waxOutItem' ]);
const emit = defineEmits([ 'traceAdd' ]);

const {
    update: updateWaxOutItem,
} = usePocketbaseItem('wax_out');

const {
    create: createWaxOutTrace,
} = usePocketbaseItem('wax_out_trace');

const show = ref(false);
const thirdPartieSelected = ref<SelectRecordModel|null>();
const weight = ref(0);

async function open() {
    show.value = true;
    const options = {
        filter: "weight_left > 0",
    }
}

function close() {
    show.value = false;
}

async function onCreate() {
    console.log(props.waxOutItem.id);
    
    try {
        if (weight > props.waxOutItem.weight_left) throw new Error(`La quantité utilisé ne peut pas être supérieur à la quantité restante du lot d'entrée`);
        const createTraceData = {
            wax_out: props.waxOutItem.id,
            weight: weight.value,
            third_parties: thirdPartieSelected,
        }
        const updateWaxOutData = {
            weight_left: props.waxOutItem.weight_left - weight.value,
        }
        await createWaxOutTrace(createTraceData);
        await updateWaxOutItem(updateWaxOutData, props.waxOutItem.id);
        show.value = false;
        emit('traceAdd');
    } catch(error: any) {
        if (error && error.message) {
            console.error(error.message);
            alert(error.message);
        }
    }
}
</script>