import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  side = 'bottom',
  align = 'center',
  open,
  onOpenChange,
}) => {
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        side={side}
        align={align}
        className="z-1000 rounded-sm bg-[#0B0E11] border border-[#1C212B] shadow-xl p-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        {content}
        <PopoverPrimitive.Arrow className="fill-[#0B0E11]" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};
