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
      title: "Random Pokemon Generator! "
    }
  },
}
</script>


<style>
*{
box-sizing: border-box;
}

body{
  align-items: center;
  text-align: center;
  font-family:system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: rgb(46, 45, 45);
  color: white;
}
</style>
