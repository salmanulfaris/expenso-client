<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" lg="4" xl="4" md="6" sm="12">
        <h1>Login</h1>
        <v-text-field outlined v-model="email" label="Email"></v-text-field>
        <v-text-field outlined v-model="password" label="Password"></v-text-field>
        <v-btn depressed large block @click="login">LOGIN</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    login() {
      window.axios.post('/user/login', {
        email: this.email,
        password: this.password
      }).then((res) => {
        localStorage.setItem('token', res.data.token);
      })
    }
  }
}
</script>
