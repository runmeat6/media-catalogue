// there were thoughts of using URL for file manipulation,
// but it appeared other modules would still be needed,
// so this line of attack was abandoned
// window.URL = window.URL || window.webkitURL;

// CONSTANTS and VARIABLES

// text constants (first since later constants and variables may depend)
//const carriageReturnText = String.fromCharCode(13); // not used
//const newlineText = String.fromCharCode(10);
const copyText = 'Copy';
const editText = 'Edit';
const deleteText = 'Delete';
const newlineText = "\n";
const entryModeButtonText = 'Submit Title';
const nonBreakingSpaceText = '&#160;';
const searchModeButtonText = 'Start New Entry';
// constants to select DOM elements
const bookDataFile = document.getElementById('bookData').src;
const checkboxGroup = document.getElementById('checkboxGroup');
const clearFormButton = document.getElementById('clear');
const commitButton = document.getElementById('commit');
const enjoymentLevelRadioGroup = document.getElementById('enjoymentLevel');
const entryDiv = document.getElementById('entry');
const insightsOfferedRadioGroup = document.getElementById('insightsOffered');
const hardSlogInput = document.getElementById('hardSlog');
const lackedSubstanceInput = document.getElementById('lackedSubstance');
const likedModeratelyInput = document.getElementById('likedModerately');
const loanedInput = document.getElementById('loaned');
const newOrSubmitButton = document.getElementById('new_or_submit');
const outputDiv = document.getElementById('output');
const ownInput = document.getElementById('own');
const pageTurnerInput = document.getElementById('pageTurner');
const primaryButtonHelp = document.getElementById('primary_button_help');
const quiteInfluentialInput = document.getElementById('quiteInfluential');
const readInput = document.getElementById('read');
const readabilityEaseRadioGroup = document.getElementById('readabilityEase');
const secondaryButtonHelp = document.getElementById('secondary_button_help');
const someValueInput = document.getElementById('someValue');
const sufferedThroughInput = document.getElementById('sufferedThrough');
const tertiaryButtonHelp = document.getElementById('tertiary_button_help');
const thoroughlyRelishedInput = document.getElementById('thoroughlyRelished');
const titleHelp = document.getElementById('title_help');
const titleInput = document.getElementById('title');
const variablePacingInput = document.getElementById('variablePacing');
const viewDiv = document.getElementById('view');
const wishlistInput = document.getElementById('wishlist');
// message constants
const noBooksFoundMessage = '<p class="text-center mt-3">No books match that title<p>';
const standardMessage = '<p class="text-center mt-3">Book information will appear here</p>';
// (object) property constants
const bookNumberProperty = 'bookNumber';
const enjoymentLevelProperty = 'enjoymentLevel';
const insightsOfferedProperty = 'insightsOffered';
const loanedProperty = 'loaned';
const ownProperty = 'own';
const readProperty = 'read';
const readabilityEaseProperty = 'readabilityEase';
const titleProperty = 'title';
const wishlistProperty = 'wishlist';
// HTML constants
const buttonGroupBeginHTML = '<form class="form-inline">';
const buttonGroupEndHTML = '</form>';
const copyButtonHTML = '<button type="submit" class="btn btn-primary mr-3 mb-2">' + copyText + '</button>';
const deleteButtonHTML = '<button type="submit" class="btn btn-tertiary mr-3 mb-2">' + deleteText + '</button>';
const editButtonHTML = '<button type="submit" class="btn btn-secondary mr-3 mb-2">' + editText + '</button>';
// help message constants
const copyButtonHelp = '<small class="form-text text-muted ml-5 mb-2">' + copyText + ' makes a new entry based on the existing</small>';
const deleteButtonHelp = '<small class="form-text text-muted ml-5 mb-2">' + deleteText + ' removes the existing entry</small>';
const editButtonHelp = '<small class="form-text text-muted ml-5 mb-2">' + editText + ' allows changes to the existing entry</small>';
const entryModePrimaryButtonHelp = 'saves the' + '<br />' + 'current' + '<br />' + 'entry; does' + '<br />' + 'not leave' + '<br />' + nonBreakingSpaceText;
const entryModeSecondaryButtonHelp = 'discards' + '<br />' + 'unsaved' + '<br />' + 'changes;' + '<br />' + 'restarts' + '<br />' + 'search';
const entryModeTitleHelp = '';
const onlyTertiaryButtonHelp = 'saves all' + '<br />' + 'submissions' + '<br />' + 'to file' + '<br />' + nonBreakingSpaceText + '<br />' + nonBreakingSpaceText;
const searchModePrimaryButtonHelp = 'will' + '<br />' + 'bypass' + '<br />' + 'searching' + '<br />' + nonBreakingSpaceText + '<br />' + nonBreakingSpaceText;
const searchModeSecondaryButtonHelp = 'clears the' + '<br />' + 'entire form' + '<br />' + 'including' + '<br />' + 'the title' + '<br />' + nonBreakingSpaceText;
const searchModeTitleHelp = 'To search for an existing title, use the form fields below';
// global variables
var bookNumberForSubmission;
var copyOfSelectedBook = { };
var disregardTitleLength = false;
var filteredBooks = [ ];
var patternForFilterFunction;
var propertyForFilterFunction;
var previouslySelectedTarget = '';
var selectedTarget = '';
var searchMode = true;



