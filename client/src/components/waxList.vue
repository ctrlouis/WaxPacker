<template>
    <q-list bordered separator>
        <q-item v-for="item in list" clickable v-ripple>
            <q-item-section>{{ item.label }} - {{ item.number }}</q-item-section>
            <q-item-section>{{ item.weight_original }} Kg</q-item-section>
        </q-item>
    </q-list>
</template>

<script setup lang="ts">
import type { RecordModel } from 'pocketbase';

defineProps([ 'list' ]);
</script>