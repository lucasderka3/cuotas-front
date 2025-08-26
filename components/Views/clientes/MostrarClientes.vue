<script setup lang="ts">
import {useClientesStore} from "~/store/ClienteStore";
import {useAsyncData} from "#app";


const store = useClientesStore();


const headers = [
  { title: '🪪ID', key: 'id', },
  { title: '👤NOMBRE', key: 'nombre' },
  { title: '👥APELLIDO', key: 'apellido' },
  { title: '⚙️INFO', key: 'info', },
];

const goToDetalle = (id: number) => {
  navigateTo(`/inicio/clientes/${id}`);
}

await useAsyncData('clientes', () => store.fetchClientes())

</script>

<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Clientes</v-card-title>
      <v-divider></v-divider>

      <v-data-table
          v-if="store.clientes.length"
          :headers="headers"
          :items="store.clientes"
          :items-per-page="10"
          class="elevation-1 rounded"
          dense
      >
          <template v-slot:item.info="{ item }">
            <v-btn icon @click="goToDetalle(item.id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
      </v-data-table>


    </v-card>
  </v-container>
</template>

<style scoped>

</style>