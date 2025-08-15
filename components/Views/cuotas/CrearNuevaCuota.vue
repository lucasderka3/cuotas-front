<script setup lang="ts">
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useCuotasStore} from "~/store/CuotasStore";

//Store
const cuotasStore = useCuotasStore();

const dialogNuevaCuota = ref(false);
const route = useRoute();
const idCliente = Number(route.params.id);

//Validaciones
const clienteId = ref(idCliente);
const planId = ref<number>(null);
const fechaInicio = ref('');
const fechaFin = ref('');
const monto = ref<number>(null);
const observaciones = ref('');

const rules = {
  clienteId: {required},
  planId: {required},
  fechaInicio: {required},
  fechaFin: {required},
  monto: {required},
}

const formData = { clienteId, planId, fechaInicio, fechaFin, monto };
const v$ = useVuelidate(rules, formData);

//Funciones
const enviarFormulario = async () => {
  const esValido = await v$.value.$validate();
  if (!esValido) return;

  await cuotasStore.crearCuota({
    clienteId: clienteId.value,
    planId: Number(planId.value),
    fechaInicio: fechaInicio.value,
    fechaFin: fechaFin.value,
    monto: Number(monto.value),
    observaciones: observaciones.value,
  })

  if(cuotasStore.success){
    planId.value = Number('');
    fechaInicio.value = '';
    fechaFin.value = '';
    monto.value = Number('');
    observaciones.value = '';
    dialogNuevaCuota.value = false;
  }

}

</script>

<template>
  <v-btn
    icon
    @click="dialogNuevaCuota = true"
  >
    <v-icon>mdi mdi-tag-plus</v-icon>
  </v-btn>

  <v-dialog v-model="dialogNuevaCuota" max-width="600px">
    <v-card>
      <v-card-title class="text-h5 text-center">Asignar una nueva cuota</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="enviarFormulario">
          <v-text-field
            v-model="planId"
            label="Plan"
            required
          />
          <v-text-field
            v-model="fechaInicio"
            label="Fecha de inicio"
            required
          />
          <v-text-field
            v-model="fechaFin"
            label="Fecha de fin"
            required
          />
          <v-text-field
            v-model="monto"
            label="Monto"
            required
          />
          <v-text-field
            v-model="observaciones"
            label="Observaciones"
          />

          <v-btn
            type="submit"
            :loading="cuotasStore.loading"
            color="primary"
            class="mt-4"
          >
            Crear cuota
          </v-btn>

        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>