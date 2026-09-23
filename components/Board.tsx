"use client";

import { useState } from "react";
import { useBoard } from "@/hooks/useBoard";
import { Columns, ColumnId, Priority } from "@/lib/types";
import { ToastAlert, ToastError, ToastSuccess } from "./Toast";
import Column from "./Column";

const wip_limit = 3;
type ToastType = "success" | "alert" | "error";

export default function Board() {
  const { board, ready, addTask, updateTask, removeTask, moveTask, clearDone } = useBoard();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const total = board.todo.length + board.doing.length + board.done.length;
  const done = board.done.length;

  const [toast, setToast] = useState<{ message: string; visible: boolean; type: ToastType }>({
    message: "",
    visible: false,
    type: "success",
  });

  // Exibição do toast (mensagens)
  const showToast = (message: string, type: ToastType) => {
    setToast({ message, visible: true, type});
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  // Mensagem para limite de demandas atingidas
  const handleAddTask = (columnId: ColumnId, title: string, priority: Priority) => {
    if (columnId === "doing" && board.doing.length >= wip_limit) {
      showToast(`Limite de 0${wip_limit} tarefas em andamento atingido`, "alert");
      return;
    }

    try {
      addTask(columnId, title, priority);
      showToast("Tarefa criada com sucesso", "success");
  } catch (error) {
    showToast("Não foi possível criar a tarefa", "error");
  };
}

// Mensagem para movimentação, troca de demanda
const handleMoveTask = (id: string, to: ColumnId, beforeId?: string) => {
    const isAlreadyInDoing = board.doing.some((t) => t.id === id);

    if (to === "doing" && !isAlreadyInDoing && board.doing.length >= wip_limit) {
      showToast(`A coluna 'Em andamento' atingiu o limite de ${wip_limit} tarefas`, "alert");
      return;
    }

    try {
      moveTask(id, to, beforeId);
    } catch (error) {
      showToast("Não foi possível mover a tarefa", "error");
    };
  }

  // Mensagem para atualização de demanda
  const handleUpdateTask = (id: string, title: string, priority?: Priority) => {
    try {
      updateTask(id, title, priority);
      showToast("Tarefa atualizada com sucesso", "success");
    } catch {
      showToast("Não foi possível atualizar a tarefa", "error");
    };
  }
  
  // Mensagem para exclusão de demanda
  const handleDeleteTask = (id: string) => {
    try {
      removeTask(id);
      showToast("Tarefa excluída com sucesso", "success")
    } catch {
      showToast("Não foi possível excluir a tarefa", "error");
    }
  };

  return (
    <>
        {/* Toasts componentizados e personalizados */}
      <ToastSuccess message={toast.message} visible={toast.visible && toast.type === "success"} />
      <ToastAlert message={toast.message} visible={toast.visible && toast.type === "alert"} />
      <ToastError message={toast.message} visible={toast.visible && toast.type === "error"} />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-3xl">
            Task Manager
          </h1>

          {/* Contagem dinâmica de demandas totais concluídas */}
          <p className="mt-1 text-zinc-400">
            {total === 0 ? "Não há tarefas por enquanto" : `0${done} de 0${total} ${total === 1 ? "tarefa concluída" : "tarefas concluídas"}`}
          </p>
        </div>

        {done > 0 && (
          <button type="button" onClick={() => {clearDone(); done ? showToast("Tarefas concluídas limpadas", "success") : showToast("Não foi possível limpar as tarefas concluídas", "error")}} 
                          className="border border-2 border-sky-600 bg-white px-3 py-2 text-sm font-normal hover:bg-sky-100 text-sky-600">
            Limpar concluídas
          </button>
        )}
      </header>

      {ready && (
        <div className="grid items-start gap-4 md:grid-cols-3">
          {Columns.map((column) => (
            <Column key={column.id} column={column} tasks={board[column.id]} draggingId={draggingId} onDragStart={setDraggingId} 
                                        onDragEnd={() => setDraggingId(null)} onDropTask={(beforeId) => {
                if (draggingId) handleMoveTask(draggingId, column.id, beforeId);
                setDraggingId(null);
              }}

              onAdd={(title, priority) => handleAddTask(column.id, title, priority)}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onMove={(id, to) => handleMoveTask(id, to)}/>
          ))}
        </div>
      )}
    </>
  );
}
