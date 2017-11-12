# Media Catalogue
A project whose intention was to make a catalogue of all media. Books were the starting place, because they seemed to have the fewest details. It was envisioned that another database with author, ISBN, publishing details, and the like would be linked, probably via some API, to search by title and allow users to choose the books that most closely matched what they read, owned, or wanted from their wishlists. So far, only the title and a few attributes may be entered. Books may be searched within a local database and copied, edited, and deleted, but the result can be printed only to screen and not written to file since the security of browsers prohibits such an action.
## Getting Started
The files required are index.html, css/custom.css, js/script.js, and js/data.js (the latter of which may be modified as desired). Once the files have been retrieved, simply start the index.html in a browser. While the browser loads index.html, if the various CDN sites are unavailable to fulfill the requests then css/bootstrap.min.css, js/jquery-3.2.1.slim.min.js, js/popper.min.js, and js/bootstrap.min.js have been included as fallback files, so they could potentially be needed and will allow for working offline. The hope is that the layout and usage is constructed logically enough as to be intuitive and that no further explanation is necessary.
## Built With
   * HTML/CSS/JavaScript - as plain Jane as it gets
   * [Bootstrap](http://v4-alpha.getbootstrap.com/)/jQuery/Popper - some Bootstrap functions are dependent upon jQuery and Popper
## Authors
   * **Bryan Alexander**
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
