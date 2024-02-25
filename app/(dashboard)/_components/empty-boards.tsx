'use client';

import Image from 'next/image';
import { useMutation } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { Button } from '@/components/ui/button';
import { useOrganization } from '@clerk/nextjs';

export const EmptyBoards = () => {
    const { organization } = useOrganization();
    const create = useMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;

        create({
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
                <Button onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
};