// FUNCTIONS (PROCEDURES/METHODS/ETC.)

// keep books whose properties are selected
function booleanSearch ( book ) {
   return book[propertyForFilterFunction];
}

// clear the form
function clearForm ( ) {
   if ( searchMode ) {
      titleInput.value = '';
      copyOfSelectedBook[titleProperty] = '';
   } else {
      //  keeps the title when leaving submit mode,
      //   but replaces any regular expression
      //   meta-characters with the . meta-character
      //    (titleInput.value is purposely left as is,
      //    which means selecting some elements may
      //    cause the viewDiv to show no matches)
      //  and sets disregardTitleLength for short titles
      //   such as 1984, Dune, Emma, It, Kim, etc.
      if ( titleInput.value != '' ) {
	 copyOfSelectedBook[titleProperty] = titleInput.value.replace ( /[\][}{)(^$\\.?*+|]/g, '.' );
	 disregardTitleLength = true;
      } else {
	 copyOfSelectedBook[titleProperty] = '';
      }
   }
   readInput.checked = false;
   ownInput.checked = false;
   loanedInput.checked = false;
   wishlistInput.checked = false;
   pageTurnerInput.checked = false;
   variablePacingInput.checked = false;
   hardSlogInput.checked = false;
   quiteInfluentialInput.checked = false;
   someValueInput.checked = false;
   lackedSubstanceInput.checked = false;
   thoroughlyRelishedInput.checked = false;
   likedModeratelyInput.checked = false;
   sufferedThroughInput.checked = false;
   copyOfSelectedBook[readProperty] = false;
   copyOfSelectedBook[ownProperty] = false;
   copyOfSelectedBook[loanedProperty] = false;
   copyOfSelectedBook[wishlistProperty] = false;
   copyOfSelectedBook[readabilityEaseProperty] = '';
   copyOfSelectedBook[insightsOfferedProperty] = '';
   copyOfSelectedBook[enjoymentLevelProperty] = '';
   lookForBooksMatching ( copyOfSelectedBook );
// remove the following line in future implementation
   outputDiv.innerHTML = ''; // not part of the normal function
}

