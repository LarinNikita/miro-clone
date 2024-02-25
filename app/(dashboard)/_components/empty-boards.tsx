'use client';

import Image from 'next/image';
import { useOrganization } from '@clerk/nextjs';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';

import { Button } from '@/components/ui/button';

export const EmptyBoards = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        mutate({
            orgId: organization.id,
            title: 'Untitled',
        });
    };

    return (
        <div className="flex h-full flex-col items-center justify-center">
            <Image src="/note.svg" alt="Empty" height={110} width={110} />
            <h2 className="mt-6 text-2xl font-semibold">
                Create your first board!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
                Start by creating a board for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};
