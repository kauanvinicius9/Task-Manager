"use client";

import { useState } from "react";
import { useBoard } from "@/hooks/useBoard";
import { Columns } from "@/lib/types";
import Column from "./Column";

export default function Board() {
  const { board, ready, addTask, updateTask, removeTask, moveTask, clearDone } = useBoard();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const total = board.todo.length + board.doing.length + board.done.length;
  const done = board.done.length;

  return (
    <>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-sm font-semibold tracking-tight sm:text-4xl">
            Task Manager
          </h1>

          <p className="mt-1 text-zinc-400">
            {total === 0 ? "Nenhuma tarefa por enquanto" : `${done} de ${total} ${total === 1 ? "tarefa concluída" : "tarefas concluídas"}`}
          </p>
        </div>

        {done > 0 && (
          <button type="button" onClick={clearDone} className="border border-2 border-sky-600 bg-white px-3 py-2 text-sm font-normal hover:bg-sky-100 text-sky-600">
            Limpar concluídas
          </button>
        )}
      </header>

      {ready && (
        <div className="grid items-start gap-4 md:grid-cols-3">
          {Columns.map((column) => (
            <Column key={column.id} column={column} tasks={board[column.id]} draggingId={draggingId} onDragStart={setDraggingId} 
                                        onDragEnd={() => setDraggingId(null)} onDropTask={(beforeId) => {
                if (draggingId) moveTask(draggingId, column.id, beforeId);
                setDraggingId(null);
              }}

              onAdd={(title) => addTask(column.id, title)}
              onUpdate={updateTask}
              onDelete={removeTask}
              onMove={(id, to) => moveTask(id, to)}/>
          ))}
        </div>
      )}
    </>
  );
}
