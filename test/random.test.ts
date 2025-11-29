import { describe, it, expect } from 'vitest'
import { generateCode, Strategy } from '../src/index'

function fakeRngGenerator(values: number[]) {
	let i = 0
	return () => values[i++ % values.length]
}

describe('deterministic RNG', () => {
	it('produces deterministic output', () => {
		const rng = fakeRngGenerator([0.1, 0.2, 0.3, 0.4])

		const code1 = generateCode({
			length: 6,
			strategy: Strategy.Custom,
			rng,
			customStrategy(ctx) {
				const d1 = ctx.pickDigit()
				const d2 = ctx.pickDigit()
				const d3 = ctx.pickDigit()
				const d4 = ctx.pickDigit()
				const d5 = ctx.pickDigit()
				const d6 = ctx.pickDigit()

				return ctx.fromDigits([d1, d2, d3, d4, d5, d6])
			},
		})

		const rng2 = fakeRngGenerator([0.1, 0.2, 0.3, 0.4])

		const code2 = generateCode({
			length: 6,
			strategy: Strategy.Custom,
			rng: rng2,
			customStrategy(ctx) {
				const d1 = ctx.pickDigit()
				const d2 = ctx.pickDigit()
				const d3 = ctx.pickDigit()
				const d4 = ctx.pickDigit()
				const d5 = ctx.pickDigit()
				const d6 = ctx.pickDigit()

				return ctx.fromDigits([d1, d2, d3, d4, d5, d6])
			},
		})

		expect(code1).toBe(code2)
	})
})
