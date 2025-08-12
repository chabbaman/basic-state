interface Spr {
	target: (
		target: Instance,
		dampingRatio: number,
		frequency: number,
		targetProperties: { [key: string]: unknown },
	) => void;
	stop: (target: Instance, property?: string) => void;
}

declare const Spr: Spr;

export = Spr;
