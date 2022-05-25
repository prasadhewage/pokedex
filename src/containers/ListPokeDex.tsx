import React, { useEffect, useState } from 'react'
import { PokedexCard, Loader } from '../components'
import httpServices from '../services/http'
import { API_POKEMON } from '../config/appConfig'

const resultLimit = 20

export default function ListPokeDex() {
    const [pokemonsList, setPokemonsList]: any[] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        setIsLoading(true)
        loadPokemons()
    }, [])

    /**
     * Load list of pokedex
     */
    const loadPokemons = async () => {
        setIsLoading(true)
        const { count, results } = await httpServices.get({
            url: `${API_POKEMON}?offset=${
                resultLimit * offset
            }&limit=${resultLimit}`,
        })

        setIsLoading(false)
        setPokemonsList([...pokemonsList, ...results])
        setOffset(offset + 1)
        setCount(count)
    }

    return (
        <>
            <div className="container">
                <div className="pokedex-list-wrapper">
                    {pokemonsList.length
                        ? pokemonsList.map((pokemon: any, key: string) => {
                              return (
                                  <PokedexCard
                                      key={key}
                                      data={pokemon}
                                      id={key + 1}
                                  />
                              )
                          })
                        : null}
                </div>
                {isLoading ? (
                    <Loader />
                ) : count != pokemonsList.length ? (
                    <button
                        className="load-pokedex-btn"
                        onClick={() => loadPokemons()}
                    >
                        Load more Pokemons
                    </button>
                ) : null}
            </div>
        </>
    )
}
