import type { GenerateOptions } from './types'

export function getRng(options?: GenerateOptions): () => number {
	return options?.rng ?? Math.random
}

export function getAllowedDigits(options?: GenerateOptions): string[] {
	if (options?.allowedDigits && options.allowedDigits.length > 0) {
		return options.allowedDigits.slice()
	}
	return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
}

export function pickRandom<T>(array: T[], rng: () => number): T {
	if (!array.length) {
		throw new Error('Cannot pick from empty array')
	}
	const index = Math.floor(rng() * array.length)
	return array[index]
}

export function shuffle<T>(array: T[], rng: () => number): T[] {
	const arr = array.slice()
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
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
	if (digits.length < 2) {
		throw new Error('Need at least 2 digits')
	}

	const A = pickDigit(digits, rng)
	let B = pickDigit(digits, rng)
	let guard = 0

	while (B === A && guard++ < 20) {
		B = pickDigit(digits, rng)
	}

	if (A === B) {
		const filtered = digits.filter((d) => d !== A)
		B = pickDigit(filtered, rng)
	}

	return [A, B]
}

export function pickThreeDifferentDigits(
	digits: string[],
	rng: () => number
): [string, string, string] {
	const [A, B] = pickTwoDifferentDigits(digits, rng)
	let C = pickDigit(digits, rng)
	let guard = 0

	while ((C === A || C === B) && guard++ < 30) {
		C = pickDigit(digits, rng)
	}

	if (C === A || C === B) {
		const filtered = digits.filter((d) => d !== A && d !== B)
		C = pickDigit(filtered, rng)
	}

	return [A, B, C]
}

export function isAllSame(code: string): boolean {
	if (!code) return false
	return [...code].every((ch) => ch === code[0])
}

export function isTooSimpleSequence(code: string): boolean {
	if (!code || code.length < 3) return false

	let isAscending = true
	let isDescending = true

	for (let i = 1; i < code.length; i++) {
		const prev = Number(code[i - 1])
		const curr = Number(code[i])

		if (curr !== (prev + 1) % 10) {
			isAscending = false
		}
		if (curr !== (prev + 9) % 10) {
			isDescending = false
		}
	}

	return isAscending || isDescending
}

export function fromDigits(digits: string[]): string {
	return digits.join('')
}
