<script setup lang="ts">
import {Cuota} from "~/core/types/Cuota";
import FormNuevoPago from "~/components/Views/pagos/FormNuevoPago.vue";


defineProps<{
  cuotas: Cuota[]
}>();

</script>

<template>
  <title>Detalles del cliente</title>

  <v-card>
    <v-card-text>
      <v-row v-if="cuotas.length" dense>
        <v-col
            v-for="cuota in cuotas"
            :key="cuota.id"
            cols="12"
            sm="6"
            md="4"
        >
          <v-card
              class="d-flex flex-column h-100"
              :color="cuota.pagada ? 'green-darken-3' : 'grey-darken-3'"
          >
            <!-- Contenido principal -->
            <v-card-title class="font-weight-bold">
              Plan: {{ cuota.plan.nombre }}
            </v-card-title>

            <v-card-text class="flex-grow-1">
              <div><strong>Monto:</strong> ${{ cuota.monto }}</div>
              <div><strong>Desde:</strong> {{ cuota.fechaInicio }}</div>
              <div><strong>Hasta:</strong> {{ cuota.fechaFin }}</div>
              <div><strong>Estado:</strong> {{ cuota.pagada ? 'Pagada' : 'Pendiente' }}</div>
              <div><strong>Fecha de Pago:</strong> {{ cuota.fechaPago || '—' }}</div>
              <div><strong>Observaciones:</strong> {{ cuota.observaciones || '—' }}</div>
            </v-card-text>

            <!-- Botón abajo siempre -->
            <v-card-actions class="justify-end">
              <FormNuevoPago v-if="!cuota.pagada" :cuota-id="cuota.id" />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <div v-else>
        No hay cuotas para mostrar.
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>