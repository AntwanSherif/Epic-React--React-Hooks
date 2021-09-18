// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    pokemon: null,
    status: 'idle',
    error: null,
  })

  React.useEffect(() => {
    if (pokemonName) {
      // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
      setState(state => ({...state, pokemon: null, status: 'pending'}))

      fetchPokemon(pokemonName)
        .then(pokemon => {
          setState(state => ({...state, pokemon, status: 'resolved'}))
        })
        .catch(error => {
          setState(state => ({...state, error, status: 'rejected'}))
        })
    }
  }, [pokemonName])

  if (state.status === 'idle') {
    return 'Submit a pokemon'
  }

  if (state.status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (state.status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre>
      </div>
    )
  }

  if (state.status === 'resolved') {
    return <PokemonDataView pokemon={state.pokemon} />
  }

  return null
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
