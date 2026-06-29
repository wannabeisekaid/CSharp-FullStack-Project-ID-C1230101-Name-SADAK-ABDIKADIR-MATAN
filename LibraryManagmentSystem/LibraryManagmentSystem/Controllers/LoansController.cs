using LibraryManagmentSystem.Data;
using LibraryManagmentSystem.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace LibraryManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly LibraryContext _context;

        public LoansController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetLoans()
        {
            var loans = _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Customer)
                .Include(l => l.Employee)
                .ToList();

            return Ok(loans);
        }

        [HttpGet("{id}")]
        public IActionResult GetLoan(int id)
        {
            var loan = _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Customer)
                .Include(l => l.Employee)
                .FirstOrDefault(l => l.LoanId == id);

            if (loan == null) return NotFound("The requested loan does not exist.");
            return Ok(loan);
        }

        [HttpGet("search/{customerId}")]
        public IActionResult SearchLoansByCustomer(int customerId)
        {
            var loans = _context.Loans
                .Include(l => l.Book)
                .Include(l => l.Customer)
                .Include(l => l.Employee)
                .Where(l => l.CustomerId == customerId)
                .ToList();

            return Ok(loans);
        }

        [HttpPost]
        public IActionResult CreateLoan(Loan loan)
        {
            var bookExists = _context.Books.Find(loan.BookId);
            if (bookExists == null) return NotFound("The specified book does not exist.");

            var customerExists = _context.Customers.Find(loan.CustomerId);
            if (customerExists == null) return NotFound("The specified customer does not exist.");

            var employeeExists = _context.Employees.Find(loan.EmployeeId);
            if (employeeExists == null) return NotFound("The specified employee does not exist.");

            var activeLoan = _context.Loans.FirstOrDefault(l => l.BookId == loan.BookId && l.IsReturned == false);
            if (activeLoan != null) return Conflict("This book is already loaned out and has not been returned.");

            loan.LoanDate = DateTime.Now;

            if (loan.ReturnDate.HasValue)
            {
                if (loan.ReturnDate.Value.Date < loan.LoanDate.Date)
                    return BadRequest("Return date cannot be in the past.");

                if (loan.ReturnDate.Value > loan.LoanDate.AddMonths(6))
                    return BadRequest("A book cannot be loaned out for more than 6 months.");
            }

            _context.Loans.Add(loan);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetLoan), new { id = loan.LoanId }, loan);
        }

        [HttpPost("retroactive")]
        public IActionResult CreateRetroactiveLoan(Loan loan)
        {
            var bookExists = _context.Books.Find(loan.BookId);
            if (bookExists == null) return NotFound("The specified book does not exist.");

            var customerExists = _context.Customers.Find(loan.CustomerId);
            if (customerExists == null) return NotFound("The specified customer does not exist.");

            var employeeExists = _context.Employees.Find(loan.EmployeeId);
            if (employeeExists == null) return NotFound("The specified employee does not exist.");

            var activeLoan = _context.Loans.FirstOrDefault(l => l.BookId == loan.BookId && l.IsReturned == false);
            if (activeLoan != null) return Conflict("This book is already loaned out and has not been returned.");

            if (loan.LoanDate > DateTime.Now)
                return BadRequest("Retroactive loan date cannot be in the future.");

            if (loan.ReturnDate.HasValue)
            {
                if (loan.ReturnDate.Value.Date < loan.LoanDate.Date)
                    return BadRequest("Return date cannot be before the loan date.");

                if (loan.ReturnDate.Value > loan.LoanDate.AddMonths(6))
                    return BadRequest("A book cannot be loaned out for more than 6 months.");
            }

            _context.Loans.Add(loan);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetLoan), new { id = loan.LoanId }, loan);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateLoan(int id, Loan loan)
        {
            if (id != loan.LoanId) return BadRequest("The ID in the URL does not match the ID in the payload.");

            var existingLoan = _context.Loans.Find(id);
            if (existingLoan == null) return NotFound("The loan you are trying to update does not exist.");

            if (loan.IsReturned == true && loan.ReturnDate == null)
                return BadRequest("A return date must be provided if the book is marked as returned.");

            if (loan.ReturnDate.HasValue)
            {
                if (loan.ReturnDate.Value.Date < loan.LoanDate.Date)
                    return BadRequest("Return date cannot be before the original loan date.");

                if (loan.ReturnDate.Value > loan.LoanDate.AddMonths(6))
                    return BadRequest("A book cannot be loaned out for more than 6 months.");
            }
            _context.Entry(existingLoan).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
            _context.Loans.Update(loan);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLoan(int id)
        {
            var loan = _context.Loans.Find(id);
            if (loan == null) return NotFound("The loan could not be found.");

            _context.Loans.Remove(loan);
            _context.SaveChanges();
            return NoContent();
        }
    }
}