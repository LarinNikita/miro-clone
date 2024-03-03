'use client';

import { Link2, Pencil, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';

import { useRenameModal } from '@/store/use-rename-modal';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ConfirmModal } from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps['side'];
    sideOffset?: DropdownMenuContentProps['sideOffset'];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title,
}: ActionsProps) => {
    const { onOpen } = useRenameModal();
    const { mutate, pending } = useApiMutation(api.board.remove);

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success('Link copied'))
            .catch(() => toast.error('Failed to copy link'));
    };

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success('Board deleted'))
            .catch(() => toast.error('Failed to delete board'));
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={e => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    onClick={onCopyLink}
                    className="cursor-pointer p-3"
                >
                    <Link2 className="mr-2 h-4 w-4" />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen(id, title)}
                    className="cursor-pointer p-3"
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete the board and all of its contents."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                        className="w-full cursor-pointer justify-start p-3 text-sm font-normal"
                        variant="ghost"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};