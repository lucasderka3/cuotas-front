<script setup lang="ts">
import {useClientesStore} from "~/store/ClienteStore";
import DetalleCliente from "~/components/Views/clientes/DetalleCliente.vue";
import CuotasCliente from "~/components/Views/clientes/CuotasCliente.vue";
import CrearNuevaCuota from "~/components/Views/cuotas/CrearNuevaCuota.vue";
definePageMeta({
  layout: 'administracion'
})

const route = useRoute();
const id = Number(route.params.id);
const store = useClientesStore()

await store.fetchCuotasByCliente(id)

const backToClientes = () => {
  navigateTo(`/inicio/clientes/`);
}
</script>

<template>
  <v-container>


    <v-sheet
        class="d-flex align-center justify-space-between pa-3 mb-4"
        elevation="1"
    >
      <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-arrow-left"
          @click="backToClientes"
      >
        Volver
      </v-btn>
      <v-card-title class="text-h6 font-weight-medium">
        Detalle del Cliente
      </v-card-title>

      <CrearNuevaCuota/>
    </v-sheet>


    <v-row dense>

      <v-col cols="12" md="5">
        <v-card elevation="2">
          <v-card-title class="text-h6 text-center font-weight-bold">Información del Cliente</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <DetalleCliente v-if="store.clienteSeleccionado" :cliente="store.clienteSeleccionado"/>
          </v-card-text>
        </v-card>
      </v-col>


      <v-col cols="12" md="7">
        <v-card elevation="2">
          <v-card-title class="text-h6 text-center font-weight-bold">Cuotas</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <CuotasCliente :cuotas="store.cuotasCliente" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>