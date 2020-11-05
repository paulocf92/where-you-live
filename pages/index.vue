<template>
  <v-container>
    <v-row>
      <v-col cols="3"> <AddressFinder /> </v-col>
      <v-col cols="9">
        <AddressTable />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddressFinder from '../components/AddressFinder.vue'
import AddressTable from '../components/AddressTable.vue'

export default {
  components: {
    AddressFinder,
    AddressTable,
  },
}
</script>

<style scoped>
.container {
  display: flex;
  padding: 10px 20px;
  min-height: 100vh;
  background-color: #edf6f9;
}
</style>
