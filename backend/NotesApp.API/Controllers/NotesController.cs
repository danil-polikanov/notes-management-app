using Microsoft.AspNetCore.Mvc;
using NoteApp.Core.Entities;
using NoteApp.Core.Interfaces;
using NotesApp.API.DTOs;


namespace NotesApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INoteRepository _repository;
        private readonly ILogger<NotesController> _logger;

        public NotesController(INoteRepository repository, ILogger<NotesController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// Get all Notes
        /// </summary>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllAsync()
        {
            _logger.LogInformation("Fetching all notes...");

            var notes = await _repository.GetAllAsync();

            _logger.LogInformation("Returned {Count} notes", notes.Count());

            return Ok(notes);
        }

        /// <summary>
        /// Get a note by id
        /// </summary>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Note>> GetByIdAsync(Guid id)
        {
            _logger.LogInformation("Fetching note with Id: {NoteId}", id);

            var note = await _repository.GetByIdAsync(id);

            if (note == null)
            {
                _logger.LogWarning("Note with Id {NoteId} not found", id);
                return NotFound(new { message = $"Note with ID '{id}' not found" });
            }

            _logger.LogInformation("Note with Id {NoteId} returned successfully", id);
            return Ok(note);
        }

        /// <summary>
        /// Create a new note
        /// </summary>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Note>> CreateAsync([FromBody] CreateNoteDTO dto)
        {
            _logger.LogInformation("Attempting to create a new note...");

            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required" });

            if (dto.Title.Length > 200)
                return BadRequest(new { message = "Title cannot exceed 200 characters" });

            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest(new { message = "Content is required" });

            var note = new Note
            {
                Id = Guid.NewGuid(),
                Title = dto.Title.Trim(),
                Content = dto.Content.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            try
            {
                var created = await _repository.AddAsync(note);

                _logger.LogInformation("Note successfully created with Id: {NoteId}", created.Id);

                return Ok(created);
                
            }
            catch (InvalidOperationException ex)
            {
                _logger.LogWarning("Failed to create note: {Message}", ex.Message);
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Update note
        /// </summary>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateNoteDTO dto)
        {
            _logger.LogInformation("Attempting to update note with Id: {NoteId}", id);

            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required" });

            if (dto.Title.Length > 200)
                return BadRequest(new { message = "Title cannot exceed 200 characters" });

            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest(new { message = "Content is required" });

            var note = new Note
            {
                Id = id,
                Title = dto.Title.Trim(),
                Content = dto.Content.Trim(),
                LastUpdatedAt = DateTime.UtcNow
            };

            var updated = await _repository.UpdateAsync(note);

            if (!updated)
            {
                _logger.LogWarning("Update failed: note with Id {NoteId} not found", id);
                return NotFound(new { message = $"Note with ID '{id}' not found" });
            }

            _logger.LogInformation("Note with Id {NoteId} updated successfully", id);
            return NoContent();
        }

        /// <summary>
        /// Delete note
        /// </summary>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            _logger.LogInformation("Attempting to delete note with Id: {NoteId}", id);

            var deleted = await _repository.DeleteAsync(id);

            if (!deleted)
            {
                _logger.LogWarning("Delete failed: note with Id {NoteId} not found", id);
                return NotFound(new { message = $"Note with ID '{id}' not found" });
            }

            _logger.LogInformation("Note with Id {NoteId} deleted successfully", id);
            return NoContent();
        }
    }

}
