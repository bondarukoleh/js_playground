###Lexicographic comparison
Lexicographic comparison occurs when both operands are strings, and involves the
character-by-character comparison of each string. \
Therefore, `banana` would be lexicographically greater than apple. \
JavaScript uses UTF-16 to encode strings and therefore each codeunit is a 16-bit integer. The UTF-16 codeunits
from 65 (U+0041) to 122 (U+007A) are as follows: \
**ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz** \
Those characters appearing later are represented by larger UTF-16 integers. To compare any two given
codeunits, JavaScript will simply compare their integer values. \
For the case of comparing B to A, this might look something like this:
const intA = 'A'.charCodeAt(0); // => 65
const intB = 'B'.charCodeAt(0); // => 66
intB > intA; // => true

Every character in each operand string must be compared. To do this, JavaScript will go
codeunit-by-codeunit. At each index of each string, if codeunits differ, the larger codeunit
will be considered greater \
And if one operand is equal to the prefix of the other, then it will always be considered less
than, as shown here:
'coff' < 'coffee';

Rest characters also have unicode
'ไก่' < 'ไข่'; // => true ("chicken" comes before "egg") \
'ก'.charCodeAt(0); // => 3585 \
'ข'.charCodeAt(0); // => 3586 \