// write the books array data to file
function commitToFile ( ) {
   var arrayLength = books.length;
   var bookData;
//   var fileHandle = 'insert appropriate API function here'
   var writeData;
   writeData = 'var = books [';
   for ( var i=0 ; i < arrayLength ; i++ ) {
      bookData = newlineText + '   { ';
      for ( var propertyName in books[i] ) {
	 if ( propertyName !== bookNumberProperty ) {
	    bookData += propertyName + ': ' + books[i][propertyName] + ', ';
	 }
      }
      writeData += bookData.replace ( /, $/, ' },' );
   }
   writeData += newlineText + '];';
   // in lieu of some API function such as: writeToFile ( writeData );
   outputDiv.innerHTML = '<br />Source: ' + bookDataFile + '<br />' + nonBreakingSpaceText + '<br />was intended to be the recipient of this data:<br />' + nonBreakingSpaceText + '<pre>' + writeData + '</pre>';
   console.log ( writeData );
}

//  initialize the working copy book object
function initializeCopyOfSelectedBook ( ) {
   copyOfSelectedBook[readProperty] = false;
   copyOfSelectedBook[ownProperty] = false;
   copyOfSelectedBook[loanedProperty] = false;
   copyOfSelectedBook[wishlistProperty] = false;
   copyOfSelectedBook[readabilityEaseProperty] = '';
   copyOfSelectedBook[insightsOfferedProperty] = '';
   copyOfSelectedBook[enjoymentLevelProperty] = '';
}

// list all matching books
function listAll ( booksArray ) {
   var arrayLength = booksArray.length;
   htmlText = '<p class="text-center mt-3 mb-2">' + arrayLength +' book(s) matched</p>';
   if ( searchMode ) {
      htmlText += copyButtonHelp + editButtonHelp + deleteButtonHelp;
   }
   htmlText += '<ol>';
   for ( var i=0 ; i < arrayLength ; i++ ) {
      htmlText += '<li value=' + booksArray[i][bookNumberProperty] + '>';
      htmlText += makeTheHTMLforOneBook ( booksArray[i] );
      htmlText += '<p>' + nonBreakingSpaceText + '</p></li>';
   }
   print ( htmlText + '</ol>' );
}

// determine whether there is enough information
//  to start a search and if not print a standard message;
//  otherwise, get the results of the filter functions and
//  print those results which may be that none were found
function lookForBooksMatching ( bookToMatch ) {
   // determine whether there is somethingToSearch phase
   var somethingToSearch = false;
   // if the book title is at least five characters long
   //  or an enter keypress was captured (or the Clear Form
   //  button was selected while in submit mode) then automatically
   //  set somethingToSearch as true and reset disregardTitleLength
   //  to false until the next detection; otherwise, determine
   //  whether any other properties have true values in the
   //  case of booleans or non-empty strings in the case of
   //  strings that would make somethingToSearch truly worthwhile
   if ( bookToMatch[titleProperty].length > 4 || disregardTitleLength ) {
      somethingToSearch = true;
      disregardTitleLength = false;
   } else {
      for ( propertyName in bookToMatch ) {
	 propertyForFilterFunction = propertyName;
	 if ( typeof ( bookToMatch[propertyName] ) === 'boolean' ) {
	    if ( bookToMatch[propertyName] ) {
	       somethingToSearch = true;
	       break;
	    }
	 } else if ( typeof ( bookToMatch[propertyName] ) === 'string' ) {
	    if ( bookToMatch[propertyName] !== '' && propertyName !== titleProperty ) {
	       somethingToSearch = true;
	       break;
	    }
	 }
      }
   }
   // if somethingToSearch start filter function phase;
   //  otherwise, print a standardMessage
   if ( somethingToSearch ) {
      var arrayLength;
      // start the filter with a checkbox property if possible;
      //  otherwise start the filter with the title value
      if ( bookToMatch[wishlistProperty] ) {
	 propertyForFilterFunction = wishlistProperty;
	 filteredBooks = books.filter ( booleanSearch );
      } else if ( bookToMatch[loanedProperty] ) {
	 propertyForFilterFunction = loanedProperty;
	 filteredBooks = books.filter ( booleanSearch );
      } else if ( bookToMatch[ownProperty] ) {
	 propertyForFilterFunction = ownProperty;
	 filteredBooks = books.filter ( booleanSearch );
      } else if ( bookToMatch[readProperty] ) {
	 propertyForFilterFunction = readProperty;
	 filteredBooks = books.filter ( booleanSearch );
      } else {
	 propertyForFilterFunction = titleProperty;
	 patternForFilterFunction = bookToMatch[propertyForFilterFunction];
	 filteredBooks = books.filter ( patternSearch );
      }
      // keep building the filteredBooks array
      //  with all the true boolean and non-empty string values
      //  associated with the properties in the bookToMatch
      for ( propertyName in bookToMatch ) {
	 propertyForFilterFunction = propertyName;
	 if ( typeof ( bookToMatch[propertyName] ) === 'boolean' ) {
	    if ( bookToMatch[propertyName] ) {
	       filteredBooks = filteredBooks.filter ( booleanSearch );
	    }
	 } else if ( typeof ( bookToMatch[propertyName] ) === 'string' ) {
	    if ( bookToMatch[propertyName] !== '' ) {
	       patternForFilterFunction = bookToMatch[propertyForFilterFunction];
	       filteredBooks = filteredBooks.filter ( patternSearch );
	    }
	 }
      }
      arrayLength = filteredBooks.length;
      // if no books are in filteredBooks then print noBooksFoundMessage;
      // otherwise, listAll the filteredBooks that match the property settings
      if ( arrayLength === 0 ) {
	 print ( noBooksFoundMessage );
      } else {
	 listAll ( filteredBooks );
      }
   } else {
      print ( standardMessage );
   }
}

