<template>
  <div>
    <h1>Create Vehicle</h1>
    <form @submit.prevent="createVehicle">
      <label for="make">Make:</label>
      <input type="text" id="make" v-model="make" required>
      
      <label for="model">Model:</label>
      <input type="text" id="model" v-model="model" required>
      
      <label for="year">Year:</label>
      <input type="number" id="year" v-model="year" required>
      
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      make: '',
      model: '',
      year: null
    };
  },
  methods: {
    createVehicle() {
      // TODO: Implement the logic to create a new vehicle
      // You can use this.make, this.model, and this.year to access the form values
    }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
