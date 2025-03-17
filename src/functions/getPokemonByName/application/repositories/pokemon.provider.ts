import type { Pokemon } from "../../domain/PokemonModel";

export async function getPokemonByName(name: string): Promise<Pokemon> {
	const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Failed to fetch pokemon by name: ${name}`);
	}

	return await res.json();
}
