// Using Array.from() in various scenarios

// Example 1: Creating an array from an iterable (string)
const str = "Hello";
const charArray = Array.from(str);
console.log("Example 1:", charArray); // Output: ['H', 'e', 'l', 'l', 'o']

// Example 2: Using a mapping function to modify elements
const numbers = [1, 2, 3, 4];
const doubledArray = Array.from(numbers, (num) => num * 2);
console.log("Example 2:", doubledArray); // Output: [2, 4, 6, 8]

// Example 3: Generating an array of numbers from 1 to 5
const generatedArray = Array.from({ length: 5 }, (_, index) => index + 1);
console.log("Example 3:", generatedArray); // Output: [1, 2, 3, 4, 5]

// Example 4: Creating an array of characters from a Set
const charSet = new Set(["a", "b", "c"]);
const charArrayFromSet = Array.from(charSet);
console.log("Example 4:", charArrayFromSet); // Output: ['a', 'b', 'c']

// Example 5: Using Array.from() with a generator function
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}
const generatedArrayFromGenerator = Array.from(generateNumbers());
console.log("Example 5:", generatedArrayFromGenerator); // Output: [1, 2, 3]
