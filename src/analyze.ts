import { isAllSame, isTooSimpleSequence } from './utils'
import type { CodeLength, CodeAnalysis } from './types'

function isSequentialAsc(code: string): boolean {
	for (let i = 1; i < code.length; i++) {
		const prev = Number(code[i - 1])
		const curr = Number(code[i])
		if (curr !== (prev + 1) % 10) return false
	}
	return true
}

function isSequentialDesc(code: string): boolean {
	for (let i = 1; i < code.length; i++) {
		const prev = Number(code[i - 1])
		const curr = Number(code[i])
		if (curr !== (prev + 9) % 10) return false
	}
	return true
}

function countGroups(code: string): number {
	let groups = 1
	for (let i = 1; i < code.length; i++) {
		if (code[i] !== code[i - 1]) groups++
	}
	return groups
}

function estimateEntropy(code: string): number {
	const freq: Record<string, number> = {}

	for (const d of code) freq[d] = (freq[d] || 0) + 1

	let entropy = 0
	for (const k in freq) {
		const p = freq[k] / code.length
		entropy -= p * Math.log2(p)
	}

	return entropy * code.length
}

function collisionRisk(
	code: string,
	entropy: number
): 'low' | 'medium' | 'high' {
	if (code.length === 4) {
		// Max entropy ~8 bits
		if (entropy > 6.5) return 'low'
		if (entropy > 3.5) return 'medium'
		return 'high'
	}

	if (code.length === 6) {
		// Max entropy ~12 bits
		if (entropy > 10) return 'low'
		if (entropy > 6) return 'medium'
		return 'high'
	}

	return 'high'
}

function memorabilityScore(
	code: string,
	groups: number
): 'low' | 'medium' | 'high' {
	if (isAllSame(code)) return 'low'
	if (isTooSimpleSequence(code)) return 'low'

	if (groups <= 2) return 'high'

	if (groups === 3) return 'medium'

	return 'low'
}

export function analyze(code: string): CodeAnalysis {
	const length = code.length as CodeLength

	const allSame = isAllSame(code)
	const tooSimple = isTooSimpleSequence(code)
	const asc = isSequentialAsc(code)
	const desc = isSequentialDesc(code)
	const groups = countGroups(code)

	const entropy = estimateEntropy(code)
	const collision = collisionRisk(code, entropy)
	const memory = memorabilityScore(code, groups)

	return {
		length,
		isAllSame: allSame,
		isTooSimple: tooSimple,
		isSequentialAsc: asc,
		isSequentialDesc: desc,
		repeatedGroups: groups,

		entropy,
		collisionRisk: collision,
		memorability: memory,
	}
}
