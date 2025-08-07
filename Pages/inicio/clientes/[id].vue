<script setup lang="ts">
import {useClientesStore} from "~/store/ClienteStore";
import DetalleCliente from "~/components/Views/clientes/DetalleCliente.vue";
import CuotasCliente from "~/components/Views/clientes/CuotasCliente.vue";
definePageMeta({
  layout: 'administracion'
})

const route = useRoute();
const id = Number(route.params.id);
const store = useClientesStore()

await store.fetchCuotasByCliente(id)
</script>

<template>
  <v-row>
    <v-col cols="6">
      <DetalleCliente v-if="store.clienteSeleccionado" :cliente="store.clienteSeleccionado" />
    </v-col>
    <v-col cols="6">
    <CuotasCliente :cuotas="store.cuotasCliente"></CuotasCliente>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>