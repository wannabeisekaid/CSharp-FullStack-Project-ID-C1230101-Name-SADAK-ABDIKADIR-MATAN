using System;

namespace LibraryManagmentSystem.Model
{
    public class Loan
    {
        public int LoanId { get; set; }
        public int BookId { get; set; }
        public int CustomerId { get; set; }
        public int EmployeeId { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public bool IsReturned { get; set; }

        public Book? Book { get; set; }
        public Customer? Customer { get; set; }
        public Employee? Employee { get; set; }
    }
}