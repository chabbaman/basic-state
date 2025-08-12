import { createPlayerStore } from "@rbxts/lyra";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { type PlayerData } from "shared/producers/players_producer";
import { RootProducer } from "../store/root_producer";
import { getAvailablePlot } from "./utils/plot_utils";

export const store = createPlayerStore<PlayerData>({
	name: "TEST-1",
	template: {
		cash: 0,
	},
	schema: t.strictInterface({
		cash: t.number,
		lastJoined: t.optional(t.number),
	}),

	changedCallbacks: [
		(key, newData, oldData) => {
			RootProducer.setPlayerData(tonumber(key), newData);
		},
	],
});

Players.PlayerAdded.Connect((player) => {
	store.loadAsync(player);

	const data = store.getAsync(player);

	RootProducer.setPlayer(player.UserId, {
		userId: player.UserId,
	});
	RootProducer.setPlayerData(player.UserId, {
		...data,
		lastJoined: os.time(),
	});
	RootProducer.setPlayerPlot(player.UserId, getAvailablePlot()[0]);
});

Players.PlayerRemoving.Connect((player) => {
	store.unloadAsync(player);
	RootProducer.deletePlayer(player.UserId);
});

game.BindToClose(() => {
	store.closeAsync();
});
