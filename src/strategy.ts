import type {
	CodeLength,
	Strategy,
	GenerateOptions,
	CustomStrategyContext,
} from './types'
import * as utils from './utils'
import * as s4 from './patterns4'
import * as s6 from './patterns6'

export function getStrategyImpl(
	length: CodeLength,
	strategy: Strategy,
	options: GenerateOptions
): () => string {
	const digits = utils.getAllowedDigits(options)
	const rng = utils.getRng(options)

	const ctx: CustomStrategyContext = {
		length,
		pickDigit: () => utils.pickDigit(digits, rng),
		pickTwoDifferentDigits: () => utils.pickTwoDifferentDigits(digits, rng),
		pickThreeDifferentDigits: () =>
			utils.pickThreeDifferentDigits(digits, rng),
		fromDigits: utils.fromDigits,
		isTooSimple: utils.isTooSimpleSequence,
		isAllSame: utils.isAllSame,
	}

	if (strategy === 'custom') {
		if (!options.customStrategy) {
			throw new Error(
				'customStrategy must be provided when strategy = "custom"'
			)
		}
		return () => options.customStrategy!(ctx)
	}

	if (length === 4) {
		const map: Record<string, () => string> = {
			pairs: () => s4.patternMixed4(digits, rng),
			triples: () =>
				utils.pickRandom([s4.patternAAAB, s4.patternABBB], rng)(
					digits,
					rng
				),
			mirror: () => s4.patternABBA(digits, rng),
			wave: () => s4.patternABAB(digits, rng),
			escalator: () =>
				utils.pickRandom([s4.patternAABC, s4.patternABBC], rng)(
					digits,
					rng
				),
			pairWave: () =>
				utils.pickRandom([s4.patternAABB, s4.patternABAB], rng)(
					digits,
					rng
				),
			mixed: () => s4.patternMixed4(digits, rng),
		}
		return map[strategy] || map.mixed
	}

	const map6: Record<string, () => string> = {
		pairs: () =>
			utils.pickRandom(
				[s6.patternAABBCC, s6.patternAAABBB, s6.patternABBABB],
				rng
			)(digits, rng),
		triples: () => s6.patternAAABBB(digits, rng),
		mirror: () => s6.patternABCCBA(digits, rng),
		wave: () =>
			utils.pickRandom([s6.patternABABAB, s6.patternABCABC], rng)(
				digits,
				rng
			),
		escalator: () => s6.patternAABBCC(digits, rng),
		pairWave: () =>
			utils.pickRandom([s6.patternAABBCC, s6.patternABBABB], rng)(
				digits,
				rng
			),
		mixed: () => s6.patternMixed6(digits, rng),
	}

	return map6[strategy] || map6.mixed
}
