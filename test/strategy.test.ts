import { describe, it, expect } from 'vitest'
import { getStrategyImpl } from '../src/strategy'
import { Strategy } from '../src'

describe('strategy system', () => {
	it('creates a implementation function', () => {
		const impl = getStrategyImpl(6, Strategy.Mixed, {})
		const code = impl()
		expect(code.length).toBe(6)
	})

	it('custom strategy works', () => {
		const impl = getStrategyImpl(4, Strategy.Custom, {
			customStrategy: () => '1234',
		})
		expect(impl()).toBe('1234')
	})
})
