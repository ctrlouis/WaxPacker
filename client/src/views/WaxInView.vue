<template>
    <h1>Lots d'entrés</h1>
    <sortList v-model="sort" :options="sortOptions" @sort="onSort" />
    <waxList :type="waxType" :list="waxInList" />
    <RouterLink to="/w/in/new">
        <q-btn round icon="add" color="orange" />
    </RouterLink>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import sortList from '@/components/sortList.vue';
import waxList from '@/components/waxList.vue';

const { 
    list: waxInList,
    sync: syncWaxInList,
} = usePocketbaseList('wax_in');

const sort = ref({ label: "N° de lot", value: 'number', arrangement: '+' });
const sortOptions = [
    { label: "N° de lot", value: 'number', arrangement: '+' },
    { label: "Label", value: 'label', arrangement: '+' },
    { label: "Poids original", value: 'weight_net', arrangement: '+' },
    { label: "Poids restant", value: 'weight_left', arrangement: '+' },
    { label: "Date d'entrée", value: 'entry_date', arrangement: '+' },
    { label: "Tier", value: "third_partie", arrangement: '+' },
    { label: "Lot perso", value: "perso", arrangement: '+' },
    { label: "Bio", value: "bio", arrangement: '+' },
];
const waxType = ref('in');

async function onSort() {
    const options = {
        sort: `${sort.value.arrangement}${sort.value.value}`,
    };
    await syncWaxInList(options);
}

onMounted(async () => {
    const options = {
        sort: `${sort.value.arrangement}${sort.value.value}`,
    };
    await syncWaxInList(options);
});
</script>