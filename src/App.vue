<template>
  <h1>{{ title }}</h1>
  <button @click="handleClick"> Random!</button>
  <NewPokemonVue/>
</template>


<script>
import NewPokemonVue from "./components/NewPokemon.vue"
export default{
  name: "app",
  components: {NewPokemonVue},
  data(){
    return{
      title: "Womp womp "
    }
  },
  methods: {
    handleClick(){

    }
  }
}
</script>


<style>

body{
 display: inline-block;
 background: orange;
}
</style>
