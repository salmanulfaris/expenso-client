<template>
  <v-container>
    <v-card elevation="1">
      <v-card-title>
        JV
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" @click="newAccountModal=true">
          <v-icon small>mdi-plus</v-icon>
          JV Index
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-simple-table>
          <thead>
          <tr>
            <th>Account Name</th>
            <th>Account Code</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(account,i) in allAccounts" :key="i">
            <td>{{ account.account_name }}</td>
            <td>{{ account.account_code }}</td>
            <td>
              <v-menu
                  offset-y
                  transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list dense>
                  <v-list-item @click="deleteAccount(account.id)">
                    <v-list-item-icon>
                      <v-icon dense>mdi-delete</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title color="red">Delete</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>


            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>

    </v-card>
    <v-dialog v-model="newAccountModal" max-width="580">
      <v-card>
        <v-card-title>
          New Account
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          <v-text-field v-model="new_account.account_code" :error-messages="form_errors.account_code"
                        label="Account Code"
                        outlined></v-text-field>
          <v-text-field v-model="new_account.account_name" :error-messages="form_errors.account_name"
                        label="Account Name"
                        outlined></v-text-field>
          <div class="text-end">
            <v-btn class="mr-2" large @click="newAccountModal=false" depressed outlined>
              Cancel
            </v-btn>
            <v-btn large @click="saveNewAccount()" depressed color="primary" :loading="account_button_loading">
              <v-icon>mdi-check</v-icon>
              Save
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

</template>
<script>

export default {
  data: () => ({
    newAccountModal: false,
    allAccounts: [],
    new_account: {},
    form_errors: {},
    account_button_loading: false,
  }),
  methods: {
    getAllAccountsGroups() {
      window.axios.get('/account').then((res) => {
        this.allAccounts = res.data;
      })
    },
    deleteAccount(id) {
      if (!confirm("Are you sure delete account ?")) return;
      window.axios.delete('/account/' + id).then(() => {
        this.getAllAccountsGroups();
      })
    },
    saveNewAccount() {
      this.account_button_loading = true;
      window.axios.post('/account', this.new_account).then(() => {
        this.newAccountModal = false;
        this.new_account = {};
        this.getAllAccountsGroups();
        this.account_button_loading = false;
        this.form_errors = {};

      }).catch((err) => {
        this.account_button_loading = false;
        this.form_errors = err.response.data.errors
      })
    }
  },
  created() {
    this.getAllAccountsGroups();
  }
}
</script>
