using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using NoteApp.Core.Entities;
using NoteApp.Core.Interfaces;
using NoteApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Infrastructure.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly AppDbContext _context;
        private readonly ILogger<NoteRepository> _logger;
        public NoteRepository(ILogger<NoteRepository> logger, AppDbContext context) {
            _logger = logger;
            _context = context;
        }
        public async Task<Note> AddAsync(Note note, CancellationToken cancellationToken)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            var note = await _context.Notes.FindAsync(id, cancellationToken);
            if (note == null)
            {
                _logger.LogError("Not found note for deleting");
                return false; // Not Found
            }
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Note deleted");
            return true; // Deleted
        }


        public async Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Get Note by id");
            var noteById = await _context.Notes.FirstOrDefaultAsync(n=>n.Id==id, cancellationToken);
            return noteById;
        }

        public async Task<IEnumerable<Note>> GetAllAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Get All Notes");
            return await _context.Notes.ToListAsync(cancellationToken);
            
        }

        public async Task<bool> UpdateAsync(Note note, CancellationToken cancellationToken)
        {
            // Check if note exist
            var existing = await _context.Notes
                .FirstOrDefaultAsync(n => n.Id == note.Id);

            if (existing == null)
            {
                _logger.LogError("Note does not exist");
                return false; // Not Found
            }
            // Change object
            existing.Title = note.Title;
            existing.Content = note.Content;
            existing.LastUpdatedAt = note.LastUpdatedAt;

            await _context.SaveChangesAsync();
            _logger.LogInformation("Note updated");
            return true;
        }
    }
}
