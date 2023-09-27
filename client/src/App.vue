<template>
  <!-- <div class="q-pa-md"> -->
    <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders">
        <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
            <q-toolbar>
                <q-btn flat round dense icon="menu" @click="toggleDrawer" />
                <q-toolbar-title>Header</q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="drawer"
            dark
            show-if-above
            :width="200"
            :breakpoint="700"
            elevated
        >
            <q-scroll-area class="fit">
                <RouterLink to="/" class="flex row align-item">
                    <q-btn flat round icon="home" /> <div class="font-bold">Acceuil</div>
                </RouterLink>
                <RouterLink to="/w/in">
                    <q-btn flat round icon="input" /> <div class="font-bold">Entrés</div>
                </RouterLink>
                <RouterLink to="/w/out">
                    <q-btn flat round icon="output" /> <div class="font-bold">Sorties</div>
                </RouterLink>
                <RouterLink to="/t">
                    <q-btn flat round icon="person" /> <div class="font-bold">Tiers</div>
                </RouterLink>
            </q-scroll-area>
        </q-drawer>

        <q-page-container>
            <q-page padding>
                <RouterView />
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const drawer = ref(false);

function toggleDrawer() {
    drawer.value = !drawer.value;
}
</script>

<style scoped>
header {
    line-height: 1.5;
    max-height: 100vh;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;

        padding: 1rem 0;
        margin-top: 1rem;
    }
}
</style>
