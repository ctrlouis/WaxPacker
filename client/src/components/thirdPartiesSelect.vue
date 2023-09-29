<template>
    <q-select
        dark
        v-model="thirdPartieSelected"
        label="Tier"
        :options="thirdPartiesListOptions"
        @update:model-value="onUpdate"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                Aucuns resultats
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import type { QSelectOption } from 'quasar';

const props = defineProps(['modelValue']);

const emit = defineEmits(['update:modelValue']);

const {
    sync: syncThirdPartiesList,
    generateListAsOptions: generateThirdPartiesListAsOptions,
} = usePocketbaseList('third_parties');

const thirdPartieSelected = ref();

function onUpdate(value: QSelectOption) {
    emit('update:modelValue', value);
}

const thirdPartiesListOptions = generateThirdPartiesListAsOptions('name');

watch(() => props.modelValue, (newValue) => {
    thirdPartieSelected.value = newValue;
});

onMounted(async () => {
    await syncThirdPartiesList();
});
</script>