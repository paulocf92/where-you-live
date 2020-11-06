<template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="addresses"
      sort-by="zipCode"
      class="elevation-1"
      :no-data-text="$t('noDataLabel')"
    >
      <template v-slot:top>
        <v-toolbar flat dense>
          <v-toolbar-title>{{ $t('addressesLabel') }}</v-toolbar-title>
          <v-dialog v-model="dialog" max-width="1000px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('editAddressLabel') }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.zipCode"
                        :label="$t('zipCodeLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.street"
                        :label="$t('streetLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.number"
                        :label="$t('numberLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.complement"
                        :label="$t('complementLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.neighborhood"
                        :label="$t('neighborhoodLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.city"
                        :label="$t('cityLabel')"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="updatedAddress.state"
                        :label="$t('stateLabel')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  {{ $t('actionCancelLabel') }}
                </v-btn>
                <v-btn color="blue darken-1" text @click="update">
                  {{ $t('actionSaveLabel') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">{{
                $t('confirmAddressDeletionLabel')
              }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">{{
                  $t('noLabel')
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="deleteConfirm">
                  {{ $t('yesLabel') }}
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
  </client-only>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,

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
    headers() {
      const locale = this.$i18n.locale
      const t = this.$t.bind(this)

      return [
        {
          text: t('zipCodeLabel', locale),
          width: 110,
          value: 'zipCode',
        },
        { text: t('streetLabel', locale), value: 'street' },
        { text: t('numberLabelShort', locale), width: 80, value: 'number' },
        {
          text: t('complementLabelShort', locale),
          width: 150,
          value: 'complement',
        },
        { text: t('neighborhoodLabel', locale), value: 'neighborhood' },
        { text: t('cityLabel', locale), value: 'city' },
        { text: t('stateLabel', locale), width: 100, value: 'state' },
        {
          text: t('actionsLabel', locale),
          width: 80,
          value: 'actions',
          sortable: false,
        },
      ]
    },
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
