# Patcode Documentation

Patcode is a human-centric numeric code generator designed for OTP, SMS verification, 2FA systems, banking environments, onboarding flows, and any scenario that requires short and memorable codes.
The library focuses on generating structured, high-readability numeric patterns while maintaining configurable security guarantees.

**Patcode provides**:

-   Human-friendly numeric code generation (4-digit and 6-digit)
-   Pattern-based strategies (AABB, ABAB, wave, mirror, escalator)
-   Configurable strictness levels and security modes
-   Adaptive UX profiles (children, elderly, asia, latam)
-   Code analysis engine (entropy, memorability, collision risk)
-   Secure RNG abstraction with fallback logic
-   Fully typed API with TypeScript support
-   Works in Node.js, browsers, Deno, Bun, Cloudflare Workers

## Why Patcode

Memorability and predictability often conflict in numeric code generation.
Patcode attempts to balance these competing goals by providing:

1. Predictably structured patterns for user experience
2. Customizable entropy and strictness levels
3. Optional banking-grade security modes
4. Transparent analysis tools for evaluating generated codes

## Installation

Patcode supports all major JavaScript runtimes.

### Node.js / Bun / Deno

```bash
npm install patcode
```

or

```bash
yarn add patcode
```

or

```bash
pnpm add patcode
```

or

```bash
bun add patcode
```

ESM:

```js
import { generateCode } from 'patcode'
```

CJS:

```js
const { generateCode } = require('patcode')
```

## Quick Start

Generate a 6-digit code:

```js
import { generateCode } from 'patcode'

const code = generateCode()
```

Generate a 4-digit code

```js
generateCode({ length: 4 })
```

Use a specific pattern strategy

```js
generateCode({ strategy: 'wave' })
```

Analyze a code

```js
import { analyze } from 'patcode'

const result = analyze('5566')
```

## Features Overview

### Pattern-Based Code Generation

Patcode includes multiple predefined strategies:

-   mixed
-   pairs
-   triples
-   mirror
-   wave
-   escalator
-   pairWave
-   custom

Patterns include:

-   AABB
-   ABAB
-   ABBA
-   AAAB
-   ABCABC
-   ABCCBA

These strategies produce codes with predictable structures, improving user memorability.

### Code Analysis Engine

Patcode includes a built-in analysis module that identifies:

-   Shannon entropy (normalized per code length)
-   Memorability score
-   Collision risk
-   Ascending or descending sequences
-   Structural patterns
-   Group segmentation

This module can be used for research, reporting, debugging, or building custom rules for OTP distribution.

### Adaptive User Profiles

Different user groups memorize patterns differently.
Each profile adjusts:

-   allowed patterns
-   memorability weighting
-   entropy thresholds
-   sequence filtering
-   digit selection preferences

### Security Modes

Patcode offers specialized operational modes:

-   normal
-   banking
-   enterprise
-   ultra-secure

High-security modes reduce pattern predictability, avoid digit repetition, and increase entropy guarantees.

### Universal RNG Engine

Patcode includes an abstraction layer for secure random number generation.

Supported RNG sources:

-   Web Crypto API
-   Node.js crypto.webcrypto
-   Custom user-provided RNG
-   Math.random fallback (only when explicitly allowed)

Secure RNG is automatically selected when available.

## When to Use Patcode

Patcode is particularly effective in:

-   SMS verification workflows
-   Password reset flows
-   2FA onboarding
-   Banking transaction approvals
-   One-time PIN generation
-   IoT device pairing
-   Access control terminals
-   Authentication systems with UX constraints

If your system requires codes that are both human-friendly and structurally meaningful, Patcode is a suitable solution.

## When Not to Use Patcode

Patcode is not intended for:

-   Cryptographically guaranteed high-entropy tokens
-   Long-form UUID or SHA-based identifiers
-   Authentication flows that prohibit human-readable structure
-   Encoding arbitrary data into numeric strings

For these cases, consider using UUID v4 or crypto-based random generators.
