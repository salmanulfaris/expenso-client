<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        Account Statement
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" to="/create-jv">
          <v-icon small>mdi-plus</v-icon>
          Create JV
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-autocomplete label="Account"
                        placeholder="Account"
                        outlined dense
                        :items="allAccounts"
                        @change="getAllEntries()"
                        item-text="account_name"
                        item-value="id"
                        v-model="account"/>
        <v-simple-table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
          </thead>
          <tbody>
          <tr :class="(line.amount < 0?'red lighten-3 ':'green lighten-3 ')" v-for="(line,i) in lines.result" :key="i">
            <td>{{ line.header.date }}</td>
            <td>{{ line.description }}</td>
            <td>{{ line.amount }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <th colspan="2">Total</th>
            <th>{{ lines.sum }}</th>
          </tr>
          </tfoot>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "AccountStatement",
  data: () => ({
    lines: [],
    account: '',
    allAccounts: []
  }),
  methods: {
    getAllAccountsGroups() {
      window.axios.get('/account').then((res) => {
        this.allAccounts = res.data;
      })
    },
    getAllEntries() {
      window.axios.post('/account-statement', {account: this.account}).then((res) => {
        this.lines = res.data;
      })
    },
  },
  created() {
    this.getAllAccountsGroups();
  }
}
</script>

<style scoped>

</style>
