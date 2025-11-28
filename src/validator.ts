import type { GenerateOptions } from './types'
import { isAllSame, isTooSimpleSequence } from './utils'

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

	return true
}
