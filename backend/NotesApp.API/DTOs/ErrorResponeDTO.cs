namespace NotesApp.API.DTOs
{
    public class ErrorResponeDTO
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string? Details { get; set; }
    }
}
