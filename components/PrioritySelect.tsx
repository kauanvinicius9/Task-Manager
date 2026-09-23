"use client";

import { useState, useRef, useEffect } from "react";
import { Priority } from "@/lib/types";
import arrow_down from "../assets/arrow_down.png";
import Image from "next/image";

interface Props {
  value: Priority;
  onChange: (value: Priority) => void;
}

const priorities: { value: Priority; label: string }[] = [
  { value: "low", label: "Baixa" },
  { value: "medium", label: "Média" },
  { value: "high", label: "Alta" },
];

export default function PrioritySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = priorities.find((p) => p.value === value) || priorities[1];

  // Dropdown personalizado, sem precisar usar seleção nativa
  useEffect(() => {const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-xs" ref={containerRef}>
      <button type="button" onClick={() => setOpen(!open)} className="flex w-[100px] items-center justify-between border-b border-black bg-white px-2 py-1.5 text-zinc-700 shadow-sm">
          {selected.label}
        <Image src={arrow_down} alt="Seta para baixo" className="w-5 h-5" />
      </button>

      {/* Dropdown aberto */}
      {open && (
        <ul className="absolute left-0 top-full z-50 mt-1 w-full border border-zinc-200 bg-white py-1 shadow-md">
          {priorities.map((priority) => (
            <li key={priority.value} onClick={() => {
                    onChange(priority.value);
                    setOpen(false);
              }}
              className={`flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-zinc-100 ${value === priority.value ? "bg-zinc-50" : ""}`}>
              <span className={value === priority.value ? "text-sky-600" : "text-zinc-700"}>{priority.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}