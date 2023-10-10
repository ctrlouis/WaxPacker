<template>
    <q-table
       flat
       bordered
       :columns="columns"
       :rows="waxOuTrace"
       row-key="name"
       dark
       color="amber"
       hide-bottom
   />
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { usePocketbaseList } from '@/composables/usePocketbaseList';

const {
   list: waxOuTrace,
   sync: syncWaxOutTrace,
} = usePocketbaseList('wax_out_trace');

const props = defineProps([ 'waxOutItem' ]);

const columns = ref<any>([
   {
       name: 'wax_out',
       label: "Lot de sortie",
       align: 'center',
       field: (row: any) =>  row.expand.wax_out.number,
       sortable: true,
   },
   {
       name: 'weight',
       label: "Poids (kg)",
       align: 'center',
       field: (row: any) => row.weight,
       sortable: true,
   },
   {
       name: 'third_partie',
       label: "Tier",
       align: 'center',
       field: (row: any) => row.expand.third_partie.name,
       sortable: true,
   },
]);

onMounted(async () => {
   const options = {
       filter: "",
       expand: 'wax_out,third_partie',
   };
   await syncWaxOutTrace(options);
})
</script>