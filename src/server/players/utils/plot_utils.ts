import { Workspace } from "@rbxts/services";

const PLOTS = Workspace.FindFirstChild("Plots") as Folder;

export function getAvailablePlot() {
	return PLOTS.GetChildren()
		.map((child) => child as Model)
		.filter((plot) => plot.GetAttribute("owner") === undefined);
}