// set up the formDiv and viewDiv
//  and set up some global variables
//  namely the books array, wherein book number indices
//   will be added as a property of each book object in it
//  and initialize the working copy book object
function makeSomeInitializations ( ) {
   startSearchMode();
   clearForm();
   print ( standardMessage );
   books.forEach ( updateBookNumbers );
   copyOfSelectedBook[titleProperty] = '';
   initializeCopyOfSelectedBook();
}

// make the HTML to display book information for the viewDiv
function makeTheHTMLforOneBook ( oneBook ) {
   var htmlText = '';
   for ( var propertyName in oneBook ) {
      if ( propertyName === titleProperty ) {
	 htmlText += '<h5>' + oneBook[propertyName] + '</h5>';
	 if ( searchMode ) {
	    htmlText += buttonGroupBeginHTML + copyButtonHTML + editButtonHTML + deleteButtonHTML + buttonGroupEndHTML;
	 }
	 htmlText += '<ul>';
      } else if ( propertyName !== bookNumberProperty && oneBook[propertyName] !== false && oneBook[propertyName] !== '' ) {
	 htmlText += '<li>';
	 if ( oneBook[propertyName] === true ) {
	    htmlText += propertyName.charAt(0).toUpperCase() + propertyName.substr(1).replace(/([^A-Z]*)([A-Z].*)/, '$1 $2');
	 } else {
	    htmlText += oneBook[propertyName].charAt(0).toUpperCase() + oneBook[propertyName].substr(1).replace(/([^A-Z]*)([A-Z].*)/, '$1 $2');
	 }
	 htmlText +='</li>';
      }
   }
   htmlText += '</ul>';
   return htmlText;
}

// search for and keep matching book properties
function patternSearch ( book ) {
   var searchPattern = new RegExp ( patternForFilterFunction, 'i' );
   return searchPattern.exec ( book[propertyForFilterFunction] );
}

