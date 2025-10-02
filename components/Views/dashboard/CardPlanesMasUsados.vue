<script setup lang="ts">

import useRepositories from "~/Composables/useRepositories";

const res = await useRepositories().dashboard.index();

</script>

<template>
  <v-card
      rounded="xl"
      elevation="8"
      class="pa-4"
  >
    <v-card-title class="text-h6 font-weight-bold text-center">
      📊 Planes más contratados
    </v-card-title>

    <v-divider class="mb-4"></v-divider>

    <v-table hover density="comfortable" class="rounded-lg">
      <thead class="bg-grey-lighten-3">
      <tr>
        <th class="text-left font-weight-bold">Nombre</th>
        <th class="text-left font-weight-bold">Contratados</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item, i) in res.planesMasUsados"
          :key="i"
      >
        <td class="text-subtitle-2">{{ item.plan }}</td>
        <td class="text-subtitle-2 font-weight-medium">{{ item.usos }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<style scoped>
.v-table thead th {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

</style>