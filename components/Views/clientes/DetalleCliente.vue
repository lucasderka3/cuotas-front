<script setup lang="ts">
import {Cuota} from "~/core/types/Cuota";
import {Cliente} from "~/core/types/Cliente";

defineProps<{
  cliente: Cliente | null
}>();

const backToClientes = () => {
  navigateTo(`/inicio/clientes/`);
}


</script>

<template>
  <v-container>
    <v-card>
      <v-btn @click="backToClientes">Volver</v-btn>
      <v-card-title>Detalle del cliente</v-card-title>
      <v-card-subtitle><strong>Nombre:</strong> {{cliente.nombre}}</v-card-subtitle>
      <v-card-subtitle>Apellido: {{cliente.apellido}}</v-card-subtitle>

      <v-card-text>Email: {{cliente.email}}</v-card-text>
      <v-card-text>Telefono: {{cliente.telefono}}</v-card-text>

    </v-card>
  </v-container>
</template>

<style scoped>

</style>