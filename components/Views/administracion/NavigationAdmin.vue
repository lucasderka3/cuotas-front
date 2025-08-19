<script setup lang="ts">

import NuevoCliente from "~/components/Views/clientes/NuevoCliente.vue";
</script>

<template>
  <v-navigation-drawer floating permanent>
    <v-card class="d-flex justify-center pa-7" elevation="2">
      <v-card-title class="text-center">Panel de Administración</v-card-title>
    </v-card>
    <v-divider></v-divider>
    <v-list density="comfortable" nav>
      <v-list-item prepend-icon="mdi mdi-home-account" title="Inicio" to="/inicio"></v-list-item>
      <v-list-item prepend-icon="mdi mdi-view-dashboard" title="Dashboard" to="/inicio/dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi mdi-account-multiple" title="Clientes" to="/inicio/clientes"></v-list-item>
      <v-list-item prepend-icon="mdi mdi-dumbbell" title="Planes" to="/inicio/planes"></v-list-item>
      <v-list-item prepend-icon="mdi mdi-sticker" title="Caja" to="/inicio/caja"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>