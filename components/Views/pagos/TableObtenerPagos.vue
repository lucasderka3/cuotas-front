<script setup lang="ts">
import {usePagosStore} from "~/store/PagosStore";
import {useAsyncData} from "#app";
import InfoPagos from "~/components/Views/pagos/InfoPagos.vue";

const pagosStore = usePagosStore()
await useAsyncData('pagos', () => pagosStore.fetchPagos());

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'FECHA', key: 'fecha', },
  { title: 'Info', key: 'acciones'}
];
</script>

<template>
  <v-card>
    <v-card-title class="text-center">📋 Lista de Pagos Realizados</v-card-title>
    <v-divider></v-divider>
    <v-data-table
      v-if="pagosStore.pagos.length"
      :headers="headers"
      :items="pagosStore.pagos"
      :items-per-page="10"
      class="elevation-1 rounded"
      dense
    >

      <template #item.fecha="{ item }">
        {{ formatDateTime(item.fecha) }}
      </template>

      <template #item.acciones="{item}">
        <InfoPagos :info="item"/>
      </template>
    </v-data-table>

  </v-card>
</template>

<style scoped>

</style>