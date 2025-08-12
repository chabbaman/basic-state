import { Janitor } from "@rbxts/janitor";
import { Players } from "@rbxts/services";
import { RootProducer } from "server/store/root_producer";
import { getPlayerId, selectPlayersById, selectPlotById } from "shared/producers/players_producer";

function claimPlot(player: Player, plot: Model) {
	plot.SetAttribute("owner", player.UserId);
	player.SetAttribute("plot", plot.Name);

	teleportPlayerToPlot(player, plot);
}

function teleportPlayerToPlot(player: Player, plot: Model) {
	player.Character?.PivotTo(plot.GetPivot().add(new Vector3(0, 10, 0)));
}

RootProducer.observe(selectPlayersById, getPlayerId, (playerState) => {
	const player = Players.GetPlayerByUserId(playerState.userId);
	if (!player) return;

	const janitor = new Janitor();

	const applyPlot = (plot?: Model) => {
		if (!plot) return;
		claimPlot(player, plot);
	};

	janitor.Add(RootProducer.subscribe(selectPlotById(playerState.userId), applyPlot));
	applyPlot(playerState.plot);

	return () => janitor.Destroy();
});
