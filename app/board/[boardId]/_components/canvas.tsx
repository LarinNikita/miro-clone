'use client';

import React, { useCallback, useState } from 'react';

import {
    useCanRedo,
    useCanUndo,
    useHistory,
    useMutation,
} from '@/liveblocks.config';
import { Camera, CanvasMode, CanvasState } from '@/types/canvas';
import { pointEventToCanvasPoint } from '@/lib/utils';

import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';
import { CursorsPresence } from './cursors-presence';

interface CanvasProps {
    boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera(camera => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY,
        }));
    }, []);

    const onpointerMove = useMutation(
        ({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault();

            const current = pointEventToCanvasPoint(e, camera);

            setMyPresence({ cursor: current });
        },
        [],
    );

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    return (
        <main className="relative h-full w-full touch-none bg-neutral-100">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onpointerMove}
                onPointerLeave={onPointerLeave}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    );
};
