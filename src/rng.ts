import type { GenerateOptions, RngProfile } from './types'

export type RngFunction = () => number

const rngRegistry = new Map<RngProfile, RngFunction>()

function defaultInsecureRng(): number {
	return Math.random()
}

function defaultSecureRng(): number {
	if (typeof globalThis !== 'undefined') {
		const g: any = globalThis as any
		if (g.crypto && typeof g.crypto.getRandomValues === 'function') {
			const arr = new Uint32Array(1)
			g.crypto.getRandomValues(arr)
			return arr[0]! / 0xffffffff
		}
	}

	try {
		const nodeCrypto = require('crypto')
		const web = nodeCrypto.webcrypto

		if (web && typeof web.getRandomValues === 'function') {
			const arr = new Uint32Array(1)
			web.getRandomValues(arr)
			return arr[0]! / 0xffffffff
		}
	} catch {}

	return Math.random()
}

function defaultHybridRng(): number {
	const a = defaultInsecureRng()
	const b = defaultSecureRng()
	return (a + b) % 1
}

rngRegistry.set('insecure', defaultInsecureRng)
rngRegistry.set('secure', defaultSecureRng)
rngRegistry.set('hybrid', defaultHybridRng)

export function registerRng(name: RngProfile, rng: RngFunction): void {
	if (typeof rng !== 'function') {
		throw new Error('RNG must be a function that returns number in [0,1)')
	}
	rngRegistry.set(name, rng)
}

export function resolveRng(options?: GenerateOptions): RngFunction {
	if (options?.rng) return options.rng

	if (options?.rngProfile && rngRegistry.has(options.rngProfile)) {
		return rngRegistry.get(options.rngProfile)!
	}

	if (options?.mode === 'banking') {
		return rngRegistry.get('secure') ?? defaultSecureRng
	}

	return rngRegistry.get('insecure') ?? defaultInsecureRng
}
