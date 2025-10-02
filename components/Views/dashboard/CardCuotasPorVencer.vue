<script setup lang="ts">

import useRepositories from "~/Composables/useRepositories";
import {Cuota} from "~/core/types/Cuota";

const cuotas = ref<Cuota[]>();
const selectedCuota = ref<Cuota | null>(null);
const dialog = ref(false);


onMounted(async () => {
  cuotas.value = await useRepositories().dashboard.getCuotasPorVencer(8)
})

function showDetails(cuota: Cuota) {
  selectedCuota.value = cuota;
  dialog.value = true;
}
</script>

<template>
  <v-card
      rounded="xl"
      elevation="8"
      class="pa-4"
  >
    <v-card-title class="text-h6 font-weight-bold d-flex align-center">
      📅 Cuotas por vencer
    </v-card-title>

    <v-divider class="mb-3"></v-divider>

    <v-table hover density="comfortable" class="rounded-lg">
      <thead class="bg-grey-lighten-3">
      <tr>
        <th class="text-left font-weight-bold">Id</th>
        <th class="text-left font-weight-bold">Cliente</th>
        <th class="text-left font-weight-bold">Vencimiento</th>
        <th class="text-left font-weight-bold">Info</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in cuotas"
          :key="item.id"
      >
        <td class="text-subtitle-2">{{ item.id }}</td>
        <td class="text-subtitle-2">{{ item.cliente.nombre }} {{ item.cliente.apellido }}</td>
        <td class="text-subtitle-2 font-weight-medium">
          {{ new Date(item.fechaFin).toLocaleDateString("es-AR") }}
        </td>
        <td>
          <v-btn
              color="primary"
              size="small"
              variant="tonal"
              prepend-icon="mdi-eye"
              @click="showDetails(item)"
          >
            Detalles
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-card>

<!--  Dialog-->
  <v-dialog v-model="dialog" max-width="420">
    <v-card rounded="xl" elevation="10">
      <v-card-title class="text-h6 font-weight-bold">
        Detalles de la cuota
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text v-if="selectedCuota" class="pt-4">
        <p>
          <strong>Plan:</strong>
          {{ selectedCuota.plan.nombre }}
        </p>
        <p>
          <strong>Pagada:</strong>
          <v-chip
              :color="selectedCuota.pagada ? 'success' : 'error'"
              text-color="white"
              variant="flat"
          >
            {{ selectedCuota.pagada ? 'Sí' : 'No' }}
          </v-chip>
        </p>
        <p>
          <strong>Fecha de vencimiento:</strong>
          {{ new Date(selectedCuota.fechaFin).toLocaleDateString("es-AR") }}
        </p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
            variant="tonal"
            color="primary"
            @click="dialog = false"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-table thead th {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

</style>