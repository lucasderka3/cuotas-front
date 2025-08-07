<script setup lang="ts">
import Toolbar from "~/components/Views/Toolbar.vue";
import Footer from "~/components/Views/Footer.vue";


</script>

<template>
  <v-app>
    <Toolbar/>
    <v-main class="pt-0">
      <NuxtPage/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<style scoped>

</style>