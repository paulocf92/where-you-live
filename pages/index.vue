<template>
  <div class="main custom-main-background">
    <v-row no-gutters>
      <v-col lg="3" md="4" xs="12" sm="12" class="pb-4">
        <AddressFinder />
      </v-col>
      <v-col lg="9" md="8">
        <AddressTable />
      </v-col>
    </v-row>
  </div>
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
.main {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 30px 0;
  min-height: calc(100vh - 48px);
  /* background-color: #edf6f9; */
}
</style>
