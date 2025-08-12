interface TextPlus {
	Create: (frame: GuiBase2d, text: string, customization: { [key: string]: unknown }) => void;
}

declare const TextPlus: TextPlus;

export = TextPlus;
