import {
	GenerateOptions,
	CodeLength,
	Strategy,
	CustomStrategyContext,
	HumanProfile,
	SecurityMode,
	RngProfile,
	type CodeAnalysis,
	type CodePrediction,
} from './types'
import { getStrategyImpl } from './strategy'
import { isCodeAllowed } from './validator'
import {
	getAllowedDigits,
	fromDigits,
	isAllSame,
	isTooSimpleSequence,
	pickDigit,
	pickTwoDifferentDigits,
	pickThreeDifferentDigits,
	getRng,
} from './utils'
import { registerRng } from './rng'
import { analyze } from './analyze'
import { predictCodeQuality } from './predictor'

export type {
	GenerateOptions,
	CodeLength,
	CustomStrategyContext,
	HumanProfile,
	SecurityMode,
	RngProfile,
	CodeAnalysis,
	CodePrediction,
}
export { Strategy, analyze, predictCodeQuality, registerRng }

export function generateCode(options: GenerateOptions = {}): string {
	const length: CodeLength = options.length === 4 ? 4 : 6
	const strategy: Strategy = options.strategy ?? Strategy.Mixed

	if (options.mode === 'banking') {
		return generateBankingCode({ ...options, length })
	}

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

function generateBankingCode(options: GenerateOptions = {}): string {
	const length: CodeLength = options.length === 4 ? 4 : 6
	const digits = getAllowedDigits(options)
	const rng = getRng({ ...options, mode: 'banking' })

	const maxAttempts = 100
	for (let i = 0; i < maxAttempts; i++) {
		const result: string[] = []
		while (result.length < length) {
			const d = pickDigit(digits, rng)
			if (!result.includes(d)) {
				result.push(d)
			}
		}
		const code = fromDigits(result)
		if (isCodeAllowed(code, { ...options, mode: 'banking' })) {
			return code
		}
	}

	const fallback = fromDigits(
		Array.from({ length }, () => pickDigit(digits, rng))
	)
	return fallback.slice(0, length)
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
