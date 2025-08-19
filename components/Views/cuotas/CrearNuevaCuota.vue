<script setup lang="ts">
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useCuotasStore} from "~/store/CuotasStore";
import {usePlanesStore} from "~/store/PlanesStore";
import {useClientesStore} from "~/store/ClienteStore";

//Store
const clienteStore = useClientesStore();
const cuotasStore = useCuotasStore();
const planesStore = usePlanesStore();

//Dialogs
const dialogNuevaCuota = ref(false);
const dialogDateInicio = ref(false);
const dialogDateFin = ref(false);
const dialogExito = ref(false);

//Rutas
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
    dialogExito.value = true;
    planId.value = Number('');
    fechaInicio.value = '';
    fechaFin.value = '';
    monto.value = Number('');
    observaciones.value = '';
    await useAsyncData('cuotas', () =>  clienteStore.fetchCuotasByCliente(idCliente));
    dialogNuevaCuota.value = false;
  }

}
await useAsyncData('planes', () => planesStore.fetchPlanes())
</script>

<template>
  <v-btn
    icon
    variant="outlined"
    color="primary"
    @click="dialogNuevaCuota = true"
  >
    <v-icon>mdi mdi-tag-plus</v-icon>
  </v-btn>

  <v-dialog v-model="dialogNuevaCuota" max-width="600px">
    <v-card rounded="xl" elevation="8">

      <v-card-title class="text-h5 text-center font-weight-bold">
        📅 Asignar una nueva cuota
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="enviarFormulario">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-select
                  v-model="planId"
                  :items="planesStore.planes"
                  item-title="nombre"
                  item-value="id"
                  label="Plan"
                  required
                  variant="outlined"
                  density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                  v-model="monto"
                  label="Monto"
                  type="number"
                  prepend-inner-icon="mdi-currency-usd"
                  required
                  variant="outlined"
                  density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu
                  v-model="dialogDateInicio"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                      v-model="fechaInicio"
                      label="Fecha inicio"
                      readonly
                      v-bind="props"
                      prepend-inner-icon="mdi-calendar"
                      variant="outlined"
                      density="comfortable"
                  />
                </template>
                <v-date-picker v-model="fechaInicio" />
              </v-menu>
            </v-col>

            <v-col cols="12" sm="6">
              <v-menu
                  v-model="dialogDateFin"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  max-width="290px"
                  min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                      v-model="fechaFin"
                      label="Fecha fin"
                      readonly
                      v-bind="props"
                      prepend-inner-icon="mdi-calendar"
                      variant="outlined"
                      density="comfortable"
                  />
                </template>
                <v-date-picker v-model="fechaFin" />
              </v-menu>
            </v-col>

            <v-col cols="12">
              <v-textarea
                  v-model="observaciones"
                  label="Observaciones"
                  auto-grow
                  rows="2"
                  prepend-inner-icon="mdi-note-text"
                  variant="outlined"
                  density="comfortable"
              />
            </v-col>
          </v-row>

          <v-btn
              type="submit"
              :loading="cuotasStore.loading"
              color="primary"
              block
              class="px-6"
              variant="flat"
          >
            Crear cuota
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="dialogExito" max-width="400">
    <v-card>
      <v-card-title class="text-h6">✅ Cuota creada</v-card-title>
      <v-card-text>La nueva cuota fue asignada correctamente</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="dialogExito = false">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>