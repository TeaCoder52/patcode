# Patcode

Patcode is a generator of short, memorable, human-friendly numeric codes based on structured patterns.  
Perfect for **OTP**, **SMS verification**, **2FA**, **PIN codes**, onboarding steps, and any UX-friendly confirmation flows.

---

## Features

-   Generates **4-digit** and **6-digit** human-friendly codes
-   Pattern-based generation: **AABB**, **ABAB**, **ABBA**, **AAAB**, **ABBB**, **AABC**, **ABBC**,  
    plus **ABABAB**, **AABBCC**, **AAABBB**, **ABBABB**, **ABCABC**, **ABCCBA**
-   Filters out simple sequences (`1234`, `9876`) and repeated digits (`0000`)
-   Fully customizable strategies (your own generator logic)
-   Optional custom RNG (for cryptographic random or deterministic tests)

---

## Installation

```bash
npm install patcode
# or
yarn add patcode
# or
pnpm add patcode
```

---

## Usage

### Basic

```ts
import { generateCode } from 'patcode'

generateCode() // "535353" (6-digit, mixed patterns)
```

### 4-digit code

```ts
generateCode({ length: 4 }) // "5566"
```

## Custom Strategy

```ts
generateCode({
	length: 6,
	strategy: 'custom',
	customStrategy(ctx) {
		// example: code starting with 9, then ABAB
		const [A, B] = ctx.pickTwoDifferentDigits()
		return ctx.fromDigits(['9', A, B, A, B, A])
	},
})
```

## License

This project is licensed under the [**MIT License**](./LICENSE).
