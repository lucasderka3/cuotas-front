<script setup lang="ts">
import {usePlanesStore} from "~/store/PlanesStore";
import {Plan} from "~/core/types/Plan";

const planesStore = usePlanesStore();
await useAsyncData('planes', () => planesStore.fetchPlanes())

const dialog = ref(false);
const editedPlan = ref<Plan>(null);

const openEditDialog = (plan: Plan) => {
  editedPlan.value = {...plan}
  dialog.value = true;
}

const saveChanges = async () => {
  if (!editedPlan.value) return


  const { nombre, descripcion, precio, frecuencia_pago } = editedPlan.value

  const payload = {
    nombre,
    descripcion,
    precio: Number(precio),
    frecuencia_pago
  }

  const updated = await planesStore.updatePlan(editedPlan.value.id, payload)

  if (updated) {
    dialog.value = false
    await useAsyncData('planes', () => planesStore.fetchPlanes())
  }
}


</script>

<template>
  <v-container>
    <v-row dense>
      <v-col
          v-for="plan in planesStore.planes"
          :key="plan.id"
          cols="12"
          md="4"
      >
        <v-card>
          <v-card-title>{{ plan.nombre }}</v-card-title>
          <v-card-subtitle>{{ plan.descripcion }}</v-card-subtitle>
          <v-card-text>
            Precio: {{ plan.precio }}
          </v-card-text>
          <v-card-actions>
            <v-btn icon color="primary" @click="openEditDialog(plan)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog para editar -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Editar Plan</v-card-title>
        <v-card-text>
          <v-text-field
              v-model="editedPlan.nombre"
              label="Nombre"
          />
          <v-textarea
              v-model="editedPlan.descripcion"
              label="Descripción"
          />
          <v-text-field
              v-model="editedPlan.precio"
              label="Precio"
              type="number"
          />
          <v-text-field
              v-model="editedPlan.frecuencia_pago"
              label="Frecuencia de pago"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="saveChanges">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>

</style>