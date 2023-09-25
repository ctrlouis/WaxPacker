<template>
     <q-table
        flat
        bordered
        :columns="columns"
        :rows="waxInOuTrace"
        row-key="name"
        dark
        color="amber"
        hide-bottom
    />
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';
import type { RecordModel } from 'pocketbase';

const {
    list: waxInOuTrace,
    sync: syncWaxInOuTrace,
} = usePocketbaseList('wax_in_out_trace');

const props = defineProps([ 'waxInItem', 'waxOutItem' ]);

const columns = ref([
    {
        name: 'wax_in',
        label: "Lot d'entrée",
        align: 'center',
        field: (row: RecordModel) => row.expand.wax_in.number,
        sortable: true,
    },
    {
        name: 'weight',
        label: "Poids initial (kg)",
        align: 'center',
        field: (row: RecordModel) => row.weight,
        sortable: true,
    },
    {
        name: 'wax_out',
        label: "Lot de sortie",
        align: 'center',
        field: (row: RecordModel) => row.expand.wax_out.number,
        sortable: true,
    },
]);

onMounted(async () => {
    const options = {
        filter: "",
        expand: 'wax_in,wax_out',
    };
    if (props.waxInItem) {
        options.filter = `wax_in='${props.waxInItem.id}'`;
    } else if (props.waxOutItem) {
        options.filter = `wax_out='${props.waxOutItem.id}'`;
    }
    await syncWaxInOuTrace(options);
})
</script>