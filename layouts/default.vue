<template>
  <v-app dark>
    <!-- <NavigationDrawer /> -->

    <AppBar />

    <v-main>
      <v-container fill-height fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';

export default {
  components: {
    AppBar
  }
};
</script>
