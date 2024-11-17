'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

export default function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  function handleOpenChange() {
    router.back();
  }

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent className="lg:max-w-screen-lg overflow-y-scroll max-h-screen my-3">
        <ScrollArea>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {children}
          </DialogHeader>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
