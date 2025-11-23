using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Infrastructure.Repositories
{
    using Microsoft.Extensions.Logging;
    using NoteApp.Core.Entities;
    using NoteApp.Core.Interfaces;
    using System.Collections.Concurrent;

    public class InMemoryNoteRepository : INoteRepository
    {
        private readonly ILogger<InMemoryNoteRepository> _logger;
        private readonly ConcurrentDictionary<Guid, Note> _notes = new();

        public InMemoryNoteRepository(ILogger<InMemoryNoteRepository> logger)
        {
            _logger = logger;
        }

        public Task<IEnumerable<Note>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Fetching all notes...");

            var notes = _notes.Values.ToList();

            _logger.LogInformation("Fetched {Count} notes", notes.Count);

            return Task.FromResult<IEnumerable<Note>>(notes);
        }

        public Task<Note?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Fetching note by Id: {NoteId}", id);

            _notes.TryGetValue(id, out var note);

            if (note == null)
            {
                _logger.LogWarning("Note with Id {NoteId} not found", id);
            }
            else
            {
                _logger.LogInformation("Note with Id {NoteId} fetched successfully", id);
            }

            return Task.FromResult(note);
        }

        public Task<Note> AddAsync(Note note, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Attempting to add a new note...");

            var exists = _notes.Values.Any(n => n.Content == note.Content);

            if (exists)
            {
                _logger.LogWarning(
                    "Failed to add note: a note with identical content already exists. Content: {Content}",
                    note.Content
                );
                throw new InvalidOperationException("A note with the same content already exists.");
            }

            _notes[note.Id] = note;

            _logger.LogInformation("Note successfully added with Id: {NoteId}", note.Id);

            return Task.FromResult(note);
        }

        public Task<bool> UpdateAsync(Note note, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Attempting to update note with Id: {NoteId}", note.Id);

            if (!_notes.TryGetValue(note.Id, out var existing))
            {
                _logger.LogWarning("Update failed: note with Id {NoteId} not found", note.Id);
                return Task.FromResult(false);
            }

            var duplicateContentExists = _notes.Values
                .Any(n => n.Content == note.Content && n.Id != note.Id);

            if (duplicateContentExists)
            {
                _logger.LogWarning(
                    "Update failed: another note with the same content already exists. Content: {Content}",
                    note.Content
                );
                return Task.FromResult(false);
            }

            existing.Title = note.Title;
            existing.Content = note.Content;
            existing.LastUpdatedAt = DateTime.UtcNow;

            _logger.LogInformation("Note with Id {NoteId} successfully updated", note.Id);

            return Task.FromResult(true);
        }

        public Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            _logger.LogInformation("Attempting to delete note with Id: {NoteId}", id);

            if (!_notes.TryGetValue(id, out var note))
            {
                _logger.LogWarning("Delete failed: note with Id {NoteId} not found", id);
                return Task.FromResult(false);
            }

            var removed = _notes.TryRemove(id, out _);

            if (removed)
            {
                _logger.LogInformation("Note with Id {NoteId} successfully deleted", id);
            }

            return Task.FromResult(removed);
        }
    }

}
