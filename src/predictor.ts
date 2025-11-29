import type { CodePrediction, GenerateOptions } from './types'
import { analyze } from './analyze'

function hammingSimilarity(a: string, b: string): number {
	if (!a || !b || a.length !== b.length) return 0
	let same = 0
	for (let i = 0; i < a.length; i++) {
		if (a[i] === b[i]) same++
	}
	return same / a.length
}

export function predictCodeQuality(
	code: string,
	options: GenerateOptions = {}
): CodePrediction {
	const a = analyze(code)

	let baseMem = 0.5
	if (a.memorability === 'low') baseMem = 0.25
	if (a.memorability === 'medium') baseMem = 0.55
	if (a.memorability === 'high') baseMem = 0.85

	switch (options.profile) {
		case 'children':
			baseMem += 0.1
			break
		case 'elderly':
			if (a.entropy > 10) baseMem -= 0.1
			break
		case 'asia':
			if (code.includes('4')) baseMem -= 0.15
			break
		case 'latam':
			if (a.memorability === 'high') baseMem += 0.05
			break
		default:
			break
	}

	let confusion = 0
	if (options.previousCode && options.previousCode.length === code.length) {
		confusion = hammingSimilarity(code, options.previousCode)
	}

	const clamp = (v: number) => Math.max(0, Math.min(1, v))

	return {
		memorabilityScore: clamp(baseMem),
		confusionScore: clamp(confusion),
	}
}