// use data from the selected book to populate the form accordingly
function populateForm ( selectedBookNumber ) {
   titleInput.value = books[selectedBookNumber][titleProperty];
   readInput.checked = books[selectedBookNumber][readProperty];
   ownInput.checked = books[selectedBookNumber][ownProperty];
   loanedInput.checked = books[selectedBookNumber][loanedProperty];
   wishlistInput.checked = books[selectedBookNumber][wishlistProperty];
   switch ( books[selectedBookNumber][readabilityEaseProperty] ) {
      case pageTurnerInput.value :
	 pageTurnerInput.checked = true;
	 break;
      case variablePacingInput.value :
	 variablePacingInput.checked = true;
	 break;
      case hardSlogInput.value :
	 hardSlogInput.checked = true;
	 break;
   }
   switch ( books[selectedBookNumber][insightsOfferedProperty] ) {
      case quiteInfluentialInput.value :
	 quiteInfluentialInput.checked = true;
	 break;
      case someValueInput.value :
	 someValueInput.checked = true;
	 break;
      case lackedSubstanceInput.value :
	 lackedSubstanceInput.checked = true;
	 break;
   }
   switch ( books[selectedBookNumber][enjoymentLevelProperty] ) {
      case thoroughlyRelishedInput.value :
	 thoroughlyRelishedInput.checked = true;
	 break;
      case likedModeratelyInput.value :
	 likedModeratelyInput.checked = true;
	 break;
      case sufferedThroughInput.value :
	 sufferedThroughInput.checked = true;
	 break;
   }
}

// update viewDiv with book information
function print ( message ) {
  viewDiv.innerHTML = message;
}

// set parameters according to search mode
function startSearchMode ( ) {
   searchMode = true;
   newOrSubmitButton.innerHTML = searchModeButtonText;
   primaryButtonHelp.innerHTML = searchModePrimaryButtonHelp;
   secondaryButtonHelp.innerHTML = searchModeSecondaryButtonHelp;
   tertiaryButtonHelp.innerHTML = onlyTertiaryButtonHelp;
   titleHelp.innerHTML = searchModeTitleHelp;
}

// set parameters according to submit mode
function startSubmitMode ( ) {
   searchMode = false;
   newOrSubmitButton.innerHTML = entryModeButtonText;
   primaryButtonHelp.innerHTML = entryModePrimaryButtonHelp;
   secondaryButtonHelp.innerHTML = entryModeSecondaryButtonHelp;
   tertiaryButtonHelp.innerHTML = onlyTertiaryButtonHelp;
   titleHelp.innerHTML = entryModeTitleHelp;
}

// add or update the bookNumber property in each book
function updateBookNumbers ( book, index ) {
   book[bookNumberProperty] = index;
}



// LISTENERS

// in the event the clear form button is selected
//  clear entry data and start search mode
clearFormButton.addEventListener ( 'click', ( event ) => {
   event.preventDefault();
   clearForm();
   startSearchMode();
} );

// in the event the commit button is selected
//  open the data file and write the books array to it
commitButton.addEventListener ( 'click', ( event ) => {
   event.preventDefault();
   commitToFile();
} );

// in the event some text on the entry form is selected
//  and searchMode is active
//  then print a message to the book information viewDiv
//   (meant to detect browser usage of dropdowns
//    offering auto-fill options of past entries)
entryDiv.addEventListener ( 'select', ( event ) => {
   copyOfSelectedBook[titleProperty] = titleInput.value;
   if ( searchMode ) {
      lookForBooksMatching ( copyOfSelectedBook );
   } else {
      print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
   }
} );

// in the event a radio button in the Enjoyment Level group
//  is selected, then update that book property
enjoymentLevelRadioGroup.addEventListener ( 'click', ( event ) => {
   if ( typeof ( event.target.value ) !== 'undefined' ) {
      if ( copyOfSelectedBook[enjoymentLevelProperty] === event.target.value ) {
	 thoroughlyRelishedInput.checked = false;
	 likedModeratelyInput.checked = false;
	 sufferedThroughInput.checked = false;
	 copyOfSelectedBook[enjoymentLevelProperty] = '';
      } else {
	 copyOfSelectedBook[enjoymentLevelProperty] = event.target.value;
      }
      // in search mode, update the viewDiv with the change in selection
      //  otherwise, update the viewDiv with the current entry information
      if ( searchMode ) {
	 lookForBooksMatching ( copyOfSelectedBook );
      } else {
	 print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
      }
   }
} );

