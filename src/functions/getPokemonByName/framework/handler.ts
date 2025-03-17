import { createResponse } from "@dvsa/mes-microservice-common/application/api/create-response";
import { HttpStatus } from "@dvsa/mes-microservice-common/application/api/http-status";
import {
	bootstrapLogging,
	error,
	info,
} from "@dvsa/mes-microservice-common/application/utils/logger";
import { getPathParam } from "@dvsa/mes-microservice-common/framework/validation/event-validation";
import type { APIGatewayProxyEvent } from "aws-lambda";
import * as pokemonService from "../application/service/pokemon.service";

export async function handler(event: APIGatewayProxyEvent) {
	try {
		bootstrapLogging("get-pokemon-by-name", event);

		const pokemonName = getPathParam(event.pathParameters, "name");
		info(`get-pokemon-by-name ${pokemonName}`, pokemonName);

		if (!pokemonName) {
			error("Name is missing");
			return createResponse({ msg: "Name is missing" }, HttpStatus.NOT_FOUND);
		}

		const pokemon = await pokemonService.getPokemonByName(pokemonName);

		return createResponse(pokemon, HttpStatus.OK);
	} catch (err) {
		error("An error occured: ", JSON.stringify(err));
		return createResponse({ err }, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
