<script setup lang="ts">
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {usePagosStore} from "~/store/PagosStore";

const props = defineProps<{
  cuotaId: number
}>()

//Store
const pagosStore = usePagosStore();

//Dialogs
const dialogFormulario = ref(false);

//Validaciones
const cuotaId = ref<number>(props.cuotaId);
const metodoPago = ref('');
const observaciones = ref('');

const rules = {
  cuotaId: {required},
  metodoPago: {required}
}

const formData = { cuotaId, metodoPago };
const v$ = useVuelidate(rules, formData);

//Funciones
const enviarFormulario = async () => {
  const esValido = await v$.value.$validate();
  if(!esValido) return;

  await pagosStore.crearPago({
    cuotaId: Number(cuotaId.value),
    metodoPago: metodoPago.value,
    observaciones: observaciones.value
  })

  if(pagosStore.success){
    metodoPago.value = '';
    observaciones.value = '';
    dialogFormulario.value = false;
  }
}
</script>

<template>
  <v-btn
      icon
      variant="outlined"
      color="primary"
      @click="dialogFormulario = true"
  >
    <v-icon>mdi-credit-card-outline</v-icon>
  </v-btn>

  <v-dialog v-model="dialogFormulario" max-width="500px">
    <v-card rounded="xl" elevation="8">

      <v-card-title class="text-h5 text-center font-weight-bold">
        💳 Registrar Pago
      </v-card-title>

      <v-divider></v-divider>


      <v-card-text>
        <v-form @submit.prevent="enviarFormulario">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                  label="ID Cuota"
                  v-model="cuotaId"
                  required
                  readonly
                  variant="outlined"
                  density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                  label="Método de pago"
                  v-model="metodoPago"
                  required
                  variant="outlined"
                  density="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                  label="Observaciones"
                  v-model="observaciones"
                  variant="outlined"
                  auto-grow
                  rows="2"
                  density="comfortable"
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>


      <v-card-actions class="justify-end">
        <v-btn
            variant="text"
            color="grey"
            @click="dialogFormulario = false"
        >
          Cancelar
        </v-btn>

        <v-btn
            type="submit"
            :loading="pagosStore.loading"
            color="primary"
            variant="flat"
            class="px-6"
            @click="enviarFormulario"
            append-icon="mdi mdi-credit-card-outline"
        >
          Pagar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<style scoped>

</style>