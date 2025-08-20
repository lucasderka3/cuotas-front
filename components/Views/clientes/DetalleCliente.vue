<script setup lang="ts">
import {Cuota} from "~/core/types/Cuota";
import {Cliente} from "~/core/types/Cliente";

defineProps<{
  cliente: Cliente | null
}>();




</script>

<template>
    <v-card>
      <v-card-title>Nombre: {{cliente.nombre}}</v-card-title>
      <v-card-title>Apellido: {{cliente.apellido}}</v-card-title>
      <v-card-title>Email: {{cliente.email}}</v-card-title>
      <v-card-title>Telefono: {{cliente.telefono}}</v-card-title>
    </v-card>
</template>

<style scoped>

</style>