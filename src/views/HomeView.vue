<template>
  <v-container>
    <v-row justify="center">
      <v-card class="my-3 px-4" elevation="0" >
        <v-img
            gradient="to top right, rgba(100,115,201,.90), rgba(25,32,72,.90)"
            src="/img/accounting.jpg" height="200">
          <div class="white--text text-center mt-12">
            <h1 class="font-weight-medium">EXPENSO</h1>
            <p>STORE YOUR EXPENSES IN JOURNAL VOUCHER</p>
          </div>

        </v-img>
      </v-card>
    </v-row>
    <v-row >
      <v-col cols="12" lg="4" xl="2" sm="6" md="6" v-for="(link,i) in links" :key="i">
        <v-card dark rounded outlined :to="link.to" :color="link.color">
          <v-card-title>
            {{ link.text }}
            <v-spacer></v-spacer>
            <v-icon class="mr-2">{{ link.icon }}</v-icon>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>


export default {
  name: 'Home',
  data: () => ({
    links: [
      {
        to: '/accounts',
        icon: 'mdi-account-plus',
        text: 'Accounts',
        color: 'info lighten-2'
      },
      {
        to: '/create-jv',
        icon: 'mdi-book-open',
        text: 'Add Journal Entry',
        color: 'success lighten-2'
      },
      {
        to: '/index-jv',
        icon: 'mdi-book-open',
        text: 'Journal Entry',
        color: 'secondary lighten-2'
      },
      {
        to: '/index-tb',
        icon: 'mdi-book-open',
        text: 'Trial Balance',
        color: 'primary lighten-2'
      },

      {
        to: '/account-statement',
        icon: 'mdi-book-open',
        text: 'Account Statement',
        color: 'primary lighten-2'
      }
    ]
  })

}
</script>
