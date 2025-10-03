<script setup lang="ts">
import NavigationAdmin from "~/components/Views/administracion/NavigationAdmin.vue";

const router = useRouter();
const loading = ref(false);

router.beforeEach(async () => {
  try {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 450));
  }catch(error) {
    console.log(error);
  }
})

router.afterEach(() => {
  loading.value = false;
})
</script>

<template>
  <v-app>
    <v-progress-linear
        v-show="loading"
        indeterminate
        color="primary"
        height="2.5"
        absolute
        top
    />
    <NavigationAdmin/>
    <v-main>
      <NuxtPage/>
    </v-main>

  </v-app>
</template>

<style scoped>

</style>