import { useEffect, useState } from "react";

function App() {
  const [pokemons, setPokemons] = useState([])
  useEffect(() => {
    async function  load() { //비동기 처리(응답 대기)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      const data = await response.json()
      setPokemons(data.results)
    }
    load()
  }, [])
  console.log(pokemons)
  return (
    <ul className="p-6">
      {pokemons.map((pokemon) => (
        <li key = {pokemon.name} className="capitalize">
          {pokemon.name}
        </li>
      ))}
    </ul>
  )
}
export default App