<template>
    <q-dialog v-model="show" @show="onShow" @hide="onHide">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Lier un lot d'entrée</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-select
                    dark
                    v-model="waxInSelected"
                    label="Lot d'entrée"
                    :options="selectWaxInOptions"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                            Aucuns resultats
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <q-input v-if="waxInSelected" v-model="weight" dark type="number" min="0" :max="waxInSelected.value.weight_left" />
                <q-select
                    v-if="waxInSelected"
                    dark
                    v-model="thirdPartiesSelected"
                    label="Lot d'entrée"
                    :options="selectThirdPartiesOptions"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                            Aucuns resultats
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="primary" @click="onHide" />
                <q-btn label="Ajouter" color="primary" @click="onCreate" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { RecordModel } from 'pocketbase';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import { usePocketbaseItem } from '@/composables/usePocketbaseItem';

interface SelectRecordModel {
    label: string,
    value: RecordModel,
}

const props = defineProps(['modelValue', 'waxOutItem', 'waxInItem']);

const emit = defineEmits([ 'update:modelValue', 'traceAdd' ]);

const {
    sync: syncWaxInList,
    generateListAsOptions: generateselectWaxInAsOptions,
} = usePocketbaseList('wax_in');

const {
    sync: syncThirdPartiesList,
    generateListAsOptions: generateThirdPartiesListAsOptions,
} = usePocketbaseList('third_parties');

const {
    update: updateWaxInItem,
} = usePocketbaseItem('wax_in');

const {
    create: createWaxInOutTrace,
} = usePocketbaseItem('wax_in_out_trace');

const show = ref(false);
const waxInSelected = ref<SelectRecordModel|null>();
const thirdPartiesSelected = ref<SelectRecordModel|null>();
const weight = ref(0);

async function onShow() {
    waxInSelected.value = null;
    const options = {
        filter: "weight_left > 0",
    }
    await syncWaxInList(options);
    await syncThirdPartiesList();
}

function onHide() {
    show.value = false;
    emit('update:modelValue', show.value);
}

async function onCreate() {
    if (waxInSelected.value) {
        try {
            if (weight > waxInSelected.value.value.weight_left) throw new Error(`La quantité utilisé ne peut pas être supérieur à la quantité restante du lot d'entrée`);
            const createTraceData = {
                wax_in: waxInSelected.value.value.id,
                weight: weight.value,
                wax_out: props.waxOutItem.id,
            }
            const updateWaxInData = {
                weight_left: waxInSelected.value.value.weight_left - weight.value,
            }
            await createWaxInOutTrace(createTraceData);
            await updateWaxInItem(updateWaxInData, waxInSelected.value.value.id);
            show.value = false;
            emit('traceAdd');
        } catch(error: any) {
            if (error && error.message) {
                console.error(error.message);
                alert(error.message);
            }
        }
    }
}

const selectWaxInOptions = generateselectWaxInAsOptions('number');
const selectThirdPartiesOptions = generateThirdPartiesListAsOptions('name');

watch(() => props.modelValue, (newValue) => {
    show.value = newValue;
});
</script>