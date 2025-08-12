<script setup lang="ts">
import FormCrearPlan from "~/components/Views/planes/FormCrearPlan.vue";
import ShowCardsPlan from "~/components/Views/planes/ShowCardsPlan.vue";

definePageMeta({
  layout: 'administracion'
})
</script>

<template>
  <title>Planes</title>
  <ShowCardsPlan/>
  <FormCrearPlan/>
</template>

<style scoped>

</style>