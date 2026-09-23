"use client";

import { Priority } from "@/lib/types";

interface PriorityBadgeProps {
    priority: Priority
}

const priorityMap: Record<Priority, { label: string; className: string}> = {
    low: { label: "Baixa prioridade", className: "bg-[#e2f5e7] text-[#5ebd82] border-[#5ebd82]"},
    medium: { label: "Média prioridade", className: "bg-[#ffefd1] text-[#cda600] border-[#cda600]"},
    high: { label: "Alta prioridade", className: "bg-[#ffecec] text-[#ff8787] border-[#ff8787]"},
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const config = priorityMap[priority] || priorityMap.medium;

    return (
        <span className={`inline-block px-2 py-[6px] text-xs w-[120px] text-center font-bold border-2 border-current rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
}