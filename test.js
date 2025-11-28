const { generateCode } = require('./index');

console.log('6-digit default:', generateCode());
console.log('4-digit mixed:', generateCode({ length: 4 }));
console.log('pairWave 6:', generateCode({ length: 6, strategy: 'pairWave' }));
console.log('no avoid:', generateCode({ length: 4, avoidSimpleSequences: false, avoidSameDigits: false }));

const customCode = generateCode({
	length: 6,
	strategy: 'custom',
	customStrategy(ctx) {
		// Пример: первая цифра = '9', остальные — ABAB
		const [A, B] = ctx.pickTwoDifferentDigits();
		const tail = [A, B, A, B, A]; // 5 цифр, т.к. первая уже фиксированная
		return '9' + ctx.fromDigits(tail);
	}
});
console.log('Custom strategy:', customCode);
