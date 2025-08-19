<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'
import { useClientesStore } from '~/store/ClienteStore'

const clientesStore = useClientesStore()

const dialogFormulario = ref(false);

const nombre = ref('')
const apellido = ref('')
const dni = ref('')
const email = ref('')
const telefono = ref('')


const rules = {
  nombre: { required },
  apellido: { required },
  dni: { required },
  email: { required, email: emailValidator },
  telefono: {}
}

const formData = { nombre, apellido, dni, email, telefono }
const v$ = useVuelidate(rules, formData)


const dialogExito = ref(false)
const dialogError = computed({
  get: () => !!clientesStore.error,
  set: (val) => {
    if (!val) clientesStore.error = null
  }
})


const enviarFormulario = async () => {
  const esValido = await v$.value.$validate()
  if (!esValido) return

  await clientesStore.crearCliente({
    nombre: nombre.value,
    apellido: apellido.value,
    dni: dni.value,
    email: email.value,
    telefono: telefono.value
  })

  if (clientesStore.success) {
    dialogExito.value = true
    nombre.value = ''
    apellido.value = ''
    dni.value = ''
    email.value = ''
    telefono.value = ''
    v$.value.$reset()
  }
}
</script>

<template>
<v-container>
    <v-btn
      block
      @click="dialogFormulario = true"
      prepend-icon="mdi mdi-account-plus"
    >
      Nuevo cliente
    </v-btn>

  <v-dialog v-model="dialogFormulario" max-width="600px">
   <v-card rounded="xl" elevation="8">

     <v-card-title class="text-h5 text-center font-weight-bold">
       🆕 Crear un nuevo cliente
     </v-card-title>

     <v-divider></v-divider>

     <v-card-text>
    <v-form @submit.prevent="enviarFormulario">
      <v-text-field
          v-model="nombre"
          label="Nombre"
          :error-messages="v$.nombre.$errors.map(e => e.$message)"
          :disabled="clientesStore.loading"
          required
          clearable
          variant="outlined"
          density="comfortable"
      />

      <v-text-field
          v-model="apellido"
          label="Apellido"
          :error-messages="v$.apellido.$errors.map(e => e.$message)"
          :disabled="clientesStore.loading"
          required
          clearable
          variant="outlined"
          density="comfortable"
      />

      <v-text-field
          v-model="dni"
          label="DNI"
          :error-messages="v$.dni.$errors.map(e => e.$message)"
          :disabled="clientesStore.loading"
          required
          clearable
          variant="outlined"
          density="comfortable"
      />

      <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :error-messages="v$.email.$errors.map(e => e.$message)"
          :disabled="clientesStore.loading"
          required
          clearable
          variant="outlined"
          density="comfortable"
      />

      <v-text-field
          v-model="telefono"
          label="Teléfono"
          :disabled="clientesStore.loading"
          clearable
          variant="outlined"
          density="comfortable"
      />

      <v-btn
          type="submit"
          :loading="clientesStore.loading"
          color="primary"
          class="mt-4"
          block
          variant="flat"
      >
        Crear Cliente
      </v-btn>
    </v-form>
     </v-card-text>
    </v-card>
  </v-dialog>


    <v-dialog v-model="dialogExito" max-width="400">
      <v-card>
        <v-card-title class="text-h6">✅ Cliente creado</v-card-title>
        <v-card-text>El cliente fue registrado exitosamente.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="dialogExito = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogError" max-width="400">
      <v-card>
        <v-card-title class="text-h6 text-error">Error</v-card-title>
        <v-card-text>{{ clientesStore.error }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialogError = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</v-container>
</template>

<style scoped>
</style>
