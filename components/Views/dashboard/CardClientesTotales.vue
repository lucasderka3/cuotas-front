<script setup lang="ts">
import useRepositories from "~/Composables/useRepositories";

const res = await useRepositories().dashboard.index()
</script>

<template>
  <v-card
      class="pa-6 d-flex flex-column align-center justify-center text-center"
      rounded="xl"
      elevation="8"
  >
    <v-avatar size="56" class="mb-3" color="primary">
      <v-icon size="32" icon="mdi-account-group"></v-icon>
    </v-avatar>

    <div class="text-h4 font-weight-bold">
      {{ res.cantidadClientes }}
    </div>

    <div class="text-subtitle-1 text-grey-darken-1">
      Clientes Totales
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  min-width: 220px;
}
</style>