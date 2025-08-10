import { combineProducers, InferState } from "@rbxts/reflex";
import { players_slice } from "./producers/players_producer";

export type SharedProducer = typeof SharedProducer;

export type SharedState = InferState<SharedProducer>;

export const SharedSlices = {
	players: players_slice,
};

export const SharedProducer = combineProducers(SharedSlices);
