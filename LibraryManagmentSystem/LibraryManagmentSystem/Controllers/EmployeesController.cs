using Microsoft.AspNetCore.Mvc;
using LibraryManagmentSystem.Data;
using LibraryManagmentSystem.Model;
using System.Linq;

namespace LibraryManagmentSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly LibraryContext _context;

        public EmployeesController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employees = _context.Employees.ToList();
            return Ok(employees);
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpGet("search/{name}")]
        public IActionResult SearchEmployees(string name)
        {
            var employees = _context.Employees.Where(e => e.FullName.Contains(name)).ToList();
            return Ok(employees);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Employee loginDetails)
        {
            var employee = _context.Employees.FirstOrDefault(e => e.Username == loginDetails.Username && e.Password == loginDetails.Password);
            if (employee == null) return Unauthorized();
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.EmployeeId }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId) return BadRequest();

            _context.Employees.Update(employee);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employees.Find(id);
            if (employee == null) return NotFound();

            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
