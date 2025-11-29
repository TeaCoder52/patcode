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

export type HumanProfile = 'default' | 'children' | 'elderly' | 'asia' | 'latam'
export type SecurityMode = 'normal' | 'banking'
export type RngProfile = 'insecure' | 'secure' | 'hybrid' | (string & {})

export interface CustomStrategyContext {
	length: CodeLength
	pickDigit(): string
	pickTwoDifferentDigits(): [string, string]
	pickThreeDifferentDigits(): [string, string, string]
	fromDigits(digits: string[]): string
	isTooSimple(code: string): boolean
	isAllSame(code: string): boolean
}

export interface CodeAnalysis {
	length: CodeLength
	isAllSame: boolean
	isTooSimple: boolean
	isSequentialAsc: boolean
	isSequentialDesc: boolean
	repeatedGroups: number

	entropy: number
	collisionRisk: 'low' | 'medium' | 'high'
	memorability: 'low' | 'medium' | 'high'
}

export interface CodePrediction {
	memorabilityScore: number
	confusionScore: number
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
	rngProfile?: RngProfile

	profile?: HumanProfile
	mode?: SecurityMode

	avoidSimilarPrevious?: boolean

	customStrategy?: (ctx: CustomStrategyContext) => string
}
