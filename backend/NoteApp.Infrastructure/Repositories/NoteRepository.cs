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

        public NoteRepository(ILogger<NoteRepository> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<Note> AddAsync(Note note, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Attempting to add a new note...");

            var exists = await _context.Notes
                .AnyAsync(n => n.Content == note.Content, cancellationToken);

            if (exists)
            {
                _logger.LogWarning("Failed to add note: a note with identical content already exists. Content: {Content}", note.Content);
                throw new InvalidOperationException("A note with the same content already exists.");
            }

            await _context.Notes.AddAsync(note, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Note successfully added with Id: {NoteId}", note.Id);

            return note;
        }

        public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Attempting to delete note with Id: {NoteId}", id);

            var note = await _context.Notes.FindAsync([id], cancellationToken);

            if (note == null)
            {
                _logger.LogWarning("Delete failed: note with Id {NoteId} not found", id);
                return false;
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Note with Id {NoteId} successfully deleted", id);

            return true;
        }

        public async Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Fetching note by Id: {NoteId}", id);

            var note = await _context.Notes
                .FirstOrDefaultAsync(n => n.Id == id, cancellationToken);

            if (note == null)
            {
                _logger.LogWarning("Note with Id {NoteId} not found", id);
            }
            else
            {
                _logger.LogInformation("Note with Id {NoteId} fetched successfully", id);
            }

            return note;
        }

        public async Task<IEnumerable<Note>> GetAllAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Fetching all notes...");

            var notes = await _context.Notes.ToListAsync(cancellationToken);

            _logger.LogInformation("Fetched {Count} notes", notes.Count);

            return notes;
        }

        public async Task<bool> UpdateAsync(Note note, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Attempting to update note with Id: {NoteId}", note.Id);

            // Check existence
            var existing = await _context.Notes.FirstOrDefaultAsync(n => n.Id == note.Id, cancellationToken);
            if (existing == null)
            {
                _logger.LogWarning("Update failed: note with Id {NoteId} not found", note.Id);
                return false;
            }

            // Check duplicate content
            var duplicateContentExists = await _context.Notes
                .AnyAsync(n => n.Content == note.Content && n.Id != note.Id, cancellationToken);

            if (duplicateContentExists)
            {
                _logger.LogWarning("Update failed: another note with the same content already exists. Content: {Content}", note.Content);
                return false;
            }

            // Apply changes
            existing.Title = note.Title;
            existing.Content = note.Content;
            existing.LastUpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Note with Id {NoteId} successfully updated", note.Id);

            return true;
        }
    }

}
