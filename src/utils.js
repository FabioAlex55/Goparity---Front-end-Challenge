import axios  from "axios";


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  export async function getRandomPokemon(){

    return await axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(1025)}`).then(
          function(response){
            const a = response.data
            console.log(a)
              return  a 
            }
        )
        
    }
    
    
    