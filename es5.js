"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Library = function () {
  function Library(books) {
    var _this = this;

    _classCallCheck(this, Library);

    this.books = {};
    books.forEach(function (book) {
      _this.books[book.isbn] = book;
    });
    // a limitation here is that if there are duplicated isbns you'll overwrite,
    // it also requires a lengthy initialization if the array of books is very large
    // what we get back is constant lookup time.
  }

  _createClass(Library, [{
    key: "findByISBN",
    value: function findByISBN(isbn) {
      return this.books[isbn];
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(titleToFind) {
      var books = this.justBooks();
      var results = books.filter(function (book) {
        // this could be implemented better in more time - right now we are looking
        // at all books. If we only searched from the beginning of strings as in
        // "A" would match up to "A Tale of Two Cities" then we could look at a
        // prefix tree as a solution. This would take longer to build but result
        // in faster lookups. It isn't as versatile in terms of search capability
        // we would also want to change this to account for casing
        return book.title.includes(titleToFind);
      });
      return results;
    }
  }, {
    key: "justBooks",
    value: function justBooks() {
      return Object.values(this.books);
    }
  }]);

  return Library;
}();

var Book = function Book(details) {
  _classCallCheck(this, Book);

  // in reality we'd want some check here to ensure we're getting a valid isbn
  // though that could also happen on the database level and then feed that
  // error back to the user
  this.title = details.title;
  this.isbn = details.isbn;
  this.description = details.description;
  this.genre = details.genre;
  this.author = details.author;
};
