<template>
  <div class="address-finder">
    <form class="add-address-form" @submit.prevent="storeAddress">
      <v-row
        ><v-col class="pa-0 pb-2 pl-3" cols="12" align="start"
          >{{ $t('zipFinderLabel') }}:
        </v-col></v-row
      >
      <v-row>
        <v-col class="pa-0 pl-3" cols="8">
          <v-text-field
            ref="zipSearch"
            v-model="address.zipCode"
            v-mask="'##.###-###'"
            minlength="10"
            dense
            outlined
            color="#63AFAD"
            :label="$t('zipCodeLabel')"
            :placeholder="$t('zipCodeLabel')"
            :background-color="fieldBackground"
            autofocus
            required
            :disabled="loading"
            :loading="loading"
            @keypress.enter="fetchAddress"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pt-3 pl-3" cols="11">
          <v-text-field
            ref="streetRef"
            v-model="address.street"
            maxlength="50"
            dense
            outlined
            color="#63AFAD"
            :label="$t('streetLabel')"
            :placeholder="$t('streetLabel')"
            :background-color="fieldBackground"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.numberRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-text-field
            ref="numberRef"
            v-model="address.number"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            :label="$t('numberLabel')"
            :placeholder="$t('numberLabel')"
            :background-color="fieldBackground"
            required
            @keypress.enter.prevent="$refs.complementRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-text-field
            ref="complementRef"
            v-model="address.complement"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            :label="$t('complementLabel')"
            :placeholder="$t('complementLabel')"
            :background-color="fieldBackground"
            @keypress.enter="checkNextFocus"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-text-field
            ref="neighborhoodRef"
            v-model="address.neighborhood"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            :label="$t('neighborhoodLabel')"
            :placeholder="$t('neighborhoodLabel')"
            :background-color="fieldBackground"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.cityRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-text-field
            ref="cityRef"
            v-model="address.city"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            :label="$t('cityLabel')"
            :placeholder="$t('cityLabel')"
            :background-color="fieldBackground"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.stateRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-text-field
            ref="stateRef"
            v-model="address.state"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            :label="$t('stateLabel')"
            :placeholder="$t('stateLabel')"
            :background-color="fieldBackground"
            required
            :disabled="disableFields"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="11">
          <v-btn
            ref="submitRef"
            type="submit"
            block
            depressed
            :color="submitBtnBackground"
            :ripple="{
              class: 'white--text',
            }"
            >{{ $t('submitAddressLabel') }}</v-btn
          >
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      disableFields: true,
      address: {
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
      },
    }
  },
  computed: {
    ...mapState(['addresses']),
    fieldBackground() {
      return this.$vuetify.theme.themes[
        this.$vuetify.theme.dark ? 'dark' : 'light'
      ]['custom-field-background']
    },
    submitBtnBackground() {
      return this.$vuetify.theme.themes[
        this.$vuetify.theme.dark ? 'dark' : 'light'
      ]['custom-submit-btn-background']
    },
  },
  methods: {
    ...mapActions(['addAddress']),
    storeAddress() {
      // const locale = this.$i18n.locale
      // const t = this.$t.bind(this)
      const { address } = this

      // Prevent duplicates upon storing
      if (
        this.addresses.find(
          addr =>
            addr.zipCode === address.zipCode && addr.number === address.number
        ) === undefined
      ) {
        this.addAddress({ address })

        this.disableFields = true

        this.address = {
          zipCode: '',
          street: '',
          number: '',
          complement: '',
          neighborhood: '',
          city: '',
          state: '',
        }

        this.$refs.zipSearch.focus()
      } else {
        const locale = this.$i18n.locale
        const t = this.$t.bind(this)
        alert(t('duplicateAddressLabel', locale))
      }
    },
    checkNextFocus(e) {
      if (!this.disableFields) {
        e.preventDefault()
        this.$refs.neighborhoodRef.focus()
      }
    },
    async fetchAddress(e) {
      // Enforce required on ZIP Search
      if (!this.address.zipCode) return

      e.preventDefault()

      this.loading = !this.loading

      const { zipCode: formattedZip } = this.address
      const zipCode = formattedZip.replace(/\D/g, '')

      try {
        const { data } = await this.$axios.get(
          `http://localhost:3000/api/ws/${zipCode}/json/`
        )

        // Invalid ZIP
        if (data.erro) {
          throw new Error('Invalid ZIP')
        }

        this.address = {
          zipCode: formattedZip,
          street: data.logradouro,
          number: '',
          complement: data.complemento,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }

        this.disableFields = !formattedZip.endsWith('000')

        setTimeout(() =>
          formattedZip.endsWith('000')
            ? this.$refs.streetRef.focus()
            : this.$refs.numberRef.focus()
        )
      } catch (err) {
        const locale = this.$i18n.locale
        const t = this.$t.bind(this)
        alert(t('invalidZipCodeLabel', locale))
        setTimeout(() => this.$refs.zipSearch.focus())
      }

      this.loading = !this.loading
    },
  },
}
</script>

<style scoped>
.add-address-form {
  width: 300px;
}
.address-finder {
  display: flex;
  flex-direction: column;
  padding: 0;
}
</style>
