"use client";

import { useState } from "react";
import { Columns, ColumnId, Task } from "@/lib/types";
import PriorityBadge from "./PriorityBadge";

import Image from "next/image";
import arrow_left from "../assets/arrow_left.png";
import arrow_right from "../assets/arrow_right.png";
import icon_delete from "../assets/icon_delete.png";
import icon_edit from "../assets/icon_edit.png";

interface Props {
  task: Task;
  columnId: ColumnId;
  isDragging: boolean;

  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDropOnCard: (beforeId: string) => void;
  onUpdate: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, to: ColumnId) => void;
}

const iconBtn = "grid h-7 w-7 place-items-center text-muted hover:bg-canvas hover:text-zinc-black";

export default function TaskCard({ task, columnId, isDragging, onDragStart, onDragEnd, onDropOnCard, onUpdate, onDelete, onMove}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [over, setOver] = useState(false);

  const index = Columns.findIndex((c) => c.id === columnId);
  const prev = Columns[index - 1];
  const next = Columns[index + 1];

  const commit = () => {
    const value = draft.trim();

    if (value && value !== task.title) onUpdate(task.id, value);

    else setDraft(task.title);
    setEditing(false);
  };

  return (
    <li className="list-none" onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setOver(true)}} onDragLeave={() => setOver(false)} onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOver(false);
        onDropOnCard(task.id)}}>

      <div className={`h-1 ${over && !isDragging ? "mb-2 bg-doing" : "bg-transparent"}`}/>

      <article draggable={!editing} onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", task.id); onDragStart(task.id)}} onDragEnd={() => { setOver(false); onDragEnd()}}
                     className={`group border-b border-black bg-white p-3 shadow-sm hover:bg-zinc-200 bg-zinc-100 ${editing ? "" : "cursor-grab active:cursor-grabbing"} ${isDragging ? "opacity-40" : ""}`}>

        {!editing && (
          <div className="mb-2 flex items-center justify-between">
            <PriorityBadge priority={task.priority}/>

            <select value={task.priority || "medium"} onChange={(e) => onUpdate(task.id, task.title, e.target.value as Priority)} className="cursor-pointer border-none bg-transparent text-[11px] font-medium text-zinc-500 outline-none hover:text-black">
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
        )}

        {editing ? (
          <textarea rows={2} value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commit();
              }

              if (e.key === "Escape") { setDraft(task.title); setEditing(false)}
            }}

            className="w-full resize-none border border-line p-2 text-sm focus:ouline-none focus:ring-0"/>
        ) : (
          <p className={`break-words text-sm leading-snug ${columnId === "done" ? "text-muted line-through" : ""}`} onDoubleClick={() => setEditing(true)}>
            {task.title}
          </p>
        )}

        {!editing && (
          <div className="mt-2 flex items-center justify-end gap-0.5 md:opacity-0 md:group-hover:opacity-100">
            {prev && (
              <button type="button" className={iconBtn} title={`Mover para ${prev.title}`} aria-label={`Mover para ${prev.title}`} onClick={() => onMove(task.id, prev.id)}>
                <Image src={arrow_left} alt="Esquerda" className="h-5 w-5 object-cover"/>
              </button>
            )}

            {next && (
              <button type="button" className={iconBtn} title={`Mover para ${next.title}`} aria-label={`Mover para ${next.title}`} onClick={() => onMove(task.id, next.id)}>
                <Image src={arrow_right} alt="Direita" className="h-5 w-5 object-cover"/>
              </button>
            )}
            
            <button type="button" className={iconBtn} title="Editar tarefa" aria-label="Editar tarefa" onClick={() => setEditing(true)}>
              <Image src={icon_edit} alt="Editar" className="h-5 w-5 object-cover"/>
            </button>
          
            <button type="button" className={iconBtn} title="Excluir tarefa" aria-label="Excluir tarefa" onClick={() => onDelete(task.id)}>
              <Image src={icon_delete} alt="Deletar" className="h-5 w-5 object-cover"/>
            </button>
          </div>
        )}
      </article>
    </li>
  );
}