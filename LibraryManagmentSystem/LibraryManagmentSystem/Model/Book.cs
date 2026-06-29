namespace LibraryManagmentSystem.Model
{
    public class Book
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public string AuthorName { get; set; }
        public string Isbn { get; set; }
        public int PublishedYear { get; set; }
    }
}