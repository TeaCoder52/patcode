import { describe, it, expect } from 'vitest'
import patcode, { generateCode, isHumanFriendly } from '../src/index'

describe('patcode core API', () => {
	it('generates a 6-digit code by default', () => {
		const code = generateCode()
		expect(code).toMatch(/^\d{6}$/)
	})

	it('generates a 4-digit code', () => {
		const code = generateCode({ length: 4 })
		expect(code).toMatch(/^\d{4}$/)
	})

	it('exported default works', () => {
		const code = patcode.generateCode()
		expect(code.length).toBe(6)
	})

	it('validates human-friendly code', () => {
		const code = generateCode()
		expect(isHumanFriendly(code)).toBe(true)
	})

	it('rejects non-numeric codes', () => {
		expect(isHumanFriendly('ab12')).toBe(false)
	})
})
