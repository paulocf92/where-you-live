<template>
  <v-app-bar app dense color="#006d77" class="pl-4 pr-4">
    <v-switch
      v-model="$vuetify.theme.dark"
      flat
      inset
      dense
      hide-details
      color="white"
      title="Clique para trocar o tema"
      append-icon="mdi-white-balance-sunny"
    />
    <v-btn
      class="ml-2"
      icon
      title="Clique para trocar o idioma"
      @click="toggleLang"
    >
      <country-flag :country="langIcon" />
    </v-btn>
    <div class="title">
      <v-icon size="35" color="#fcfcfc">mdi-home-search-outline</v-icon> Where
      You Live
    </div>
  </v-app-bar>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  components: {
    CountryFlag,
  },
  computed: {
    langIcon() {
      return this.$i18n.locale === 'ptbr' ? 'br' : 'us'
    },
  },
  methods: {
    toggleLang() {
      this.$i18n.locale = this.$i18n.locale === 'ptbr' ? 'en' : 'ptbr'
    },
  },
}
</script>

<style>
.title {
  display: flex;
  align-items: baseline;
  margin: 0 auto;
  /* padding-right: 150px; */
  color: #fcfcfc;
}

.title i {
  padding-right: 5px;
}

.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0;
}

.v-application--is-ltr .v-input__append-outer {
  margin-left: 0;
}
</style>
