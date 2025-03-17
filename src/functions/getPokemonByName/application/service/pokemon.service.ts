import * as provider from "../repositories/pokemon.provider";

export async function getPokemonByName(name: string) {
	// do other business logic stuff here...

	return await provider.getPokemonByName(name);
}
