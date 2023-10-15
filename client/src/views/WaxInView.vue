<template>
    <h1 class="mt-32 mb-4 text-5xl">Lots d'entrés</h1>
    <div class="mb-4 flex justify-around">
        <q-btn v-for="currentFilter in filters" rounded :label="currentFilter.label" :flat="true" @click="onFilter(currentFilter.filter)" />
    </div>
    <div class="mb-4 text-right">
        <sortList v-model="sort" :options="sortOptions" @sort="onSort" />
    </div>
    <waxList :type="waxType" :list="waxInList" />
    <q-page-sticky position="bottom-right" :offset="[32, 32]">
        <RouterLink to="/w/in/new">
            <q-btn round icon="add" color="orange" size="lg" />
        </RouterLink>
    </q-page-sticky>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import sortList from '@/components/sortList.vue';
import waxList from '@/components/waxList.vue';
import type { RecordListOptions } from 'pocketbase';

const { 
    list: waxInList,
    sync: syncWaxInList,
} = usePocketbaseList('wax_in');

const waxInListOptions = ref<RecordListOptions>({});

const filters = ref([
    {
        label: "Tous",
        filter: ``,
    },
    {
        label: "Lot perso",
        filter: `perso = true`,
    },
    {
        label: "Bio",
        filter: `bio = true`,
    },
]);

const sort = ref({ label: "N° de lot", value: 'number', arrangement: '-' });
const sortOptions = ref([
    { label: "N° de lot", value: 'number', arrangement: '+' },
    { label: "Label", value: 'label', arrangement: '+' },
    { label: "Poids original", value: 'weight_net', arrangement: '+' },
    { label: "Poids restant", value: 'weight_left', arrangement: '+' },
    { label: "Date d'entrée", value: 'entry_date', arrangement: '+' },
    { label: "Tier", value: "third_partie", arrangement: '+' },
    { label: "Lot perso", value: "perso", arrangement: '+' },
    { label: "Bio", value: "bio", arrangement: '+' },
]);
const waxType = ref('in');

async function onFilter(value: string) {
    waxInListOptions.value.filter = value;
    await syncWaxInList(waxInListOptions.value);
}

async function onSort() {
    waxInListOptions.value.sort = `${sort.value.arrangement}${sort.value.value}`;
    await syncWaxInList(waxInListOptions);
}

onMounted(async () => {
    waxInListOptions.value.sort = `${sort.value.arrangement}${sort.value.value}`;
    await syncWaxInList(waxInListOptions.value);
});
</script>