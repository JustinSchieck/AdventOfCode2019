const range = { min: 138241, max: 674034 };

/**
 * rules:
 * value within above range
 * Increase but never decrease - right to left
 * two adjacent digits are the same 22 in 122345
 *
 * Need the number of possible passwords
 */

let password1 = 0;
let passwords2 = 0;
let counter = 0;

const FindNumberOfPasscode = input => {
  const Chars = input
    .toString()
    .split("")
    .map(n => Number(n));

  // Can't decreases
  for (let i = 1; i < Chars.length; i++) {
    if (Chars[i] < Chars[i - 1]) {
      return false;
    }
  }
  // Check for ONLY a single pair
  if (input.toString().match(/(?:^|(.)(?!\1))(\d)\2(?!\2)/)) {
    return true;
  }
  // Check pairs
  for (let i = 1; i < Chars.length; i++) {
    if (Chars[i] === Chars[i - 1]) {
      return true;
    }
  }
};

for (let pass = range.min; pass <= range.max; pass++) {
  if (FindNumberOfPasscode(pass)) password1 += 1;
}

console.log("The number of passcode options: ", password1);
