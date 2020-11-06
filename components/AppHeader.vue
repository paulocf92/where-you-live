<template>
  <v-app-bar app dense color="#006d77" class="pl-4 pr-4">
    <v-switch
      v-model="$vuetify.theme.dark"
      flat
      inset
      dense
      hide-details
      color="white"
      append-icon="mdi-white-balance-sunny"
    />
    <div class="title">
      <v-icon size="35" color="#fcfcfc">mdi-home-search-outline</v-icon> Where
      You Live
    </div>
  </v-app-bar>
</template>

<script>
export default {}
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
</style>
