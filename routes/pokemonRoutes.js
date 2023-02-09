import express from "express"
import { nanoid } from "nanoid"

const router = express.Router()

export default function pokeRouter(db) {
    router.get("/", (request, response) => {
        response.status(200).json({
            success: true,
            pokemon: db.data.pokemon
        })

    })

    router.get("/:id", (request, response) => {
        const pokemon_id = request.params.id

        const pokemon_found = db.data.pokemon.find(pokemon => pokemon.id === pokemon_id)
        response.status(200).json({
            success: true,
            pokemon: pokemon_found
        })

    })



    router.post("/", (request, response) => {
        db.data.pokemon.push({
            name: request.body.pokemon,
            id: nanoid(5),
        });

        db.write();
        response.status(200).json({
            success: true,
            pokemon: request.body.pokemon
        });
    });

    router.delete("/:id", (request, response) => {
        const pokemon = db.data.pokemon

        const pokemon_id = request.params.id

        const pokemon_deleted = pokemon.find(pokemon => pokemon.id = pokemon_id)

        const filteredPoke = pokemon.filter(pokemon => pokemon.id !== pokemon_id)

        db.data.pokemon = filteredPoke

        db.write();

        response.status(200).json({
            success: true,
            pokemon_deleted: pokemon_deleted
        });
    });

    router.put("/:id", (request, response) => {
        const pokemon = db.data.pokemon
        const pokemon_id = request.params.id
        const pokemon_name = request.body.pokemon
        console.log(pokemon_id, pokemon_name)

        const pokemon_updated = pokemon.map(pokemon => {
            if (pokemon.id === pokemon_id) {
                return { name: pokemon_name, id: pokemon.id }
            } else {
                return pokemon
            }
        })

        db.data.pokemon = pokemon_updated

        db.write()


        response.status(200).json({
            success: true,
        })


    })
    return router
}

