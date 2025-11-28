import * as utils from './utils'

export function patternABABAB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, A, B, A, B])
}

export function patternAABBCC(digits: string[], rng: () => number): string {
	const [A, B, C] = utils.pickThreeDifferentDigits(digits, rng)
	return utils.fromDigits([A, A, B, B, C, C])
}

export function patternAAABBB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, A, A, B, B, B])
}

export function patternABBABB(digits: string[], rng: () => number): string {
	const [A, B] = utils.pickTwoDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, B, A, B, B])
}

export function patternABCABC(digits: string[], rng: () => number): string {
	const [A, B, C] = utils.pickThreeDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, C, A, B, C])
}

export function patternABCCBA(digits: string[], rng: () => number): string {
	const [A, B, C] = utils.pickThreeDifferentDigits(digits, rng)
	return utils.fromDigits([A, B, C, C, B, A])
}

export function patternMixed6(digits: string[], rng: () => number): string {
	const list = [
		patternABABAB,
		patternAABBCC,
		patternAAABBB,
		patternABBABB,
		patternABCABC,
		patternABCCBA,
	]
	const impl = utils.pickRandom(list, rng)
	return impl(digits, rng)
}
