<script setup lang="ts">
import CardTotalGanado from "~/components/Views/dashboard/CardTotalGanado.vue";
import CardClientesTotales from "~/components/Views/dashboard/CardClientesTotales.vue";
import CardPlanesMasUsados from "~/components/Views/dashboard/CardPlanesMasUsados.vue";
import CardCuotasPorVencer from "~/components/Views/dashboard/CardCuotasPorVencer.vue";

definePageMeta({
  layout: 'administracion'
})
</script>

<template>
  <title>Dashboard</title>
  <v-container fluid>
    <v-row>

      <v-col cols="12" md="6">
        <CardTotalGanado />
      </v-col>
      <v-col cols="12" md="6">
        <CardClientesTotales />

      </v-col>


      <v-col cols="12" md="6">
        <CardPlanesMasUsados />
      </v-col>
      <v-col cols="12" md="6">
        <CardCuotasPorVencer />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>