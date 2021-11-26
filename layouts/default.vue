<template>
  <v-app dark>
    <AppBar />

    <v-main>
      <v-container fill-height fluid class="align-start">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    AppBar
  }
};
</script>
