import { createProducer } from "@rbxts/reflex";
import { produce } from "@rbxts/immut";
import { SharedState } from "shared/shared_producer";

export interface PlayerData {
	cash: number;
}

export interface PlayerState {
	data?: PlayerData;
	userId: number;
}

export interface PlayerSlice {
	players: Map<number, PlayerState>;
}

const initialState: PlayerSlice = {
	players: new Map(),
};

export function selectPlayerById(userId: number) {
	return (state: SharedState) => {
		return state.players.players.get(userId);
	};
}

export function selectPlayersById(state: SharedState) {
	return state.players.players;
}

export function getPlayerId(player: PlayerState) {
	return player.userId;
}

export const players_slice = createProducer(initialState, {
	setPlayer: (state, userId, playerState: PlayerState) => {
		return produce(state, (draft) => {
			draft.players.set(userId, playerState);
		});
	},
	setPlayerData: (state, userId, data: PlayerData) => {
		return produce(state, (draft) => {
			const playerState = draft.players.get(userId);
			if (playerState) {
				playerState.data = data;
			}
		});
	},
	deletePlayer: (state, userId) => {
		return produce(state, (draft) => {
			draft.players.delete(userId);
		});
	},
});
