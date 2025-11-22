using NoteApp.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoteApp.Core.Interfaces
{
    public interface INoteRepository
    {
        Task<IEnumerable<Note>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Note> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
        Task<Note> AddAsync(Note note, CancellationToken cancellationToken = default);
        Task<bool> UpdateAsync(Note note, CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}
