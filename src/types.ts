export type CodeLength = 4 | 6

export type StrategyName =
	| 'mixed'
	| 'pairs'
	| 'triples'
	| 'mirror'
	| 'wave'
	| 'escalator'
	| 'pairWave'
	| 'custom'

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
	strategy?: StrategyName
	avoidSimpleSequences?: boolean
	avoidSameDigits?: boolean
	blackList?: string[]
	previousCode?: string
	allowedDigits?: string[]
	rng?: () => number
	customStrategy?: (ctx: CustomStrategyContext) => string
}
