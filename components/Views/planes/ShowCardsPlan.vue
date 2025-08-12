<script setup lang="ts">
import {usePlanesStore} from "~/store/PlanesStore";

const planesStore = usePlanesStore();

onMounted(() => {
  planesStore.fetchPlanes()
})
</script>

<template>
  <v-container>
    <v-progress-linear
        v-if="planesStore.loading"
        indeterminate
        color="primary"
        class="mb-4"
    />


    <v-row dense>
      <v-col
          v-for="plan  in planesStore.planes" :key="plan.id"
          cols="12"
          md="4"
      >
        <v-card>
          <v-card-title>{{ plan.nombre }}</v-card-title>
          <v-card-subtitle>
            Precio: {{ plan.precio }} | Pago: {{ plan.frecuencia_pago }}
          </v-card-subtitle>
          <v-card-text>
            {{ plan.descripcion }}
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<style scoped>

</style>