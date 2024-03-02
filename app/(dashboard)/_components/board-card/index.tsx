'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';

import { Overlay } from './overlay';
import { Footer } from './footer';
import { Skeleton } from '@/components/ui/skeleton';

interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number;
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite,
}: BoardCardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId === authorId ? 'You' : authorName;
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });

    return (
        <Link href={`/board/${id}`}>
            <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-fill"
                    />
                    <Overlay />
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => {}}
                    disabled={false}
                />
            </div>
        </Link>
    );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/127] overflow-hidden rounded-lg">
            <Skeleton className="h-full w-full" />
        </div>
    );
};
