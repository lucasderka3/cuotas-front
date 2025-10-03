<script setup lang="ts">

import {useAuthStore} from "~/store/authStore";
import {required, email as emailValidator} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const alertMessage = ref('');
const dialogError = ref(false);

const rules = {
  email: {required, email: emailValidator},
  password: {required},
}

const formData = { email, password };
const v$ = useVuelidate(rules, formData);

const formularioLogin = async () => {
  try {
    const esValido = await v$.value.$validate()
    if(!esValido) return;
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 1200));
    await authStore.login(email.value, password.value);
    return navigateTo('/inicio/dashboard');
  }catch(error) {
    alertMessage.value = 'Email or password is wrong';
    dialogError.value = true;
  } finally {
    loading.value = false;
  }
}

</script>

<template>
  <v-container
      fluid
      class="d-flex align-center justify-center fill-height bg-login"
  >
    <v-card
        rounded="xl"
        elevation="12"
        min-width="420"
        max-width="480"
        class="pa-8 text-center login-card"
    >
      <!-- Encabezado -->
      <v-card-title class="text-h4 font-weight-bold mb-2">
        Bienvenido 👋
      </v-card-title>
      <p class="text-body-1 text-medium-emphasis mb-8">
        Ingresa tus credenciales para continuar
      </p>

      <!-- Formulario -->
      <v-form @submit.prevent="formularioLogin" class="d-flex flex-column ga-5">
        <v-text-field
            v-model="email"
            type="email"
            label="Email"
            :error-messages="v$.email.$errors.map(e => e.$message)"
            variant="outlined"
            prepend-inner-icon="mdi-email"
            clearable
            density="comfortable"
            hide-details="auto"
        />

        <v-text-field
            v-model="password"
            type="password"
            label="Contraseña"
            :error-messages="v$.password.$errors.map(e => e.$message)"
            variant="outlined"
            prepend-inner-icon="mdi-lock"
            density="comfortable"
            hide-details="auto"
        />

        <v-btn
            type="submit"
            block
            rounded="lg"
            color="primary"
            size="large"
            class="mt-4 login-btn"
            :loading="loading"
        >
          Iniciar Sesión
        </v-btn>
      </v-form>
    </v-card>

    <!-- Snackbar de error -->
    <v-snackbar v-model="dialogError" timeout="2500" color="red-darken-2">
      {{ alertMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}


.login-card {
  min-height: 520px; /* más altura para que respire */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-btn {
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.2s ease-in-out;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
