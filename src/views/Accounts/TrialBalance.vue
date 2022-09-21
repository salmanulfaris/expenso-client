<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        Accounts
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" to="/create-jv">
          <v-icon small>mdi-plus</v-icon>
          Create JV
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>

        <v-simple-table>
          <thead>
          <tr>
            <th>Account</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
            <tr :class="(line.sum < 0?'red lighten-3 ':'green lighten-3 ')" v-for="(line,i) in lines" :key="i">
              <td>{{line.account.account_name}}</td>
              <td>{{line.sum}}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "TrialBalance",
  data:()=>({
    lines:[]
  }),
  methods: {
    getAllEntries() {
      window.axios.get('/trial_balance').then((res) => {
        this.lines = res.data;
      })
    },
  },
  created() {
    this.getAllEntries()
  }
}
</script>

<style scoped>

</style>
