CREATE DATABASE LibraryManagementSystem;
GO

USE LibraryManagementSystem;
GO

CREATE TABLE Employees (
    EmployeeId INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Username VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Phone VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE Customers (
    CustomerId INT IDENTITY(1,1) PRIMARY KEY,
    FullName VARCHAR(100) NOT NULL,
    Phone VARCHAR(20),
    Email VARCHAR(100)
);

CREATE TABLE Books (
    BookId INT IDENTITY(1,1) PRIMARY KEY,
    Title VARCHAR(200) NOT NULL,
    AuthorName VARCHAR(100) NOT NULL,
    Isbn VARCHAR(50),
    PublishedYear INT
);

CREATE TABLE Loans (
    LoanId INT IDENTITY(1,1) PRIMARY KEY,
    BookId INT NOT NULL FOREIGN KEY REFERENCES Books(BookId),
    CustomerId INT NOT NULL FOREIGN KEY REFERENCES Customers(CustomerId),
    EmployeeId INT NOT NULL FOREIGN KEY REFERENCES Employees(EmployeeId),
    LoanDate DATE NOT NULL,
    ReturnDate DATE NULL,
    IsReturned BIT DEFAULT 0
);
GO

INSERT INTO Employees (FullName, Username, Password, Phone, Email)
VALUES 
('Aisha Ali', 'aisha.admin', 'pass123', '0612345678', 'aisha@library.com'),
('Omar Hassan', 'omar.lib', 'lib456', '0618765432', 'omar@library.com');

INSERT INTO Customers (FullName, Phone, Email)
VALUES 
('Farah Abdi', '0611112222', 'farah.abdi@email.com'),
('Zahra Hussein', '0613334444', 'zahra.h@email.com'),
('Khalid Mohamed', '0615556666', 'khalid.m@email.com');

INSERT INTO Books (Title, AuthorName, Isbn, PublishedYear)
VALUES 
('Clean Code', 'Robert C. Martin', '978-0132350884', 2008),
('The Pragmatic Programmer', 'Andrew Hunt', '978-0135957059', 1999),
('Introduction to Algorithms', 'Thomas H. Cormen', '978-0262033848', 2009);

INSERT INTO Loans (BookId, CustomerId, EmployeeId, LoanDate, ReturnDate, IsReturned)
VALUES 
(1, 1, 1, '2026-06-10', NULL, 0),
(2, 2, 2, '2026-06-12', '2026-06-15', 1),
(3, 3, 1, '2026-06-16', NULL, 0);
GO