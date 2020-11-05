<template>
  <v-data-table
    :headers="headers"
    :items="addresses"
    sort-by="zipCode"
    class="elevation-1"
    no-data-text="Sem dados"
  >
    <template v-slot:top>
      <v-toolbar flat dense>
        <v-toolbar-title>Endereços</v-toolbar-title>
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Endereço</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.zipCode"
                      label="CEP"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.street"
                      label="Logradouro"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.number"
                      label="Número"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.complement"
                      label="Complemento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.neighborhood"
                      label="Bairro"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.city"
                      label="Cidade"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="updatedAddress.state"
                      label="Estado"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="update"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Confirma a exclusão deste endereço?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Não</v-btn>
              <v-btn color="blue darken-1" text @click="deleteConfirm">
                Sim
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="updateItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'CEP',
        width: 110,
        value: 'zipCode',
      },
      { text: 'Logradouro', value: 'street' },
      { text: 'Nº', width: 80, value: 'number' },
      { text: 'Compl.', width: 100, value: 'complement' },
      { text: 'Bairro', value: 'neighborhood' },
      { text: 'Cidade', value: 'city' },
      { text: 'Estado', width: 100, value: 'state' },
      { text: 'Ações', width: 80, value: 'actions', sortable: false },
    ],
    updatedIndex: -1,
    updatedAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    defaultAddress: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  }),

  computed: {
    ...mapState(['addresses']),
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  beforeCreate() {
    if (process.browser) {
      this.$store.dispatch('initializeStore')
    }
  },

  methods: {
    ...mapActions(['updateAddress', 'deleteAddress', 'initializeStore']),
    updateItem(address) {
      this.updatedIndex = this.addresses.indexOf(address)
      this.updatedAddress = Object.assign({}, address)
      this.dialog = true
    },

    update() {
      this.updateAddress({
        id: this.updatedIndex,
        address: this.updatedAddress,
      })

      this.close()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.updatedAddress = Object.assign({}, this.defaultAddress)
        this.updatedIndex = -1
      })
    },

    deleteItem(address) {
      this.updatedIndex = this.addresses.indexOf(address)
      this.dialogDelete = true
    },

    deleteConfirm() {
      this.deleteAddress({
        id: this.updatedIndex,
      })

      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.updatedIndex = -1
      })
    },
  },
}
</script>
