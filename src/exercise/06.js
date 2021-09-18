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
  const [pokemon, setPokemon] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    if (pokemonName) {
      // 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null
      setPokemon(null)
      setStatus('pending')

      fetchPokemon(pokemonName)
        .then(p => {
          setPokemon(p)
          setStatus('resolved')
        })
        .catch(e => {
          setError(e)
          setStatus('rejected')
        })
    }
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a pokemon'
  }

  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  }

  if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  }

  if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
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
