import { combineProducers, InferState } from "@rbxts/reflex";
import { SharedSlices } from "shared/shared_producer";

export type RootProducer = typeof RootProducer;

export type RootState = InferState<RootProducer>;

export const RootProducer = combineProducers({
	...SharedSlices,
});
