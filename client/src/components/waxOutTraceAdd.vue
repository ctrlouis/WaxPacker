<template>
    <q-btn label="ajouter" @click="open" />

    <q-dialog v-model="show">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Nouvelle sortie</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-form @submit="onCreate" @reset="close" class="flex flex-col gap-y-2">
                    <q-select standout dark v-model="waxOutSelected" :options="waxOutOptions" label="Type de document" :disable="isDefaultWaxOutItem" :readonly="isDefaultWaxOutItem" />
                    <q-input v-model="weight" dark type="number" min="0" :max="waxOutItem.weight_left" />
                    <thirdPartiesSelect v-model="thirdPartieSelected" />
                    <div class="flex justify-end">
                        <q-btn flat label="Annuler" type="reset" color="primary" />
                        <q-btn label="Ajouter" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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
    sync: syncWaxOutList,
    generateListAsOptions: generateSelectWaxOutAsOptions,
} = usePocketbaseList('wax_out');

const {
    create: createWaxOutTrace,
} = usePocketbaseItem('wax_out_trace');

const show = ref(false);
const thirdPartieSelected = ref<SelectRecordModel>();
const waxOutSelected = ref<SelectRecordModel>();
const weight = ref(0);

async function open() {
    show.value = true;
    if (props.waxOutItem) {
        waxOutSelected.value = {
            label: props.waxOutItem.number,
            value: props.waxOutItem,
        }
    } else if (!props.waxOutItem) {
        const options = {
            filter: "weight_left > 0",
        }
        await syncWaxOutList(options);
    }
}

function close() {
    show.value = false;
}

async function onCreate() {
    try {
        if (!waxOutSelected.value) throw new Error(`Aucun lot de sortie definie`);
        if (weight > props.waxOutItem.weight_left) throw new Error(`La quantité utilisé ne peut pas être supérieur à la quantité restante du lot de sortie`);
        if (!thirdPartieSelected.value) throw new Error(`Aucun tier definie`);
        const createTraceData = {
            wax_out: waxOutSelected.value.value.id,
            weight: weight.value,
            third_partie: thirdPartieSelected.value.value.id,
        }
        const updateWaxOutData = {
            weight_left: waxOutSelected.value.value.weight_left - weight.value,
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

const waxOutOptions = generateSelectWaxOutAsOptions('number');

const isDefaultWaxOutItem = computed(() => {
    let is = false;
    if (props.waxOutItem) {
        is = true;
    }
    return is;
});
</script>