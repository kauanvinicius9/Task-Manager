"use client";

import { useState } from "react";
import { ColumnConfig, Priority, Task } from "@/lib/types";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";

// Funções em uso
interface Props {
  column: ColumnConfig;
  tasks: Task[];
  draggingId: string | null;

  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropTask: (beforeId?: string) => void;
  onAdd: (title: string, priority: Priority) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, to: ColumnConfig["id"]) => void;
}

export default function Column({ column, tasks, draggingId, onDragStart, onDragEnd, onDropTask, onAdd, onUpdate, onDelete, onMove}: Props) {
  const [over, setOver] = useState(false);

  return (
    // Sessão dos cards
    <section aria-label={column.title} onDragOver={(e) => { e.preventDefault();  setOver(true)}} 
                      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(false) }}
                      onDrop={(e) => { e.preventDefault(); setOver(false); onDropTask() }}
                      className={`flex flex-col border border-line border-t-[6px] ${column.border} p-3 ${over ? "bg-white/90" : "bg-white/50"}`}>

      <header className="mb-3 flex items-center gap-2 px-1">
        <h2 className="text-base font-semibold">{column.title}</h2>
      </header>

      <ul className="flex min-h-[4.5rem] flex-1 flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} isDragging={draggingId === task.id} onDragStart={onDragStart} 
                              onDragEnd={onDragEnd} onDropOnCard={onDropTask} onUpdate={onUpdate} onDelete={onDelete} onMove={onMove}/>
        ))}

        {/* Em caso de card vazio, sem nenhuma tarefa */}
        {tasks.length === 0 && (
          <li className="list-none border border-dashed border-line px-3 py-6 text-center text-sm text-zinc-400">
            Nenhuma tarefa aqui. Arraste um cartão ou adicione uma nova
          </li>
        )}
      </ul>

      {/* Retorno do card com prioridade */}
      <AddTask onAdd={(title, priority) => onAdd(title, priority)} />
    </section>
  );
}
