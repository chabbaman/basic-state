import { BroadcastAction, createBroadcastReceiver } from "@rbxts/reflex";
import { dispatch, start } from "./network";
import { RootProducer } from "./store/root_producer";

const receiver = createBroadcastReceiver({
	start: () => {
		start.Fire();
	},
});

dispatch.On((actions) => {
	receiver.dispatch(actions as BroadcastAction[]);
});

RootProducer.applyMiddleware(receiver.middleware);
