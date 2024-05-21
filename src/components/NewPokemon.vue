<template>
  <button @click="handleClick"> Random!</button>
  <div class="mainDiv" v-if="pokemon !== null">
    <h1 >{{ pokemon.id + " : " + pokemon.name}}</h1>
    <div>
      <img class="sprite" v-bind:src="pokemon.sprites.front_default" />  
      <p v-if="pokemon.types[1] == null"> {{ pokemon.types[0].type.name}}</p>
      <p v-else> Types : {{pokemon.types[0].type.name + " "+ pokemon.types[1].type.name}}</p>
    </div>
  </div>
  <h1 v-else> Loading Pokemon</h1>
</template>

<script setup>

import {getRandomPokemon} from "../utils.js";
import { ref, watchEffect } from 'vue'

const pokemon = ref(null)

async function handleClick(){
  pokemon.value = null
  const response = await getRandomPokemon()
  console.log(response) 
  pokemon.value = response
}

watchEffect(async () => {

  const response = await getRandomPokemon()
  console.log(response) 
  pokemon.value = response
})




</script>

<style>
.mainDiv{
  display: flex;
  flex-direction: row; 
	flex-wrap: wrap; 
}
.sprite{
  width:300px ;
  height:300px ;
}

</style>