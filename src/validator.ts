import type { GenerateOptions } from './types'
import { isAllSame, isTooSimpleSequence } from './utils'
import {
	isModeCompatible,
	isPredictionCompatible,
	isProfileCompatible,
} from './profile'

export function isCodeAllowed(
	code: string,
	options: GenerateOptions = {}
): boolean {
	const avoidSimple = options.avoidSimpleSequences !== false
	const avoidAllSame = options.avoidSameDigits !== false

	if (options.blackList?.includes(code)) return false
	if (options.previousCode && options.previousCode === code) return false

	if (avoidAllSame && isAllSame(code)) return false
	if (avoidSimple && isTooSimpleSequence(code)) return false

	if (!isProfileCompatible(code, options)) return false
	if (!isModeCompatible(code, options)) return false
	if (!isPredictionCompatible(code, options)) return false

	return true
}
