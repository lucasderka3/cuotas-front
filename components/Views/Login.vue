<script setup lang="ts">

import {useAuthStore} from "~/store/authStore";

const authStore = useAuthStore();


const email = ref('');
const password = ref('');

const formularioLogin = async () => {
  await authStore.login(email.value, password.value);
  return navigateTo('/inicio/dashboard');
}
</script>

<template>
  <v-container
      fluid
      class="d-flex align-center justify-center fill-height bg-login"
  >
    <v-card
        rounded="xl"
        elevation="10"
        min-width="500"
        max-width="500"
        class="pa-6 text-center"
    >

      <v-card-title class="text-h5 font-weight-bold mb-2">
        Bienvenido 👋
      </v-card-title>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Ingresa tus credenciales para continuar
      </p>

      <!-- Formulario -->
      <v-form @submit.prevent="formularioLogin" class="d-flex flex-column ga-4">
        <v-text-field
            v-model="email"
            type="email"
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            clearable
            density="comfortable"
            hide-details
        />

        <v-text-field
            v-model="password"
            type="password"
            label="Contraseña"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            density="comfortable"
            hide-details
        />

        <v-btn
            type="submit"
            block
            rounded="lg"
            color="primary"
            size="large"
            class="mt-2"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}


</style>