<script setup lang="ts">
import MostrarClientes from "~/components/Views/clientes/MostrarClientes.vue";
import NuevoCliente from "~/components/Views/clientes/NuevoCliente.vue";

definePageMeta({
  layout: 'administracion'
})
</script>

<template>
  <title>Clientes</title>
    <NuevoCliente/>

    <MostrarClientes/>

</template>

<style scoped>

</style>