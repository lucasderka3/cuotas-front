<script setup lang="ts">
import useRepositories from "~/Composables/useRepositories";

const res = await useRepositories().dashboard.index();
</script>

<template>
  <v-card
      class="pa-6 d-flex flex-column align-center justify-center text-center"
      rounded="xl"
      elevation="8"
      color="success"
      variant="tonal"
  >
    <v-avatar size="56" class="mb-3" color="success">
      <v-icon size="32" icon="mdi-cash-multiple"></v-icon>
    </v-avatar>

    <div class="text-h4 font-weight-bold">
      $ {{ Number(res.totalGanadoMes).toLocaleString("es-AR") }}
    </div>

    <div class="text-subtitle-1 text-success-darken-3">
      Ganancias del Mes
    </div>
  </v-card>
</template>

<style scoped>
.v-card {
  min-width: 220px;
}
</style>