// We're also asking people to submit a quick code sample for us to review. We're
// after an ES5 Javascript class for a library which allows people to find book
// details by ISBN number and search for books by their title. Please add comments/thoughts
// about any limitations your implementations yours had and why you chose to do
// things a certain way. This shouldn't take longer than 15 minutes.

class Library {
  constructor(books){
    this.books = {};
    books.forEach(book => { this.books[book.isbn] = book; });
    // a limitation here is that if there are duplicated isbns you'll overwrite,
    // it also requires a lengthy initialization if the array of books is very large
    // what we get back is constant lookup time.
  }

  findByISBN(isbn){
    return this.books[isbn];
  }

  findByTitle(titleToFind){
    const books = this.justBooks();
    const results = books.filter(function(book) {
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

  justBooks(){
    return Object.values(this.books);
  }

}

class Book {
  constructor(details){
    // in reality we'd want some check here to ensure we're getting a valid isbn
    // though that could also happen on the database level and then feed that
    // error back to the user
    this.title = details.title;
    this.isbn = details.isbn;
    this.description = details.description;
    this.genre = details.genre;
    this.author = details.author;
  }
}

book = new Book({title: "Huck Finn", isbn: 12873278, description: "A Story", genre: "Fiction", author: "Mark Twain"});
bookOne = new Book({ title: "A Tale of Two Cities", isbn: 283828, description: "Another Story", genre: "Romance", author: "Charles Dickens"});
lib = new Library([book, bookOne]);
lib.findByISBN(283828);
lib.findByISBN(12873278);
lib.findByTitle("Huck Finn");
