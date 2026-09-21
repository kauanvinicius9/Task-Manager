"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function AddTask({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const close = () => {
    setTitle("");
    setOpen(false);
  };

  const submit = () => {
    const value = title.trim();
    if (value) onAdd(value);
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
