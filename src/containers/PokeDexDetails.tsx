import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import httpServices from '../services/http'
import { API_POKEMON } from '../config/appConfig'
import { Loader, PokedexCard } from '../components'

export default function PokeDexDetails() {
    const [isLoading, setIsLoading] = useState(false)
    const [pokedex, setPokedexData] = useState(Object)
    let { slug } = useParams<{ slug: string }>()

    useEffect(() => {
        setIsLoading(true)
        loadPokedexData(slug!)
    }, [])

    /**
     * load pokedex data 
     * @param slug 
     * 
     */
    const loadPokedexData = async (slug: string) => {
        const data = await httpServices.get({
            url: `${API_POKEMON}/${slug}`,
        })

        setIsLoading(false)
        setPokedexData(data)
    }

    return (
        <div className="container">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="detail-wrapper">
                    <PokedexCard data={pokedex} id={pokedex.id} />
                </div>
            )}
        </div>
    )
}
