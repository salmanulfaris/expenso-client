<template>
  <v-container>
    <v-card>
      <v-card-title>New JV</v-card-title>
      <v-card-subtitle>Create New Journal Voucher</v-card-subtitle>
      <v-card-text>
        <v-dialog
            ref="dialog"
            v-model="date_modal"
            :return-value.sync="new_jv.date"
            persistent
            width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :error-messages="form_errors.date"
                v-model="new_jv.date"
                label="Date"
                outlined
                dense
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="new_jv.date"
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
                text
                color="primary"
                @click="date_modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
                text
                color="primary"
                @click="$refs.dialog.save(new_jv.date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
        <v-text-field v-model="new_jv.description" :error-messages="form_errors.description" prepend-icon="mdi-pencil"
                      outlined dense label="Description"></v-text-field>


        <p>LINE ITEMS</p>

        <v-row>
          <v-col cols="12" lg="4" xl="3" md="6" sm="12" xs="12" v-for="(lines,i) in new_jv.child" :key="i">
            <v-card outlined elevation="0">
              <v-card-text>
                <v-autocomplete label="Account" :error-messages="form_errors[('child.'+i+'.account_id')]" placeholder="Account" outlined dense :items="allAccounts"
                                item-text="account_name" item-value="id"
                                v-model="lines.account_id"/>
                <v-row>
                  <v-col cols="7">
                    <v-text-field type="number" :error-messages="form_errors[('child.'+i+'.amount')]"
                                  hide-spin-buttons outlined label="Amount" v-model="lines.amount" dense/>
                  </v-col>
                  <v-col cols="5">
                    <v-btn-toggle color="white" dense v-model="lines.dr_or_cr">
                      <v-btn :value="1" active-class="success">
                        Debit
                      </v-btn>

                      <v-btn :value="-1" active-class="error">
                        Credit
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
                <v-textarea rows="1"  class="mb-0" outlined label="Description" :error-messages="form_errors[('child.'+i+'.description')]" v-model="lines.description"


                            dense/>
                <v-row>
                  <v-col cols="4">
                    <v-btn v-if="new_jv.child.length>1" small @click="remove_line(i) " block depressed class="mt-2"
                           outlined color="error">
                      <v-icon small>mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="add_lines() " block depressed class="mt-2" color="grey">
              <v-icon small>mdi-plus</v-icon>
              Add More Items
            </v-btn>
          </v-col>
        </v-row>

        <v-btn v-if="line_total===0" @click="save_jv()" block large depressed class="mt-3" color="primary">
          <v-icon small>mdi-check</v-icon>
          Save
        </v-btn>
        <div class="mt-3 text-center" v-else>
          <p class="my-0 error--text text-capitalize">Correct the debit credit amount to save.</p>
          <v-btn block large depressed disabled>
            Total {{ line_total }}
          </v-btn>
        </div>


      </v-card-text>

    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "JvCreate",
  data: () => ({
    date_modal: false,
    allAccounts: [],
    form_errors: {
      description: '',
      date: '',
      child: []
    },
    new_jv: {
      description: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      child: [
        {
          amount: 0,
          description: '',
          dr_or_cr: 1,
          account_id: null,
        },
      ]
    }
  }),
  methods: {
    getAllAccountsGroups() {
      window.axios.get('/account').then((res) => {
        this.allAccounts = res.data;
      })
    },
    add_lines() {
      this.new_jv.child.push({
        amount: '',
        description: '',
        dr_or_cr: 1,
        account_id: null,
      })
    },
    remove_line(i) {
      this.new_jv.child.splice(i, 1);
    },
    save_jv() {
      window.axios.post('/jv', this.new_jv).then((res) => {
        console.log(res.data);
        this.$router.push('/index-tb')
      }).catch((err) => {
        this.form_errors = err.response.data.errors;
      })
    }

  },
  computed: {
    line_total() {
      let total_sum = 0;
      this.new_jv.child.forEach((item) => {
        total_sum += (item.dr_or_cr * parseFloat(item.amount))
      });
      return total_sum;
    }
  },
  created() {
    this.getAllAccountsGroups();
  }
}
</script>

<style scoped>

</style>
