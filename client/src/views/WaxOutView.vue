<template>
    <h1 class="mt-32 mb-4 text-5xl">Lots de sorties</h1>
    <div class="mb-4 text-right">
        <sortList v-model="sort" :options="sortOptions" @sort="onSort" />
    </div>
    <waxList :type="waxType" :list="waxOutList" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <RouterLink to="/w/out/new">
            <q-btn round icon="add" color="orange" />
        </RouterLink>
    </q-page-sticky>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import sortList from '@/components/sortList.vue';
import waxList from '@/components/waxList.vue';

const { 
    list: waxOutList,
    sync: syncWaxOutList,
} = usePocketbaseList('wax_out');

const sort = ref({ label: "N° de lot", value: 'number', arrangement: '+' });
const sortOptions = [
    { label: "N° de lot", value: 'number', arrangement: '+' },
    { label: "Label", value: 'label', arrangement: '+' },
    { label: "Tier", value: "third_partie", arrangement: '+' },
    { label: "Lot perso", value: "perso", arrangement: '+' },
    { label: "Bio", value: "bio", arrangement: '+' },
];
const waxType = 'out';

async function onSort() {
    const options = {
        sort: `${sort.value.arrangement}${sort.value.value}`,
    };
    await syncWaxOutList(options);
}

onMounted(async () => {
    const options = {
        sort: `${sort.value.arrangement}${sort.value.value}`,
    };
    await syncWaxOutList(options);
});
</script>