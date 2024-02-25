'use client';

import { Plus } from 'lucide-react';
import { CreateOrganization } from '@clerk/nextjs';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Hint } from '@/components/hint';

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint
                        label="Crate organization"
                        side="right"
                        align="start"
                        sideOffset={18}
                    >
                        <button className="flex h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 transition hover:opacity-100">
                            <Plus className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-[480px] border-none bg-transparent p-0">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};
