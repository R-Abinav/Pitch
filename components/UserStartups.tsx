import { client } from '@/sanity/lib/client'
import { AUTHOR_STARTUPS } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupTypeCard } from './StartupCard';

const UserStartups = async ({ id }: { id: string}) => {
    const startups = await client.fetch(AUTHOR_STARTUPS, {id});

    return (
        <>
            {startups.length > 0 ? startups.map((startup: StartupTypeCard) => (
                <StartupCard 
                    key={startup._id}
                    post={startup}
                />
            )) : 
                <p className='no-result'>
                    No Startups Yet!
                </p>
            }
        </>
    )
}

export default UserStartups