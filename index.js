
var SPATIAL_OPERATORS = {
  "< " : {
    name:"disjoint-standard",
    type:"disjoint",
    mirrored: false
  },
  "<*" : {
    name:"disjoint-mirrored",
    type:"disjoint",
    mirrored: true
  },
  "| " : {
    name:"edge-to-edge-standard",
    type:"edge-to-edge",
    mirrored: false
  },
  "|*" : {
    name:"edge-to-edge-mirrored",
    type:"edge-to-edge",
    mirrored: true
  },
  "= ": {
    name:"equals",
    type:"equals",
    mirrored: true
  },
  "% ": {
    name: "contains-different-bounds-standard",
    type: "contains-different-bounds",
    mirrored: false
  },
  "%*": {
    name: "contains-different-bounds-mirrored",
    type: "contains-different-bounds",
    mirrored: true
  },
  "[ ": {
    name: "contains-shared-begin-standard",
    type: "contains-shared-begin",
    mirrored: false
  },
  "[*": {
    name: "contains-shared-begin-mirrored",
    type: "contains-shared-begin",
    mirrored: true
  },
  "] ": {
    name: "contains-shared-end-standard",
    type: "contains-shared-end",
    mirrored: false
  },
  "]*": {
    name: "contains-shared-end-mirrored",
    type: "contains-shared-end",
    mirrored: true
  },
  "/ ": {
    name: "partial-overlap-standard",
    type: "partial-overlap",
    mirrored: false
  },
  "/*": {
    name: "partial-overlap-mirrored",
    type: "partial-overlap",
    mirrored: true
  }
}

function relate(beginA, endA, beginB, endB){
  if(endA < beginB){
    return "< "
  }
  if(endB < beginA){
    return "<*"
  }
  if(beginA === beginB && endA === endB){
    return "= "
  }
  if(endA === beginB){
    return  "| "
  }
  if(endB === beginA){
    return "|*"
  }
  if(beginA < beginB && endA > endB){
    return "% "
  }
  if(beginA > beginB && endA < endB){
    return "%*"
  }
  if(beginA === beginB && endA > endB){
    return "[ "
  }
  if(beginA === beginB && endA < endB){
    return "[*"
  }
  if(beginA < beginB && endA === endB){
    return "] "
  }
  if(beginA > beginB && endA === endB){
    return "]*"
  }
  if(beginA < beginB && endA < endB){
    return "/ "
  }
  if(beginA > beginB && endA > endB){
    return "/*"
  }
  throw new Error("This should never happen")
}

function relate2D(pointA, heightA, widthA, pointB, heightB, widthB, invertY){
  var xRelation = relate(pointA[0], pointA[0] + widthA, pointB[0], pointB[0] + widthB);
  if(invertY){
    var yRelation = relate((pointA[1] - heightA)*-1, pointA[1] *-1 , (pointB[1] - heightB) *-1, pointB[1] * -1 );
  } else {
    var yRelation = relate(pointA[1] - heightA, pointA[1] , pointB[1] - heightB, pointB[1] );
  }

  return xRelation + yRelation;

}

function categorize(relation){
  for(var i = 0; i < relation.length; i+=2){
    if(relation[i] === "<"){
      return "disjoint"
    }
  }
  for(var i = 0; i < relation.length; i+=2){
    if(relation[i] === "|"){
      return "joint"
    }
  }
  for(var i = 0; i < relation.length; i+=2){
    if(relation[i] === "/"){
      return "partial-overlap"
    }
  }

  for(var i = 1; i < relation.length; i+=2){
    if(relation[i] !== " "){
      break;
    }
    if(i === relation.length - 1){
      return "contained"
    }
  }

  for(var i = 1; i < relation.length; i +=2){
    if(relation[i] !== "*"){
      break;
    }
    if(i === relation.length - 1){
      return "belonging"
    }
  }

  return "partial-overlap";

}

module.exports.relate = relate;
module.exports.relate2D = relate2D;
module.exports.SPATIAL_OPERATORS = SPATIAL_OPERATORS;
module.exports.categorize = categorize
