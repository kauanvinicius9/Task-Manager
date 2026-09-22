"use client";

import { Priority } from "@/lib/types";

interface PriorityBadgeProps {
    priority: Priority:
}

const priorityMap: Record<Priority, { label: string; className: string}> = {
    low: { label: "Baixa", className: "bg-[#e2f5e7] text-[#5ebd82]"},
    medium: { label: "Média", className: "bg-[#ffefd1] text-[#cda600]"},
    high: { label: "Alta", className: "bg-[#ffecec] text-[#ff8787]"},
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const config = priorityMap[priority] || priorityMap.medium;

    return (
        <span className={`inline-block px-2 py-0.5 text-xs font-normal ${config.className}`}>
            {config.label}
        </span>
    );
}