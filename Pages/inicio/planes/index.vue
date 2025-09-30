<script setup lang="ts">
import FormCrearPlan from "~/components/Views/planes/FormCrearPlan.vue";
import ShowCardsPlan from "~/components/Views/planes/ShowCardsPlan.vue";


definePageMeta({
  layout: 'administracion',
})

</script>

<template >
  <title>Planes</title>
    <FormCrearPlan/>
    <ShowCardsPlan/>
</template>

<style scoped>

</style>