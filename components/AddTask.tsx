"use client";

import { useState } from "react";
import { Priority } from "@/lib/types";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const close = () => { setTitle(""); setPriority("medium"); setOpen(false)};

  const submit = () => {
    const value = title.trim();
    
    if (value) onAdd(value, priority);
    close();
  };

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-3 w-full px-4 py-3 text-center text-sm font-normal text-white hover:bg-sky-700 bg-sky-600">
        Adicionar tarefa
      </button>
    );
  }

  return (
    <div className="mt-3">
      <textarea rows={2} value={title} placeholder="Descreva a tarefa" onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
          if (e.key === "Escape") close();
        }}
        className="focus:outline-none focus:ring-0 w-full resize-none border-b border-black bg-zinc-100 hover:bg-zinc-200 p-3 text-sm shadow-sm placeholder:text-zinc-400"/>

      <div className="flex items-center justify-between border-b border-black bg-zinc-100 px-3 py-2 text-sm shadow-sm">
        <label htmlFor="priority-select" className="text-xs font-medium text-zinc-600">Prioridade</label>
        <select id="priority-select" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="cursor-pointer bg-transparent text-xs font-semibold text-zinc-800 outline-none hover:text-sky-600">
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>

      <div className="mt-2 flex gap-2">
        <button type="button" onClick={submit} className="bg-sky-600 px-3 py-3 text-sm font-normal text-white hover:bg-sky-700 w-full">
          Salvar tarefa
        </button>

        <button type="button" onClick={close} className="px-3 py-1.5 text-sm font-normal text-sky-600 hover:bg-sky-100 border border-2 border-sky-600 w-full">
          Cancelar
        </button>
      </div>
    </div>
  );
}
