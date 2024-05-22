<template>
  <button class="random" @click="handleClick"> Random!</button>
  <div class="mainDiv" v-if="pokemon !== null">
    <h1 class="name" >{{ pokemon.id + " : " + pokemon.name}}</h1>
    <div class="pokemonInfo">
      <img class="sprite" v-bind:src="pokemon.sprites.front_default" />
      <p class="types" v-for="pokemonType in pokemon.types" :key="pokemonType.id" :style="{color: getBestContrastColor(typeColorMap[pokemonType.type.name], '#ffffff', '#000000'),
           background: typeColorMap[pokemonType.type.name]}"> {{ pokemonType.type.name}} </p>
           <div class="infoTable">
      <p class="stats" v-for="pokemonStats in pokemon.stats" :key="pokemonStats" > {{ pokemonStats.stat.name + ":" + pokemonStats.base_stat }}</p>
      </div>  
    </div>
  </div>
  <h1 v-else> Loading Pokemon</h1>
</template>

<script setup>

import {getRandomPokemon,typeColorMap,getTypesGradient,getBestContrastColor} from "../utils.js";
import { ref, watchEffect, computed } from 'vue'



const pokemon = ref(null)

async function handleClick(){
  pokemon.value = null
  const response = await getRandomPokemon()
  pokemon.value = response
}

watchEffect(async () => {

  const response = await getRandomPokemon()
  pokemon.value = response
})


const background = computed(()=>{
  return pokemon.value?.types.length > 1 ? getTypesGradient(pokemon.value?.types[0].type.name, pokemon.value?.types[1].type.name) : typeColorMap[pokemon.value?.types[0].type.name];
})



</script>


<style>
.name{
  text-transform: capitalize;

}
.infoTable{
  flex-wrap: wrap;
  flex-basis:50%;
}
.stats{
  text-transform: capitalize;
  border: 5px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;

  
  
}
.pokemonInfo{
  align-items: flex-start;
  display: flex;
}
.random{
  background-color: #F082AC;
  border-radius: 8px;
  border-style: none;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  height: 40px;
  line-height: 20px;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
}

.types{
  text-transform: capitalize;
  border: 5px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  padding: 6px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: 100px;
}

.mainDiv{
  
  margin-top: 15px;
  background: v-bind('background');
  display: flex;
  justify-content: center;
  flex-direction: column; 
}
.sprite{
  width:300px;
  height:300px ;
}

</style>