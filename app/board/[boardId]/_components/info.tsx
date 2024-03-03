'use client';

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

interface InfoProps {
    boardId: string;
}

export const Info = ({ boardId }: InfoProps) => {
    const data = useQuery(api.board.get, {
        id: boardId as Id<'boards'>,
    });

    return (
        <div className="absolute left-2 top-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md"></div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute left-2 top-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
    );
};
