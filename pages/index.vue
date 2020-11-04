<template>
  <div class="container">
    <AddressFinder />
  </div>
</template>

<script>
import AddressFinder from '../components/AddressFinder.vue'

export default {
  components: {
    AddressFinder,
  },
}
</script>

<style>
.container {
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0 0 20px;
  min-height: 100vh;
  max-width: 1000px;
  display: flex;
  text-align: center;
  background-color: #edf6f9;
}
</style>
