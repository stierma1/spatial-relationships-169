var assert = require("assert");
var relate = require("./index").relate;
var relate2D = require("./index").relate2D;
var categorize = require("./index").categorize;

console.log("Tested, Expected")
function assertRelation(relation, expected){
  console.log(relation + ", " + expected)
  assert(relation === expected)
}

`
A - x
B - *
**
**

    xx
    xx
`
var relation = relate(3,4,0,1) + relate(0,1,3,4);
var expected = "<*< "
assertRelation(relation, expected);
var relation = relate2D([0,0], 1,1, [-2,-2], 1,1, true)
assertRelation(relation, expected);


`
xxxxx
xxxxx
 ***
 ***
`

var relation = relate(0,5,1,4) + relate(2,4,0,1);
var expected = "% <*"
assertRelation(relation, expected);


`
 **
x#*
xx
`
var relation = relate(0,1,1,2) + relate(0,1,1,2);
var expected = "| | "
assertRelation(relation, expected);

`
 xx
*#x
**
`
var relation = relate(1,2,0,1) + relate(1,2,0,1);
var expected = "|*|*"
assertRelation(relation, expected);

`
##
##
`
var relation = relate(0,1,0,1) + relate(0,1,0,1);
var expected = "= = "
assertRelation(relation, expected);

`
##
##
xx
`
var relation = relate(0,1,0,1) + relate(0,2,1,2);
var expected = "= ] "
assertRelation(relation, expected);

`
***
*##x
*##x
 xxx
`
var relation = relate(1,3,0,2) + relate(0,3,1,4);
var expected = "/*/ "
assertRelation(relation, expected);

`
##x
##x
xxx
`
var relation = relate(0,2,0,1) + relate(0,2,1,2);
var expected = "[ ] "
assertRelation(relation, expected);

`
x###x
x###x
xxxxx
`
var relation = relate(0,4,1,3) + relate(0,2,1,2);
var expected = "% ] "
assertRelation(relation, expected);

`
xxxxx
x###x
x###x
`
var relation = relate(0,4,1,3) + relate(0,2,0,1);
var expected = "% [ "
assertRelation(relation, expected);

console.log(categorize("= = "))
