'use client';

import { Link2, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
                    onClick={onDelete}
                    className="cursor-pointer p-3"
                >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
