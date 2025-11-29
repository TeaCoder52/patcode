import {
	GenerateOptions,
	CodeLength,
	Strategy,
	CustomStrategyContext,
	CodeAnalysis,
} from './types'
import { getStrategyImpl } from './strategy'
import { isCodeAllowed } from './validator'
import {
	getAllowedDigits,
	getRng,
	fromDigits,
	isAllSame,
	isTooSimpleSequence,
	pickDigit,
	pickTwoDifferentDigits,
	pickThreeDifferentDigits,
} from './utils'

export { analyze } from './analyze'

export {
	GenerateOptions,
	CodeLength,
	Strategy,
	CustomStrategyContext,
	CodeAnalysis,
}

export function generateCode(options: GenerateOptions = {}): string {
	const length: CodeLength = options.length === 4 ? 4 : 6
	const strategy: Strategy = options.strategy ?? Strategy.Mixed

	const impl = getStrategyImpl(length, strategy, options)

	const maxAttempts = 100
	let code = ''

	for (let i = 0; i < maxAttempts; i++) {
		code = impl()
		if (code.length !== length) {
			code = code.slice(0, length)
		}
		if (isCodeAllowed(code, options)) {
			return code
		}
	}

	return code.slice(0, length)
}

export function isHumanFriendly(
	code: string,
	options?: GenerateOptions
): boolean {
	if (!/^\d+$/.test(code)) return false
	if (code.length !== 4 && code.length !== 6) return false
	return isCodeAllowed(code, options ?? {})
}

export function createCustomContext(
	options: GenerateOptions = {}
): CustomStrategyContext {
	const length: CodeLength = options.length === 4 ? 4 : 6
	const rng = getRng(options)
	const digits = getAllowedDigits(options)

	return {
		length,
		pickDigit: () => pickDigit(digits, rng),
		pickTwoDifferentDigits: () => pickTwoDifferentDigits(digits, rng),
		pickThreeDifferentDigits: () => pickThreeDifferentDigits(digits, rng),
		fromDigits,
		isTooSimple: isTooSimpleSequence,
		isAllSame,
	}
}

export default {
	generateCode,
	isHumanFriendly,
	createCustomContext,
}
