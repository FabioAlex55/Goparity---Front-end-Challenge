<template>
    <h1>{{ pokemon.name }}</h1>
</template>

<script setup>

import {getRandomPokemon} from "../utils.js";
import { ref, watchEffect } from 'vue'

const pokemon = ref({name:""})

watchEffect(async () => {

  const a = await getRandomPokemon()
  console.log(a) 
  pokemon.value = a
})



// const {name , id , stats , types } = getRandomPokemon()

</script>

<style>
</style>