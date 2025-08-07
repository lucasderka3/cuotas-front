<script setup lang="ts">
import {useVuelidate} from '@vuelidate/core'
import {required, email as emailValidator} from '@vuelidate/validators'
import {useClientesStore} from "~/store/ClienteStore";

const clientesStore = useClientesStore();


const nombre = ref('');
const apellido = ref('');
const email = ref('');
const telefono = ref('');

const dialog = ref(false);

const rules = {
  nombre: { required},
  apellido: {required},
  email: {required, email: emailValidator},
  telefono: {}
}

const formData = {nombre, apellido, email, telefono};
const v$ = useVuelidate(rules, formData);

const enviarFormulario = async () => {

  const esValido = await v$.value.$validate();

  if(!esValido) return;


  await clientesStore.crearCliente({
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    telefono: telefono.value
  })

  if(!clientesStore.error){
    dialog.value = true;
    nombre.value = '';
    apellido.value = '';
    email.value = '';
    telefono.value = '';
    v$.value.$reset();
  }

}

</script>

<template>
  <v-container>
    <v-form @submit.prevent="enviarFormulario">
      <v-text-field
        v-model="nombre"
        label="Nombre"
        :error-messages="v$.nombre.$errors.map(e => e.$message)"
        :disabled="clientesStore.loading"
        required
      />

      <v-text-field
        v-model="apellido"
        label="Apellido"
        :error-messages="v$.apellido.$errors.map(e => e.$message)"
        :disabled="clientesStore.loading"
        required
      />

      <v-text-field
        v-model="email"
        label="Email"
        :error-messages="v$.email.$errors.map(e => e.$message)"
        :disabled="clientesStore.loading"
        required
      />

      <v-text-field
        v-model="telefono"
        label="Telefono"
        :disabled="clientesStore.loading"
      />

      <v-btn
          type="sumbit"
          :loading="clientesStore.loading"
          color="primary"
          class="mt-4"
      >Crear Cliente</v-btn>

      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6">✅ Cliente creado</v-card-title>
          <v-card-text>El cliente fue registrado exitosamente.</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="dialog = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-form>
  </v-container>
</template>

<style scoped>

</style>