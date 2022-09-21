<template>
  <v-app>
    <v-app-bar
        elevation="0"
        app
        color="secondary"
        outlined
    >
      <div class="d-flex align-center">
        <router-link to="/" class="text-decoration-none white--text">
          EXPENSO
        </router-link>
      </div>

      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>

    </v-app-bar>

    <v-main >
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