// in the event a radio button in the Insights Offered group
//  is selected, then update that book property
insightsOfferedRadioGroup.addEventListener ( 'click', ( event ) => {
   if ( typeof ( event.target.value ) !== 'undefined' ) {
      if ( copyOfSelectedBook[insightsOfferedProperty] === event.target.value ) {
	 quiteInfluentialInput.checked = false;
	 someValueInput.checked = false;
	 lackedSubstanceInput.checked = false;
	 copyOfSelectedBook[insightsOfferedProperty] = '';
      } else {
	 copyOfSelectedBook[insightsOfferedProperty] = event.target.value;
      }
      // in search mode, update the viewDiv with the change in selection
      //  otherwise, update the viewDiv with the current entry information
      if ( searchMode ) {
	 lookForBooksMatching ( copyOfSelectedBook );
      } else {
	 print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
      }
   }
} );

// in the event a checkbox is selected,
//  then update that book property
checkboxGroup.addEventListener ( 'click', ( event ) => {
   if ( typeof ( event.target.value ) !== 'undefined' ) {
      // wishlist checked with either loaned or own checked
      //  does not make sense, so whichever box was not checked
      //  to start with should be unchecked and only the newly
      //  checked item should remain checked
      if ( ( loanedInput.checked || ownInput.checked ) && wishlistInput.checked ) {
	 loanedInput.checked = ! copyOfSelectedBook[loanedProperty] && loanedInput.checked;
	 ownInput.checked = ! copyOfSelectedBook[ownProperty] && ownInput.checked;
	 wishlistInput.checked = ! copyOfSelectedBook[wishlistProperty] && wishlistInput.checked;
      }
      // loaned should not be checked unless own is checked,
      //  so if own was checked but now is not then uncheck loaned;
      //  otherwise, if loaned is now checked but was not before
      //  then make certain that own is checked too
      //   (both are based on their partner and could be in the
      //    state to which they are being set already)
      if ( copyOfSelectedBook[ownProperty] && ! ownInput.checked ) {
	 loanedInput.checked = false;
      } else if ( loanedInput.checked && ! copyOfSelectedBook[loanedProperty] ) {
	 ownInput.checked = true;
      }
      ownInput.checked = loanedInput.checked || ownInput.checked;
      // finally, regardless of which was the event.target
      //  simply update all properties with their current states
      copyOfSelectedBook[loanedProperty] = loanedInput.checked;
      copyOfSelectedBook[ownProperty] = ownInput.checked;
      copyOfSelectedBook[readProperty] = readInput.checked;
      copyOfSelectedBook[wishlistProperty] = wishlistInput.checked;
      // in search mode, update the viewDiv with the change in selection
      //  otherwise, update the viewDiv with the current entry information
      if ( searchMode ) {
	 lookForBooksMatching ( copyOfSelectedBook );
      } else {
	 print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
      }
   }
} );

// in the event the button that doubles as new entry and submit is selected
//  then start submit mode if in search mode,
//  because it means the new entry button was selected;
//  otherwise, the submit button was selected,
//  so save entry data
newOrSubmitButton.addEventListener ( 'click', ( event ) => {
   event.preventDefault();
   // if in search mode set the book number to after the last position
   //  and then start submit mode;
   // otherwise, if already in submit mode then save the book
   //  information as long as the title is non-empty
   if ( searchMode ) {
      bookNumberForSubmission = books.length;
      copyOfSelectedBook[bookNumberProperty] = bookNumberForSubmission;
      startSubmitMode();
      print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
   } else if ( titleInput.value !== '' ) {
      var bookToSubmit = Object.assign ( { }, copyOfSelectedBook );
      books.splice ( bookNumberForSubmission, 1, bookToSubmit );
      // the following is to be sure that the copy of the selected book
      //  has the book number property and that it has the correct
      //  bookNumberForSubmission according to where it was spliced,
      //  thus avoiding the need to call the updateBookNumbers function
      books[bookNumberForSubmission][bookNumberProperty] = bookNumberForSubmission;
   }
} );

