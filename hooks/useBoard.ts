"use client";

import { useCallback, useEffect, useState } from "react";
import { BoardState, ColumnId, Initial_Board } from "@/lib/types";
import { Priority } from "@/lib/types";

const Storage_Key = "task-manager:v1";

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2);

export function useBoard() {
  const [board, setBoard] = useState<BoardState>(Initial_Board);
  const [ready, setReady] = useState(false);

  // Salvamento de tarefas no LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(Storage_Key);
      if (saved) setBoard(JSON.parse(saved) as BoardState);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(Storage_Key, JSON.stringify(board));
    } catch {}
    setReady(true);
 }, []);
 
 useEffect(() => {
  if (!ready) return;

  try {
    localStorage.setItem(Storage_Key, JSON.stringify(board));
  } catch {}
 }, [board, ready]);

  const addTask = useCallback((columnId: ColumnId, title: string, priority: Priority) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      priority: priority || "medium",
    };

    setBoard((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask ],
    }));
  }, []);

  // Atualizar tarefas
  const updateTask = useCallback((id: string, title: string, priority?: Priority) => {
    setBoard((prev) => {
      const next = { ...prev };
      (Object.keys(next) as ColumnId[]).forEach((col) => { next[col] = next[col].map((t) => (t.id === id ? 
                    { ...t, title, priority: priority !== undefined ? priority  : t.priority} : t)) });
      return next;
    });
  }, []);

  // Remover tarefas
  const removeTask = useCallback((id: string) => {
    setBoard((prev) => {
      const next = { ...prev };
      (Object.keys(next) as ColumnId[]).forEach((col) => { next[col] = next[col].filter((t) => t.id !== id) });
      return next;
    });
  }, []);

  // Mover tarefas
  const moveTask = useCallback(
    (id: string, to: ColumnId, beforeId?: string) => {

      if (id === beforeId) return;
      setBoard((prev) => {
        const next: BoardState = { todo: [...prev.todo], doing: [...prev.doing], done: [...prev.done]};

        let moved;

        for (const col of Object.keys(next) as ColumnId[]) {
          const i = next[col].findIndex((t) => t.id === id);
          if (i > -1) {
            [moved] = next[col].splice(i, 1);
            break;
          }
        }

        if (!moved) return prev;

        const target = next[to];
        const at = beforeId ? target.findIndex((t) => t.id === beforeId) : -1;
        
        if (at === -1) target.push(moved);
        
        else target.splice(at, 0, moved);
        return next;
      });
    },
    [],
  );

  // Limpeza de tarefas concluídas
  const clearDone = useCallback(() => {
    setBoard((prev) => ({ ...prev, done: [] }));
  }, []);

  return { board, ready, addTask, updateTask, removeTask, moveTask, clearDone };
}
