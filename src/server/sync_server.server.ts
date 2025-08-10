import { createBroadcaster } from "@rbxts/reflex";
import { dispatch, start } from "./network";
import { SharedSlices } from "shared/shared_producer";
import { RootProducer } from "./store/root_producer";

const broadcaster = createBroadcaster({
	producers: SharedSlices,
	dispatch: (player, actions) => {
		dispatch.Fire(player, actions);
	},
});

start.On((player) => {
	broadcaster.start(player);
});

RootProducer.applyMiddleware(broadcaster.middleware);
