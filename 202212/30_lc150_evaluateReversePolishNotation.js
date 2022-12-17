// LeetCode 150 Evaluate Reverse Polish Notation

const evalRPN = (tokens) => {
  const stack = [];
  const N = tokens.length;

  const calculate = (operator, a, b) => {
    if (operator === '+') {
      return a + b;
    }
    if (operator === '-') {
      return a - b;
    }
    if (operator === '*') {
      return a * b;
    }
    if (operator === '/') {
      return Math.trunc(a / b);
    }
  };

  for (let i = 0; i < N; i++) {
    if (['+', '-', '*', '/'].includes(tokens[i])) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(calculate(tokens[i], a, b));
    } else {
      stack.push(Number(tokens[i]));
    }
  }
  return stack[0];
};

// 신기한 풀이 발견
// operators를 object화해서 함수를 꺼내 쓰고
// 그게 아닌 경우에는 tokens를 pop해서 가져다 쓰다니..

const operators = {
  '+'(a, b) {
    return b + a;
  },
  '-'(a, b) {
    return b - a;
  },
  '*'(a, b) {
    return b * a;
  },
  '/'(a, b) {
    return parseInt(b / a); // trunc 대신 parseInt도 가능
  },
};

const evalRPN2 = (tokens) => {
  const x = tokens.pop();

  if (x in operators) {
    return operators[x](evalRPN2(tokens), evalRPN2(tokens));
  }
  return parseInt(x);
};
