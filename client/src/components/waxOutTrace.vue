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
                    filled
                    v-model="newTrace"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="selectOptions"
                    @filter="filterFn"
                    hint="Basic filtering"
                    style="width: 250px; padding-bottom: 32px"
                >
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                            Aucuns resultats
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
                {{ selectOptions }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Annuler" color="primary" @click="close" />
                <q-btn label="Ajouter" color="primary" @click="onAdd" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, toValue } from 'vue';
import type { RecordModel } from 'pocketbase';
import { useWaxInList } from '@/composables/useWaxInList';

const {
    waxInList,
    syncWaxInList,
} = useWaxInList();

const show = ref(false);
const newTrace = ref<RecordModel>();
const traceFilter = ref("");

function open() {
    show.value = true;
    const options = {
        filter: "weight_left > 0",
    }
    syncWaxInList(options);
}

function close() {
    show.value = false;
}

function onAdd() {
    // do something
}

function filterFn(val: string, update: Function) {
    update(() => {
        traceFilter.value = val.toLowerCase();
    });
}

const selectOptions = computed(() => {
    let options: any[] = [];
    if (waxInList.value) {
        options = waxInList.value.filter(item => item.number.toLowerCase().indexOf(traceFilter.value) > -1);
        options = options.map((item: RecordModel) => {
            return { label: item.number, value: item }
        });
    }
    return options;
});
</script>