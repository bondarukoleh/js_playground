###Bitwise operators
 - Bitwise unsigned right-shift operator: >>>
 - Bitwise left-shift operator: <<
 - Bitwise right-shift operator: >>
 - Bitwise OR: |
 - Bitwise AND: &
 - Bitwise XOR: ^
 - Bitwise NOT: ~ (a unary operator)

All bitwise operators in JavaScript will first coerce their operands (or a singular operand, in
the case of bitwise NOT ~) to a 32-bit integer representation. This means that, internally, a
number such as 250 would be manifested as follows: \
00000000 00000000 00000000 11111010 \
The last eight bits, in this case of 250, contain all of the information regarding the number:
1 1 1 1 1 0 1 0
+ + + + + + + +
| | | | | | | +---> 0 * 001 = 000
| | | | | | +-----> 1 * 002 = 002
| | | | | +-------> 0 * 004 = 000
| | | | +---------> 1 * 008 = 008
| | | +-----------> 1 * 016 = 016
| | +-------------> 1 * 032 = 032
| +---------------> 1 * 064 = 064
+-----------------> 1 * 128 = 128
=================================
SUM = 250

Every bitwise operator available will operate on these bits and derive a new value. A
bitwise AND operation, for example, will yield a bit value of 1 for every pair of bits that are
both on: \
const a = 250; // 11111010 \
const b = 20; // 00010100 \
a & b; // => 16 // 00010000

Bitwise operators should only be utilized when you are carrying out binary mathematics.
Outside of that, any usage of bitwise operators (for example, for side-effects) should be
avoided because it drastically limits the clarity and comprehensibility of our code.
