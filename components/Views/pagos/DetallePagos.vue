<script setup lang="ts">
import {usePagosStore} from "~/store/PagosStore";
import InfoPagos from "~/components/Views/pagos/InfoPagos.vue";

const pagosStore = usePagosStore();

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('es-AR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

await useAsyncData('pagos', () => pagosStore.fetchPagos())
</script>

<template>
  <v-card elevation="2" class="pa-4 rounded-xl">
    <v-card-title class="text-h6 font-weight-bold">
      📋 Lista de Pagos Realizados
    </v-card-title>

    <v-divider class="mb-4"></v-divider>

    <v-row v-if="pagosStore.pagos.length" dense>
      <v-col
          v-for="pago in pagosStore.pagos"
          :key="pago.id"
          cols="12"
          sm="6"
          md="4"
      >
        <v-card class="rounded-xl pa-3 h-100 d-flex flex-column justify-space-between bg-grey-darken-4">
          <div>
            <v-card-title class="text-subtitle-1">
              <strong>Fecha:</strong> {{ formatDateTime(pago.fecha) }}
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              <strong>ID:</strong> {{ pago.id }}
            </v-card-subtitle>
          </div>

          <div class="mt-2">
            <InfoPagos :info="pago"/>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-else type="info" class="mt-4">
      No hay pagos registrados.
    </v-alert>
  </v-card>
</template>

<style scoped>
.h-100 {
  height: 100%;
}
</style>