// in the event a radio button in the Readability Ease group
//  is selected, then update that book property
readabilityEaseRadioGroup.addEventListener ( 'click', ( event ) => {
   if ( typeof ( event.target.value ) !== 'undefined' ) {
      if ( copyOfSelectedBook[readabilityEaseProperty] === event.target.value ) {
	 pageTurnerInput.checked = false;
	 variablePacingInput.checked = false;
	 hardSlogInput.checked = false;
	 copyOfSelectedBook[readabilityEaseProperty] = '';
      } else {
	 copyOfSelectedBook[readabilityEaseProperty] = event.target.value;
      }
      // in search mode, update the viewDiv with the change in selection
      //  otherwise, update the viewDiv with the current entry information
      if ( searchMode ) {
	 lookForBooksMatching ( copyOfSelectedBook );
      } else {
	 print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
      }
   }
} );

// in the event the title input is selected
//  and searchMode is active
//  then print a message to the book information viewDiv
titleInput.addEventListener ( 'click', ( event ) => {
   copyOfSelectedBook[titleProperty] = titleInput.value;
   if ( searchMode ) {
      lookForBooksMatching ( copyOfSelectedBook );
   } else {
      print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
   }
} );

// if the titleInput has focus when the enter key is pressed
//  ignore it for now, because some browsers would refresh
titleInput.addEventListener ( 'keydown', ( event ) => {
   if ( event.keyCode === 13 || event.key === 'Enter' ) {
      event.preventDefault();
   }
} );

// if the titleInput has focus when a pressed key is released
//  and searchMode is active
//  and the key was either the enter key
//  or made the title longer than three characters
//  then print search results to the book information viewDiv
titleInput.addEventListener ( 'keyup', ( event ) => {
   copyOfSelectedBook[titleProperty] = titleInput.value;
   if ( searchMode ) {
      if ( event.keyCode === 13 || event.key === 'Enter' ) {
         disregardTitleLength = true;
      }
      lookForBooksMatching ( copyOfSelectedBook );
   } else {
      print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
   }
} );

// in the event a button in the viewDiv is selected
//  determine whether it is copy, edit, or delete
//  and respond accordingly
viewDiv.addEventListener ( 'click', ( event ) => {
   event.preventDefault();
   // handle copy and edit by making a copy of the selected book
   //  (not just a pointer reference, but an object copy)
   //  setting the book number so that it will be added to the
   //  end of the books array if submitted later for copy;
   //  or keeping the book number the same for edit so that it
   //  can be replaced in the same order if submitted later;
   //  also, populate the form with the selected book and start submit mode;
   // handle delete by removing the book related to its book number from
   //  the books array, update the books with their new book order, and
   //  start the search again so that it no longer appears in the viewDiv
   if ( event.target.innerHTML === copyText || event.target.innerHTML === editText ) {
      bookNumberForSubmission = event.target.parentNode.parentNode.value;
      populateForm ( bookNumberForSubmission );
      copyOfSelectedBook = Object.assign ( { }, books[bookNumberForSubmission] );
      if ( event.target.innerHTML === copyText ) {
	 bookNumberForSubmission = books.length;
      }
      startSubmitMode();
      print ( makeTheHTMLforOneBook ( copyOfSelectedBook ) );
   } else if ( event.target.innerHTML === deleteText ) {
      bookNumberForSubmission = event.target.parentNode.parentNode.value;
      books.splice ( bookNumberForSubmission, 1 );
      books.forEach ( updateBookNumbers );
      lookForBooksMatching ( copyOfSelectedBook );
   }
} );



// START

makeSomeInitializations();
