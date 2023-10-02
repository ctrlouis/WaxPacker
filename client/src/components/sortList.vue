<template>
    <q-btn flat no-caps rounded :icon-right="icon" :label="sort.label" @click="onShow" />
    <q-dialog v-model="show" position="bottom">
        <div class="text-center">Trier par</div>
        <q-list>
            <q-item v-for="option in options" dark clickable v-ripple @click="onSelect(option)">
                <q-item-section>
                    <q-item-label>{{ option.label }}</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-icon v-if="sort.value === option.value" :name="icon" />
                </q-item-section>
            </q-item>
        </q-list>
    </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface sortOption {
    label: string;
    value: string;
    arrangement: string;
}

const props = defineProps([ 'modelValue', 'options' ]);

const emit = defineEmits([ 'update:modelValue', 'sort' ]);

const icon = ref('arrow_upward');
const sort = ref(props.modelValue);
const show = ref(false);

function onSelect(value: sortOption) {
    if (value.value === sort.value.value) {
        if (value.arrangement === '+') {
            value.arrangement = '-';
            icon.value = 'arrow_downward';
        } else {
            value.arrangement = '+';
            icon.value = 'arrow_upward';
        }
    } else {
        icon.value = 'arrow_upward';
    }
    sort.value = value;
    emit('update:modelValue', value);
    emit('sort');
}

function onShow() {
    show.value = true;
}

watch(() => props.modelValue, (newValue) => {
    sort.value = newValue;
});

// const icon = computed(() => {
//     let i = 'arrow_upward';
//     if (sort.value.arrangement === '-') {
//         i = 'arrow_downward';
//     }
//     return i;
// });
</script>