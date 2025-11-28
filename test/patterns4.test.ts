import { describe, it, expect } from 'vitest'
import * as S4 from '../src/patterns4'
import { getAllowedDigits, getRng } from '../src/utils'

const digits = getAllowedDigits()
const rng = getRng()

describe('4-digit patterns', () => {
	it('AABB', () => {
		const code = S4.patternAABB(digits, rng)
		expect(code).toMatch(/(\d)\1(\d)\2/)
	})

	it('ABAB', () => {
		const code = S4.patternABAB(digits, rng)
		expect(code[0]).toBe(code[2])
		expect(code[1]).toBe(code[3])
	})

	it('mixed returns 4 digits', () => {
		const code = S4.patternMixed4(digits, rng)
		expect(code).toMatch(/^\d{4}$/)
	})
})
