<template>
  <h1>{{ title }}</h1>
  <NewPokemonVue/>
</template>


<script>
import NewPokemonVue from "./components/NewPokemon.vue"
export default{
  name: "app",
  components: {NewPokemonVue},
  data(){
    return{
      title: "New Pokemon! "
    }
  },
}
</script>


<style>

body{
 display: inline-block;
 background: rgb(31, 144, 148);
}
</style>
