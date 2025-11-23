
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NoteApp.Core.Interfaces;
using NoteApp.Infrastructure.Data;
using NoteApp.Infrastructure.Repositories;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
// I prefer Serilog
var connectionString = builder.Configuration.GetConnectionString("NoteDb");
Log.Logger = new LoggerConfiguration().WriteTo.Console().Enrich.FromLogContext().CreateLogger();
builder.Host.UseSerilog();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddSingleton<INoteRepository, InMemoryNoteRepository>();
//builder.Services.AddScoped<INoteRepository, NoteRepository>();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddCors(options =>
{
    DotNetEnv.Env.Load();
    var url = Environment.GetEnvironmentVariable("ASPNETCORE_URL");
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(url)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
