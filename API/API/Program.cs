using System.Linq.Expressions;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

//Problema de cors
builder.Services.AddCors(
    options =>
        options.AddPolicy("Acesso Total",
            configs => configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod())
);

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    //Implementar a alteração do status da tarefa
});

// PATCH: /api/tarefa/alterar/{id}
app.MapPatch("/api/tarefa/alterar/{tarefaId}", ([FromRoute] string tarefaId,
    [FromServices] AppDataContext ctx) =>
{
    
    Console.WriteLine(tarefaId);

    var tarefa = ctx.Tarefas.Find(tarefaId);
    if (tarefa is null)
        return Results.NotFound("Tarefa não encontrada");


    if(tarefa.Status.Equals("Não iniciada") ){
        tarefa.Status = "Em andamento";
    }else if (tarefa.Status.Equals("Em andamento")){
        tarefa.Status = "Concluida";
    }else if (tarefa.Status.Equals("Concluida")){
        tarefa.Status = "Concluida";
    }else {
        tarefa.Status = "Não iniciada";
    }
    
    Console.WriteLine("TEste");

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();
    return Results.Ok(tarefa);
});


//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefa/concluidas", ([FromServices] AppDataContext ctx) =>
    ctx.Tarefas.Where(t => t.Status.Equals("Concluida")).ToList());

//GET: http://localhost:5273/tarefas/naoconcluidas
app.MapGet("/api/tarefa/naoconcluidas", ([FromServices] AppDataContext ctx) =>
    ctx.Tarefas.Where(t => t.Status.Equals("Não iniciada")).ToList());

    

//Problema de cors
app.UseCors("Acesso Total");

app.Run();
