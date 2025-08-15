<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {usePlanesStore} from "~/store/PlanesStore";

const planesStore = usePlanesStore();

const nombre = ref('');
const descripcion = ref('');
const precio = ref<number>(null);
const frecuenciaPago = ref('');

const dialogFormulario = ref(false);
const dialogExito = ref(false);

const rules = {
  nombre: {required},
  descripcion: {required},
  precio: {required},
  frecuenciaPago: {required}
}

const formData = { nombre, descripcion, precio, frecuenciaPago }
const v$ = useVuelidate(rules, formData);

const enviarFormulario = async () => {
  const esValido = await v$.value.$validate();
  if(!esValido) return;

  await planesStore.crearPlan({
    nombre: nombre.value,
    descripcion: descripcion.value,
    precio: Number(precio.value),
    frecuencia_pago: frecuenciaPago.value
  })

  if(planesStore.success){
    dialogExito.value = true
    nombre.value = ''
    descripcion.value = ''
    precio.value
    frecuenciaPago.value = ''
    v$.value.$reset()
    dialogFormulario.value = false
  }

}

</script>

<template>
  <v-container>

    <v-btn
      color="primary"
      class="mb-4"
      @click="dialogFormulario = true"
      prepend-icon="mdi mdi-plus-circle"
    >
      Nuevo plan
    </v-btn>

    <v-dialog v-model="dialogFormulario" max-width="500px">
      <v-card>
        <v-card-title>Crear nuevo plan</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="enviarFormulario">
            <v-text-field
                v-model="nombre"
                label="Nombre del Plan"
                :disabled="planesStore.loading"
                required
            />

            <v-text-field
                v-model="descripcion"
                label="Descripción"
                :disabled="planesStore.loading"
                required
            />

            <v-text-field
                v-model="precio"
                label="Precio"
                type="number"
                :disabled="planesStore.loading"
                required
            />

            <v-text-field
                v-model="frecuenciaPago"
                label="Frecuencia de Pago"
                :disabled="planesStore.loading"
                required
            />

            <v-btn
                type="submit"
                :loading="planesStore.loading"
                color="primary"
                class="mt-4"
            >
              Crear
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExito" max-width="400">
      <v-card>
        <v-card-title class="text-h6">✅ Plan creado</v-card-title>
        <v-card-text>El nuevo plan fue creado correctamente</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialogExito = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<style scoped>

</style>