<script setup lang="ts">
import {FetchPago} from "~/core/types/Pago";

const props = defineProps<{
  info: FetchPago;
}>()

const dialogInfo = ref(false);
</script>

<template>
  <!-- Botón para abrir -->
  <v-btn
      @click="dialogInfo = true"
      variant="outlined"
      size="small"
      prepend-icon="mdi-information-outline"
  >
    Ver más
  </v-btn>


  <v-dialog v-model="dialogInfo" max-width="500" location="center">
    <v-card rounded="xl" elevation="4">
      <v-card-title class="text-h6 text-center font-weight-bold">
        Detalles del Pago
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6">
            <strong>Nombre:</strong> {{ props.info.cliente.nombre }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Apellido:</strong> {{ props.info.cliente.apellido }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Monto:</strong> ${{ props.info.monto }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Método de pago:</strong> {{ props.info.metodoPago }}
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn text @click="dialogInfo = false">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style scoped>

</style>