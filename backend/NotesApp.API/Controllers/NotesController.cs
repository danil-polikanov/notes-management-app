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
        public NotesController(INoteRepository repository)
        {
            _repository = repository;
        }
        //Add Logger later, mapping, response codes
        // GET: api/<NotesController>
        /// <summary>
        /// Get all Notes
        /// </summary>
        /// <returns>Note list</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Note>>> GetAllAsync()
        {
            var notes = await _repository.GetAllAsync();
            return Ok(notes);
        }
        // GET api/<NotesController>/{id}
        /// <summary>
        /// Take note by id
        /// </summary>
        /// <param name="id">Note id</param>
        /// <returns>Note or NotFound</returns>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Note>> GetByIdAsync(Guid id)
        {
            var note = await _repository.GetByIdAsync(id);
            if (note == null)
                return NotFound(new { message = $"Note with ID '{id}' not found" });
            return Ok(note);
        }

        /// <summary>
        /// Create new note
        /// </summary>
        /// <param name="dto">Dto for create</param>
        /// <returns>Created Dto</returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Note>> CreateAsync([FromBody] CreateNoteDTO dto)
        {
            // Simple validation
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required" });

            if (dto.Title.Length > 200)
                return BadRequest(new { message = "Title cannot exceed 200 characters" });

            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest(new { message = "Content is required" });

            // Create Note
            var note = new Note
            {
                Id = Guid.NewGuid(),
                Title = dto.Title.Trim(),
                Content = dto.Content.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.AddAsync(note);

            return Ok(
                created
            );
        }

        /// <summary>
        /// Update note
        /// </summary>
        /// <param name="id">note Id</param>
        /// <param name="dto">New updated data</param>
        /// <returns>204 Ok, 404 Not Found</returns>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateAsync(Guid id, [FromBody] UpdateNoteDTO dto)
        {
            // Simple update validation
            if (string.IsNullOrWhiteSpace(dto.Title))
                return BadRequest(new { message = "Title is required" });

            if (dto.Title.Length > 200)
                return BadRequest(new { message = "Title cannot exceed 200 characters" });

            if (string.IsNullOrWhiteSpace(dto.Content))
                return BadRequest(new { message = "Content is required" });

            // create object for update
            var note = new Note
            {
                Id = id,
                Title = dto.Title.Trim(),
                Content = dto.Content.Trim(),
                LastUpdatedAt = DateTime.UtcNow
            };

            var updated = await _repository.UpdateAsync(note);

            if (!updated)
                return NotFound(new { message = $"Note with ID '{id}' not found" });

            return NoContent();
        }

        /// <summary>
        /// Delete note
        /// </summary>
        /// <param name="id">Note id</param>
        /// <returns>204 Ok, 404 Not Found</returns>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            var deleted = await _repository.DeleteAsync(id);

            if (!deleted)
                return NotFound(new { message = $"Note with ID '{id}' not found" });

            return NoContent();
        }
    }
}
