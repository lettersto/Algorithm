// LeetCode 232. Implement Queue using Stacks

const MyQueue = function(x) {
  this.stack1 = [];
  this.stack2 = [];
  this.front = null;
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x);
  this.front = this.stack1[0];
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function(x) {
  if (!this.stack1.length) {
    return;
  }

  while (this.stack1.length !== 1) {
    this.stack2.push(this.stack1.pop());
  }

  const firstVal = this.stack1.pop();
  while (this.stack2.length > 0) {
    this.stack1.push(this.stack2.pop());
  }

  this.front = this.stack1[0];

  return firstVal;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function(x) {
  return this.front;
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function(x) {
  if (this.stack1.length === 0) {
    return true;
  }
  return false;
};
