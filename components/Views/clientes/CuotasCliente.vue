<script setup lang="ts">
import {Cuota} from "~/core/types/Cuota";
import CrearNuevaCuota from "~/components/Views/cuotas/CrearNuevaCuota.vue";

defineProps<{
  cuotas: Cuota[]
}>();

</script>

<template>
  <title>Detalles del cliente</title>

  <v-container>
    <v-card>
      <v-row>
        <v-col cols="6">
        <v-card-title>Cuotas del cliente</v-card-title>
        </v-col>
        <v-col cols="6">
          <CrearNuevaCuota/>
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>

      <v-card-text>
        <v-row v-if="cuotas.length">
          <v-col
              v-for="cuota in cuotas"
              :key="cuota.id"
              cols="12"
              sm="6"
              md="4"
          >
            <v-card outlined>
              <v-card-title class="text-subtitle-1">
                Monto: ${{ cuota.monto }}
              </v-card-title>
              <v-card-text>
                <div><strong>Desde:</strong> {{ cuota.fechaInicio }}</div>
                <div><strong>Hasta:</strong> {{ cuota.fechaFin }}</div>
                <div><strong>Estado:</strong> {{ cuota.pagada ? 'Pagada' : 'Pendiente' }}</div>
                <div><strong>Observaciones:</strong> {{ cuota.observaciones || '—' }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div v-else>
          No hay cuotas para mostrar.
        </div>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<style scoped>

</style>