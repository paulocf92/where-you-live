<template>
  <div class="address-finder">
    <form class="add-address-form" @submit.prevent="storeAddress">
      <v-row
        ><v-col class="pa-0 pb-2 pl-3" cols="12" align="start"
          >Informe um CEP para buscar:
        </v-col></v-row
      >
      <v-row>
        <v-col class="pa-0 pl-3" cols="8">
          <v-text-field
            ref="zipSearch"
            v-model="address.zipCode"
            v-mask="'##.###-###'"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="CEP"
            placeholder="CEP"
            background-color="rgba(255,255,255,0.85)"
            autofocus
            required
            :disabled="loading"
            :loading="loading"
            @keypress.enter="fetchAddress"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pt-3 pl-3" cols="10">
          <v-text-field
            ref="streetRef"
            v-model="address.street"
            maxlength="50"
            dense
            outlined
            color="#63AFAD"
            label="Logradouro"
            placeholder="Logradouro"
            background-color="rgba(255,255,255,0.85)"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.numberRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-text-field
            ref="numberRef"
            v-model="address.number"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="Número"
            placeholder="Número"
            background-color="rgba(255,255,255,0.85)"
            required
            @keypress.enter.prevent="$refs.complementRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-text-field
            ref="complementRef"
            v-model="address.complement"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="Complemento"
            placeholder="Complemento"
            background-color="rgba(255,255,255,0.85)"
            @keypress.enter="checkNextFocus"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-text-field
            ref="neighborhoodRef"
            v-model="address.neighborhood"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="Bairro"
            placeholder="Bairro"
            background-color="rgba(255,255,255,0.85)"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.cityRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-text-field
            ref="cityRef"
            v-model="address.city"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="Cidade"
            placeholder="Cidade"
            background-color="rgba(255,255,255,0.85)"
            required
            :disabled="disableFields"
            @keypress.enter.prevent="$refs.stateRef.focus()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-text-field
            ref="stateRef"
            v-model="address.state"
            maxlength="25"
            dense
            outlined
            color="#63AFAD"
            label="Estado"
            placeholder="Estado"
            background-color="rgba(255,255,255,0.85)"
            required
            :disabled="disableFields"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pa-0 pl-3" cols="10">
          <v-btn
            ref="submitRef"
            type="submit"
            block
            depressed
            color="#E69E84"
            :ripple="{
              class: 'white--text',
            }"
            >Incluir Endereço</v-btn
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
  },
  methods: {
    ...mapActions(['addAddress']),
    storeAddress() {
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
        alert('Endereço já está cadastrado!')
      }
    },
    checkNextFocus(e) {
      if (!this.disableFields) {
        e.preventDefault()
        this.$refs.neighborhoodRef.focus()
      }
    },
    async fetchAddress(e) {
      // Validate ZIP on enter
      if (this.address.zipCode.length < 10) return

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
      } catch (err) {
        alert('Não foi possível localizar o CEP informado!')
      }

      this.loading = !this.loading
      setTimeout(() =>
        formattedZip.endsWith('000')
          ? this.$refs.streetRef.focus()
          : this.$refs.numberRef.focus()
      )
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
