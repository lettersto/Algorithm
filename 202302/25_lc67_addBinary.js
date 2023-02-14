// LeetCode 67 Add Binary

// Number.parseInt(num, 2)로 2진수를 바꿨더니, overflow가 발생해서 숫자가 제대로 안 나왔다.

// BigInt를 이럴 때 사용가능하다.
// BigInt(num)을 하면 숫자가 BigInt로 변환되는데,
// 이때 숫자는 십진수든, 이진수든 16진수든 상관 없다.
// 이진수는 0b, 16진수는 0x가 앞에 붙어있으면 된다.
// e.g. BigInt("0b10101"), BigInt("0o123"), BigInt("  123  ")
//      BigInt("123"), BigInt(123) - string형태의 숫자여도 가능하다

// toString()을 숫자에 사용할 때, 괄호 안에 몇진수인지 넣으면
// 해당 진법의 숫자가 된다.

const addBinary = (a, b) => {
  return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
}