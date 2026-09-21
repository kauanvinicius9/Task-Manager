export type ColumnId = "todo" | "doing" | "done";
export type BoardState = Record<ColumnId, Task[]>;

export interface Task {
  id: string;
  title: string;
}

export interface ColumnConfig {
  id: ColumnId;
  title: string;
  border: string;
  badge: string;
}

export const Columns: ColumnConfig[] = [
  {
    id: "todo",
    title: "A fazer",
    border: "border-t-todo",
    badge: "bg-todo/15 text-todo",
  },
  {
    id: "doing",
    title: "Em andamento",
    border: "border-t-doing",
    badge: "bg-doing/15 text-doing",
  },
  {
    id: "done",
    title: "Concluídas",
    border: "border-t-done",
    badge: "bg-done/15 text-done",
  },
];

export const Initial_Board: BoardState = {
  todo: [
    { id: "t1", title: "Revisar o orçamento do mês" },
    { id: "t2", title: "Marcar consulta no dentista" },
  ],
  
  doing: [{ id: "t3", title: "Escrever o relatório trimestral" }],
  done: [{ id: "t4", title: "Enviar a declaração de horas" }],
};
