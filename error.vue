<template>
  <v-container class="d-flex flex-column align-center justify-center text-center" style="height: 70vh;">
    <v-icon size="64" color="grey lighten-1">mdi-alert-circle-outline</v-icon>
    <h1 class="text-h4 mt-4">
      {{ error.statusCode === 404 ? 'Página no encontrada' : 'Oops, algo salió mal' }}
    </h1>
    <p class="text-subtitle-1 mt-2">
      {{ error.statusCode === 404 ? 'La página que buscas no existe.' : error.message }}
    </p>
    <v-btn color="primary" class="mt-4" @click="goHome">
      Volver al inicio
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter, useError } from '#imports'

const error = useError()
const router = useRouter()
const goHome = () => router.push('/login')
</script>

<style scoped>
h1 { font-weight: 600; }
p { color: #666; }
</style>