import React from 'react'
import { Link } from 'react-router-dom'

export default function PokedexCard(props: any) {
    const {
        data: { name },
        id,
    } = props

    /**
     * generate id
     * @param id 
     * 
     * return {id}
     */
    const generateID = (id: number) => {
        if (id < 10) {
            return `00${id}`
        } else if (id < 100) {
            return `0${id}`
        } else {
            return id
        }
    }

    return (
        <Link className="pokedex-card" to={`/pokedex/${name}`}>
            <div className="card-image">
                <img
                    src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${generateID(
                        id
                    )}.png`}
                    alt="pokemon-pic"
                />
            </div>
            <div className="card-details">
                <span className="card-id">{`#${generateID(id)}`}</span>
                <h3 className="card-title">{name}</h3>
            </div>
        </Link>
    )
}
