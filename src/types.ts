export type CodeLength = 4 | 6

export enum Strategy {
	Mixed = 'mixed',
	Pairs = 'pairs',
	Triples = 'triples',
	Mirror = 'mirror',
	Wave = 'wave',
	Escalator = 'escalator',
	PairWave = 'pairWave',
	Custom = 'custom',
}

export interface CustomStrategyContext {
	length: CodeLength
	pickDigit(): string
	pickTwoDifferentDigits(): [string, string]
	pickThreeDifferentDigits(): [string, string, string]
	fromDigits(digits: string[]): string
	isTooSimple(code: string): boolean
	isAllSame(code: string): boolean
}

export interface GenerateOptions {
	length?: CodeLength
	strategy?: Strategy
	avoidSimpleSequences?: boolean
	avoidSameDigits?: boolean
	blackList?: string[]
	previousCode?: string
	allowedDigits?: string[]
	rng?: () => number
	customStrategy?: (ctx: CustomStrategyContext) => string
}

export interface CodeAnalysis {
	length: CodeLength
	isAllSame: boolean
	isTooSimple: boolean
	isSequentialAsc: boolean
	isSequentialDesc: boolean
	repeatedGroups: number
	pattern?: string
	entropy: number
	memorability: 'low' | 'medium' | 'high'
	collisionRisk: 'low' | 'medium' | 'high'
}
