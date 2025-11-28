import { describe, it, expect } from 'vitest'
import * as S6 from '../src/patterns6'
import { getAllowedDigits, getRng } from '../src/utils'

const digits = getAllowedDigits()
const rng = getRng()

describe('6-digit patterns', () => {
	it('ABABAB pattern', () => {
		const code = S6.patternABABAB(digits, rng)
		expect(code.length).toBe(6)
		expect(code[0]).toBe(code[2])
		expect(code[0]).toBe(code[4])
	})

	it('AABBCC', () => {
		const code = S6.patternAABBCC(digits, rng)
		expect(code).toMatch(/(\d)\1(\d)\2(\d)\3/)
	})

	it('mixed returns 6 digits', () => {
		const code = S6.patternMixed6(digits, rng)
		expect(code).toMatch(/^\d{6}$/)
	})
})
