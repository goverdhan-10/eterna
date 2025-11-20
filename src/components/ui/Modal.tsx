import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
  description,
}) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-999 bg-black/80 animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-1000 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-sm border border-[#1C212B] bg-[#0B0E11] p-6 shadow-xl animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-1/2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogPrimitive.Title className="text-lg font-semibold text-slate-100">
                {title}
              </DialogPrimitive.Title>
              {description && (
                <DialogPrimitive.Description className="text-sm text-slate-400 mt-1">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>
            <DialogPrimitive.Close className="inline-flex items-center justify-center rounded-sm hover:bg-[#1C212B] transition-colors">
              <X className="h-5 w-5 text-slate-400 hover:text-slate-100 transition-colors" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
