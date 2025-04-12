import React from 'react';
import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
    const {_createdAt, views, author, _id, description, image, category, title} = post;

    return (
        <li className='startup-card group'>
            <div className='flex-between'>
                <p className='startup_card_date'>
                    {formatDate(_createdAt)}
                </p>

                <div className='flex gap-1.5'>
                    <EyeIcon className='size-5' />
                    <span className='text-16-medium '>{views}</span>
                </div>
            </div>

            <div className='flex-between mt-5 gap-5'>
                <div className='flex-1 gap-1.5'>
                    <Link
                        href={`/user/${author?._id}`}
                    >
                        <p className='text-16-medium line-clamp-1'>{author?.name}</p>  
                    </Link>
                    <Link
                        href={`/startup/${_id}`}
                    >
                        <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
                    </Link>
                </div>

                <Link href={`/user/${author?._id}`}>
                    <Image 
                        src={author?.image!}
                        alt={author?.name!}
                        width={48}
                        height={48}
                        className='rounded-full'
                    />
                </Link>
            </div>

            <Link
                href={`/startup/${_id}`}
            >
                <p className='startup-card_desc'>
                    {description}
                </p>
            </Link>

            <img
                src={image}
                alt='placeholder'
                className='startup-card_img'
            />

            <div className='flex-between gap-3 mt-5'>
                <Link
                    href={`/?query=${category?.toLowerCase()}`}
                >
                    <p className='text-16-medium'>{category}</p>
                </Link>
                <Button className='startup-card_btn'>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>

        </li>
    )
}

export const StartupCardSkeleton = () => (
    <>
        {[0,1,2,3,4,5].map((index: number) => (
            <li key={cn('skeleton', index)}>
                <Skeleton 
                    className='startup-card_skeleton'
                />
            </li>
        ))}
    </>
)

export default StartupCard