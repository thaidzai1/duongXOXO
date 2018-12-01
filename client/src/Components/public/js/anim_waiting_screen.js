// set up text to print, each item in array is new line
var aText = new Array(
"Need to find another oponent.............................................................",
"Please waiting for a little bit.......................................................",
"Yeah!!! Find it.....................!!!",
"Matching.......................................................................!!!",
"I lie to you, hahah!!!!!!!!!!!!!",
":)"
);

var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 20; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

export default function typewriter()
{
  console.log('hello')
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");

 while ( iRow < iIndex ) {
  sContents += aText[iRow++] + '<br />';
 }
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;
  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout(typewriter(), 500);
  }
 } else {
  setTimeout(typewriter(), iSpeed);
 }
}
