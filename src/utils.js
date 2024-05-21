import axios  from "axios";


function getRandomInt(max) {
  return Math.ceil(Math.random() * max);
}

export async function getRandomPokemon(){
  const pokemonCount = await axios.get("https://pokeapi.co/api/v2/pokemon-species?limit=1").then(
    response => response.data.count
  )
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${getRandomInt(pokemonCount)}`).then(
        response =>  response.data 
     )
  }
  
    
  export const typeColorMap = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  }

  export const getTypesGradient = (type1, type2)=>{
    return `linear-gradient(90deg, ${typeColorMap[type1]} 0%, ${typeColorMap[type2]} 100%)`
}


//Color manipulation from materialUI to get contrast color

function hexToRgb(color) {
  color = color.slice(1)
  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g')
  let colors = color.match(re)
  if (colors && colors[0].length === 1) {
    colors = colors.map(n => n + n)
  }
  return colors ? `rgb${colors.length === 4 ? 'a' : ''}(${colors.map((n, index) => {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000
  }).join(', ')})` : ''
}
function hslToRgb(color) {
  color = decomposeColor(color)
  const {
    values
  } = color
  const h = values[0]
  const s = values[1] / 100
  const l = values[2] / 100
  const a = s * Math.min(l, 1 - l)
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  let type = 'rgb'
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
  if (color.type === 'hsla') {
    type += 'a'
    rgb.push(values[3])
  }
  return recomposeColor({
    type,
    values: rgb
  })
}
function recomposeColor(color) {
  const {
    type,
    colorSpace
  } = color
  let {
    values
  } = color
  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n, i) => i < 3 ? parseInt(n, 10) : n)
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`
    values[2] = `${values[2]}%`
  }
  if (type.indexOf('color') !== -1) {
    values = `${colorSpace} ${values.join(' ')}`
  } else {
    values = `${values.join(', ')}`
  }
  return `${type}(${values})`
}

function decomposeColor(color) {
  // Idempotent
  if (color.type) {
    return color
  }
  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color))
  }
  const marker = color.indexOf('(')
  const type = color.substring(0, marker)
  let values = color.substring(marker + 1, color.length - 1)
  let colorSpace
  if (type === 'color') {
    values = values.split(' ')
    colorSpace = values.shift()
    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1)
    }
  } else {
    values = values.split(',')
  }
  values = values.map(value => parseFloat(value))
  return {
    type,
    values,
    colorSpace
  }
}

function getLuminance(color) {
  color = decomposeColor(color)
  let rgb = color.type === 'hsl' || color.type === 'hsla' ? decomposeColor(hslToRgb(color)).values : color.values
  rgb = rgb.map(val => {
    if (color.type !== 'color') {
      val /= 255 // normalized
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4
  })

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3))
}

function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)
}
export const getBestContrastColor = (
  bgColor,
  firstOption,
  secondOption,
) =>
  getContrastRatio(firstOption, bgColor) >
  getContrastRatio(secondOption, bgColor)
    ? firstOption
    : secondOption

