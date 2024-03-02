'use client';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';

import { useApiMutation } from '@/hooks/use-api-mutation';

import { cn } from '@/lib/utils';

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: 'Untitled',
        })
            .then(id => {
                toast.success('Board created');
                //TODO: redirect to /board/{id}
            })
            .catch(() => toast.error('Failed to create board'));
    };

    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                'col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800',
                (pending || disabled) && 'opacity-75',
            )}
        >
            <div />
            <Plus className="h-12 w-12 stroke-1 text-white" />
            <p className="text-sm font-light text-white">New board</p>
        </button>
    );
};
