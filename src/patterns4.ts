import * as utils from './utils'

export function patternAABB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, A, B, B])
}

export function patternABBA(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, B, A])
}

export function patternABAB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, A, B])
}

export function patternAAAB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, A, A, B])
}

export function patternABBB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, B, B])
}

export function patternAABC(digits: string[], rng: () => number): string {
	const [A, B, C] = utils.pickThreeDifferentDigits(digits, rng)
	return utils.fromDigits([A, A, B, C])
}

export function patternABBC(digits: string[], rng: () => number): string {
	const [A, B, C] = utils.pickThreeDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, B, C])
}

export function patternMixed4(digits: string[], rng: () => number): string {
	const list = [
		patternAABB,
		patternABBA,
		patternABAB,
		patternAAAB,
		patternABBB,
		patternAABC,
		patternABBC,
	]
	const impl = utils.pickRandom(list, rng)
	return impl(digits, rng)
}
