import { Janitor } from "@rbxts/janitor";
import { Players } from "@rbxts/services";
import { RootProducer } from "server/store/root_producer";
import { getPlayerId, selectPlayerCashById, selectPlayersById } from "shared/producers/players_producer";

RootProducer.observe(selectPlayersById, getPlayerId, (state) => {
	const janitor = new Janitor();
	const player = Players.GetPlayerByUserId(state.userId);

	const leaderstats = new Instance("Folder");
	leaderstats.Name = "leaderstats";
	leaderstats.Parent = player;

	const cash = new Instance("IntValue");
	cash.Name = "Cash";
	cash.Parent = leaderstats;

	const updateCash = (value?: number) => {
		cash.Value = value ?? 0;
	};

	janitor.Add(
		RootProducer.subscribe(selectPlayerCashById(state.userId), (state) => {
			updateCash(state);
		}),
	);

	updateCash(state.data?.cash);

	janitor.Add(leaderstats);
	janitor.Add(cash);

	return () => janitor.Destroy();
});
