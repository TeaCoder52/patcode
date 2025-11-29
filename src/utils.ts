import type { GenerateOptions } from './types'
import { resolveRng } from './rng'

export function getRng(options?: GenerateOptions): () => number {
	return resolveRng(options)
}

export function getAllowedDigits(options?: GenerateOptions): string[] {
	if (options?.allowedDigits && options.allowedDigits.length > 0) {
		return options.allowedDigits.slice()
	}
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}

export function pickRandom<T>(array: T[], rng: () => number): T {
	if (!array.length) throw new Error('Cannot pick from empty array')
	const index = Math.floor(rng() * array.length)
	return array[index]!
}

export function shuffle<T>(array: T[], rng: () => number): T[] {
	const arr = array.slice()
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1))
		;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
	}
	return arr
}

export function pickDigit(digits: string[], rng: () => number): string {
	return pickRandom(digits, rng)
}

export function pickTwoDifferentDigits(
	digits: string[],
	rng: () => number
): [string, string] {
	if (digits.length < 2) throw new Error('Need at least 2 different digits')

	const d1 = pickDigit(digits, rng)
	let d2 = pickDigit(digits, rng)
	let guard = 0

	while (d2 === d1 && guard++ < 20) {
		d2 = pickDigit(digits, rng)
	}

	if (d1 === d2) {
		const filtered = digits.filter((d) => d !== d1)
		d2 = pickDigit(filtered, rng)
	}

	return [d1, d2]
}

export function pickThreeDifferentDigits(
	digits: string[],
	rng: () => number
): [string, string, string] {
	if (digits.length < 3) throw new Error('Need at least 3 different digits')

	const [d1, d2] = pickTwoDifferentDigits(digits, rng)
	let d3 = pickDigit(digits, rng)
	let guard = 0

	while ((d3 === d1 || d3 === d2) && guard++ < 30) {
		d3 = pickDigit(digits, rng)
	}

	if (d3 === d1 || d3 === d2) {
		const filtered = digits.filter((d) => d !== d1 && d !== d2)
		d3 = pickDigit(filtered, rng)
	}

	return [d1, d2, d3]
}

export function isAllSame(code: string): boolean {
	if (!code) return false
	const first = code[0]
	for (let i = 1; i < code.length; i++) {
		if (code[i] !== first) return false
	}
	return true
}

export function isTooSimpleSequence(code: string): boolean {
	if (!code || code.length < 3) return false

	let asc = true
	let desc = true

	for (let i = 1; i < code.length; i++) {
		const prev = Number(code[i - 1])
		const curr = Number(code[i])
		if (curr !== (prev + 1) % 10) asc = false
		if (curr !== (prev + 9) % 10) desc = false
	}

	return asc || desc
}

export function fromDigits(digits: string[]): string {
	return digits.join('')
}
