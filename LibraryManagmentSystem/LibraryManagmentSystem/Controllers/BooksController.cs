using Microsoft.AspNetCore.Mvc;
using LibraryManagmentSystem.Data;
using LibraryManagmentSystem.Model;
using System;
using System.Linq;

namespace LibraryManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBooks()
        {
            var books = _context.Books.ToList();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBook(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null) return NotFound();
            return Ok(book);
        }

        [HttpGet("search/{title}")]
        public IActionResult SearchBooks(string title)
        {
            var books = _context.Books.Where(b => b.Title.Contains(title)).ToList();
            return Ok(books);
        }

        [HttpPost]
        public IActionResult CreateBook(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Title)) return BadRequest("Title is required.");

            if (string.IsNullOrWhiteSpace(book.AuthorName)) return BadRequest("Author Name is required.");

            if (book.PublishedYear > DateTime.Now.Year) return BadRequest("Published Year cannot be in the future.");

            var duplicateIsbn = _context.Books.FirstOrDefault(b => b.Isbn == book.Isbn);
            if (duplicateIsbn != null) return BadRequest("A book with this ISBN already exists.");

            _context.Books.Add(book);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book book)
        {
            if (id != book.BookId) return BadRequest();

            if (string.IsNullOrWhiteSpace(book.Title)) return BadRequest("Title is required.");

            if (string.IsNullOrWhiteSpace(book.AuthorName)) return BadRequest("Author Name is required.");

            if (book.PublishedYear > DateTime.Now.Year) return BadRequest("Published Year cannot be in the future.");

            _context.Books.Update(book);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _context.Books.Find(id);
            if (book == null) return NotFound();

            _context.Books.Remove(book);
            _context.SaveChanges();
            return NoContent();
        }
    }
}