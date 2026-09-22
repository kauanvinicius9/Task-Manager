"use client";

import Image, { StaticImageData } from "next/image";
import icon_alert from "../assets/icon_alert.png";
import icon_check from "../assets/icon_check.png";
import icon_error from "../assets/icon_error.png";
import { ToastProps } from "@/lib/types";

function ToastBase({ message, visible, bgColor, icon, iconAlt }: ToastProps & { bgColor: string; icon: StaticImageData; iconAlt: string }) {
  return (
    <div className={`fixed top-5 right-5 z-[9999] flex min-w-[320px] items-center gap-3 px-5 py-4 ${bgColor} transform transition-all duration-500 ease-in-out ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0 pointer-events-none"}`}>
      <div className="flex h-8 w-8 items-center justify-center shrink-0">
        <Image src={icon} alt={iconAlt} className="h-full w-full object-contain" />
      </div>
      <p className="font-medium text-black">{message}</p>
    </div>
  );
}

// Alerta
export function ToastAlert({ message, visible }: ToastProps) {
  return (
    <ToastBase message={message} visible={visible} bgColor="bg-[#ffdf95]" icon={icon_alert} iconAlt="Aviso"/>
  );
}

// Sucesso
export function ToastSuccess({ message, visible }: ToastProps) {
  return (
    <ToastBase message={message} visible={visible} bgColor="bg-[#b8efc9]" icon={icon_check} iconAlt="Sucesso"/>
  );
}

// Erro
export function ToastError({ message, visible }: ToastProps) {
  return (
    <ToastBase message={message} visible={visible} bgColor="bg-[#ffc6c6]" icon={icon_error} iconAlt="Erro"/>
  );
}