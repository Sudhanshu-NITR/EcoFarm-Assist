// src/components/ui/sonner.tsx

"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      expand={false}
      richColors={false}
      closeButton={true}
      duration={4000}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-slate-800/95 group-[.toaster]:backdrop-blur-lg group-[.toaster]:text-slate-100 group-[.toaster]:border-slate-600/50 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:font-medium',
          description: 'group-[.toast]:text-slate-300/80 group-[.toast]:text-sm',
          actionButton:
            'group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:hover:bg-blue-700 group-[.toast]:rounded-lg group-[.toast]:font-medium',
          cancelButton:
            'group-[.toast]:bg-slate-700/50 group-[.toast]:text-slate-300 group-[.toast]:hover:bg-slate-600/50 group-[.toast]:rounded-lg',
          closeButton:
            'group-[.toast]:bg-white/10 group-[.toast]:text-slate-300 group-[.toast]:hover:bg-white/20 group-[.toast]:hover:text-white group-[.toast]:border-0 group-[.toast]:rounded-md',
          error: 
            'group-[.toast]:bg-red-950/30 group-[.toast]:border-red-500/60 group-[.toast]:shadow-red-500/30 group-[.toast]:shadow-xl group-[.toast]:[&>svg]:text-red-400 group-[.toast]:text-red-100',
          success: 
            'group-[.toast]:bg-green-950/30 group-[.toast]:border-green-500/60 group-[.toast]:shadow-green-500/30 group-[.toast]:shadow-xl group-[.toast]:[&>svg]:text-green-400 group-[.toast]:text-green-100',
          warning: 
            'group-[.toast]:bg-yellow-950/30 group-[.toast]:border-yellow-500/60 group-[.toast]:shadow-yellow-500/30 group-[.toast]:shadow-xl group-[.toast]:[&>svg]:text-yellow-400 group-[.toast]:text-yellow-100',
          info: 
            'group-[.toast]:bg-blue-950/30 group-[.toast]:border-blue-500/60 group-[.toast]:shadow-blue-500/30 group-[.toast]:shadow-xl group-[.toast]:[&>svg]:text-blue-400 group-[.toast]:text-blue-100',
          loading:
            'group-[.toast]:border-slate-500/40 group-[.toast]:[&>svg]:text-slate-400',
        },
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(71, 85, 105, 0.5)',
          borderRadius: '12px',
          color: '#f1f5f9',
          fontSize: '14px',
          fontWeight: '500',
          padding: '16px 20px',
          minWidth: '320px',
          maxWidth: '420px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        }
      }}
      {...props}
    />
  )
}

export { Toaster }