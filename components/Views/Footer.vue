<<script setup lang="ts">


</script>

<template>
  <v-footer class="d-flex align-center justify-center ga-2 flex-wrap flex-grow-1 py-3 style">

    <v-btn-secondary>Acerca de nosotros</v-btn-secondary>
    <v-btn-secondary>Contáctanos</v-btn-secondary>
    <v-btn-secondary>Redes</v-btn-secondary>

    <div class="flex-1-0-100 text-center mt-2">
      {{ new Date().getFullYear() }} — <strong>"NOMBRE PLANTILLA"</strong>
    </div>
  </v-footer>
</template>

<style scoped>
.style{
  background-color: rgb(var(--v-theme-background)) ;
}
</style>