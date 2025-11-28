import { describe, it, expect } from 'vitest'
import { isCodeAllowed } from '../src/validator'

describe('validator', () => {
	it('rejects all-same', () => {
		expect(isCodeAllowed('1111')).toBe(false)
	})

	it('rejects simple sequences', () => {
		expect(isCodeAllowed('1234')).toBe(false)
	})

	it('accepts normal code', () => {
		expect(isCodeAllowed('4455')).toBe(true)
	})

	it('blacklist works', () => {
		expect(isCodeAllowed('4455', { blackList: ['4455'] })).toBe(false)
	})
})
