import { ProximityPromptService } from "@rbxts/services";
import Spr from "shared/modules/Spr";

const highlight = new Instance("Highlight");
highlight.Name = "ProximityHighlight";
highlight.FillColor = Color3.fromRGB(255, 255, 255);
highlight.FillTransparency = 0.5;
highlight.OutlineColor = Color3.fromRGB(255, 255, 255);
highlight.OutlineTransparency = 0;

function showHighlight(model: Model) {
	highlight.FillTransparency = 1;
	highlight.OutlineTransparency = 1;
	highlight.Parent = model;

	Spr.target(highlight, 1, 3, {
		FillTransparency: 0.5,
		OutlineTransparency: 0,
	});
}

function hideHighlight() {
	Spr.target(highlight, 1, 3, {
		FillTransparency: 1,
		OutlineTransparency: 1,
	});
}

ProximityPromptService.PromptShown.Connect((prompt) => {
	const modelAncestor = prompt.FindFirstAncestorWhichIsA("Model");
	if (modelAncestor) {
		showHighlight(modelAncestor);
	}
});

ProximityPromptService.PromptHidden.Connect((prompt) => {
	const modelAncestor = prompt.FindFirstAncestorWhichIsA("Model");
	if (modelAncestor) {
		hideHighlight();
	}
});
