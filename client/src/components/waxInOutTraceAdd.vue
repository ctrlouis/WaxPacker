<template>
    <q-btn label="ajouter" @click="open" />

    <q-dialog v-model="show">
        <q-card dark>
            <q-card-section>
                <div class="text-h6">Lier un lot d'entrée</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-select
                    dark
                    v-model="waxInSelected"
                    label="Lot d'entrée"
                    :options="selectOptions"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                            Aucuns resultats
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                <q-input v-if="waxInSelected" v-model="weight" dark type="number" min="0" :max="waxInSelected.weight_left" />
                {{  waxInSelected  }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="primary" @click="close" />
                <q-btn label="Ajouter" color="primary" @click="onCreate" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { RecordModel } from 'pocketbase';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import { useWaxInOutTrace } from '@/composables/useWaxInOutTrace';

interface SelectRecordModel {
    label: string,
    value: RecordModel,
}

const props = defineProps([ 'waxOutItem' ]);
const emit = defineEmits([ 'traceAdd' ]);

const {
    list: waxInList,
    sync: syncWaxInList,
} = usePocketbaseList('wax_in');

const {
    createWaxInOutTrace,
} = useWaxInOutTrace();

const show = ref(false);
const waxInSelected = ref<SelectRecordModel|null>();
const weight = ref(0);

function open() {
    show.value = true;
    waxInSelected.value = null;
    const options = {
        filter: "weight_left > 0",
    }
    syncWaxInList(options);
}

function close() {
    show.value = false;
}

async function onCreate() {
    if (waxInSelected.value) {
        console.log(waxInSelected);
        
        const data = {
            wax_in: waxInSelected.value.value.id,
            weight: weight.value,
            wax_out: props.waxOutItem.id,
        }
        try {
            await createWaxInOutTrace(data);
            show.value = false;
            emit('traceAdd');
        } catch(error) {
            console.error(error.message);
            alert(error.message);
        }
    }
}

const selectOptions = computed(() => {
    let options: any[] = [];
    if (waxInList.value) {
        options = waxInList.value.map((item: RecordModel) => {
            return { label: item.number, value: item }
        });
    }
    return options;
});
</script>