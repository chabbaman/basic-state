import { createBroadcaster } from "@rbxts/reflex";
import { dispatch, start } from "./network";
import { SharedSlices, SharedState } from "shared/shared_producer";
import { PlayerState } from "shared/producers/players_producer";
import { RootProducer } from "./store/root_producer";

const broadcaster = createBroadcaster({
	producers: SharedSlices,
	dispatch: (requestingPlayer, actionBatch) => {
		dispatch.Fire(requestingPlayer, actionBatch);
	},
	beforeHydrate: (requestingPlayer, state) => {
		const sharedState = state as SharedState;
		const playersByUserId = sharedState.players.players;
		const requestingPlayerState = playersByUserId.get(requestingPlayer.UserId);

		const filteredPlayersByUserId = new Map<number, PlayerState>();
		if (requestingPlayerState !== undefined) {
			filteredPlayersByUserId.set(requestingPlayer.UserId, requestingPlayerState);
		}

		return {
			...sharedState,
			players: {
				...sharedState.players,
				players: filteredPlayersByUserId,
			},
		};
	},
});

start.On((player) => {
	broadcaster.start(player);
});

RootProducer.applyMiddleware(broadcaster.middleware);
