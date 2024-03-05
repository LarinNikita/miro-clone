'use client';

import { useSelf } from '@/liveblocks.config';

import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
    //TODO: test auth liveblocks working
    const info = useSelf(me => me.info);

    return (
        <main className="relative h-full w-full touch-none bg-neutral-100">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar />
        </main>
    );
};
