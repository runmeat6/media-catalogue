# Media Catalogue
A project whose intention was to provide a means to catalogue any type of media. Books were the starting place, because they seemed to have the fewest details. It was envisioned that another database with author, ISBN, publishing details, and the like would be linked, probably via some API, to search by title and allow users to choose the books that most closely matched what they read, owned, or wanted from their wishlists. Thus far, only the title and a few other values may be entered. Books may be searched within a local database and entered, copied, edited, or deleted, but the result cannot be written to file, only printed to screen, since the security of browsers prohibits such an action.
## Getting Started
The files required are index.html, css/custom.css, js/script.js, and js/data.js (the latter of which may be modified as desired). Once the files have been retrieved, simply start the index.html in a browser. While the browser loads index.html, if the various CDN sites are unavailable to fulfill the requests then css/bootstrap.min.css, js/jquery-3.2.1.slim.min.js, js/popper.min.js, and js/bootstrap.min.js have been included as fallback files, so they could potentially be needed and will allow for working offline. The hope is that the layout and usage is constructed logically enough to be grasped intuitively and that no further explanation is necessary. Nevertheless, a walkthrough of the current state of the program goes something like this:
   * Once index.html and all the other files it calls are loaded, it is in "search mode"
      * Type in the title field to search among the 120 currently entered books (stored in data.js array)
      * Or, select a checkbox indicating the book has been read, is owned, has been loaned, or is on a wishlist
      * Or, select a radiobutton for:
         * how well interest is maintained (readability ease),
         * value of time (insights offered),
         * overall feel (enjoyment level)
   * At any time, clear the form with clear form, or get a print of the current books array with commit
   * Commit results are shown at the bottom of the page in an ad hoc (an unintentional and discounted pane)
   * Only two panes were originally intended, one for the form and one for viewing the search results or current book
   * Search results may be on the right or towards the bottom in the middle depending upon screen size detected
   * In "submit mode" this view pane gets updated with the form information
   * Start a new entry in "search mode" or select to copy, edit, or delete an entry from the search results
   * Selecting start new entry, copy, or edit, information displays in both view and form panes and "submit mode" begins
   * Submit will save any changes to an edit, or make a new book with start new entry or copy, provided title is not empty
   * Changes can continue to be made and submitted again until cleared - submit will always work on the edit or new entry
   * Clearing from "submit mode" will not clear the title, so that users can verify the changes have been submitted
   * Clearing again while in "search mode" will clear the entire form, including the title
## Built With
   * HTML/CSS/JavaScript - as plain Jane as it gets
   * [Bootstrap](http://v4-alpha.getbootstrap.com/)/jQuery/Popper - some Bootstrap functions are dependent upon jQuery and Popper
## Authors
   * **Bryan Alexander**
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
