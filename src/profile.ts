import type { GenerateOptions, HumanProfile, SecurityMode } from './types'
import { analyze } from './analyze'
import { isAllSame, isTooSimpleSequence } from './utils'
import { predictCodeQuality } from './predictor'

function hasRepeats(code: string): boolean {
	return new Set(code).size < code.length
}

export function isProfileCompatible(
	code: string,
	options: GenerateOptions
): boolean {
	const profile: HumanProfile = options.profile ?? 'default'
	const analysis = analyze(code)
	const prediction = predictCodeQuality(code, options)

	switch (profile) {
		case 'children': {
			if (analysis.memorability === 'low') return false
			if (prediction.memorabilityScore < 0.6) return false
			if (analysis.isSequentialAsc || analysis.isSequentialDesc)
				return false
			return true
		}
		case 'elderly': {
			if (analysis.memorability === 'low') return false
			if (analysis.entropy > 11 && analysis.length === 6) return false
			return true
		}
		case 'asia': {
			if (code.includes('4')) return false
			return true
		}
		case 'latam': {
			if (code[0] === '0' || code[0] === '1') return false
			return true
		}
		case 'default':
		default:
			return true
	}
}

export function isModeCompatible(
	code: string,
	options: GenerateOptions
): boolean {
	const mode: SecurityMode = options.mode ?? 'normal'
	if (mode === 'normal') return true

	const a = analyze(code)

	if (isAllSame(code)) return false
	if (isTooSimpleSequence(code)) return false
	if (hasRepeats(code)) return false
	if (a.isSequentialAsc || a.isSequentialDesc) return false

	if (a.length === 4 && a.entropy < 6.5) return false
	if (a.length === 6 && a.entropy < 10) return false

	return true
}

export function isPredictionCompatible(
	code: string,
	options: GenerateOptions
): boolean {
	if (!options.avoidSimilarPrevious || !options.previousCode) return true
	if (options.previousCode.length !== code.length) return true

	const prediction = predictCodeQuality(code, options)

	if (prediction.confusionScore > 0.5) return false
	return true
}
