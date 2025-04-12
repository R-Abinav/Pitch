"use server"

import { auth } from '@/auth';
import { parseServerActionResponse } from './utils';
import slugify from 'slugify';
import { writeClient } from '@/sanity/lib/write-client';

export const createIdea = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session) return parseServerActionResponse({ error: 'Not signed in', status: 'ERROR' });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    );

    //We have to form a slug -> A unique identifier for that specific startup
    //You can generate randomnly, but there is a package -> Slugify

    const slug = slugify(title as string, { lower: true, strict: true })

    try{
        const startup = {
            title,
            description,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author:{
                _type: 'reference',
                _ref: session?.id
            },
            pitch
        };

        const result = await writeClient.create({_type: 'startup', ...startup});

        return parseServerActionResponse({
            ...result,
            error: '',
            status: 'SUCCESS'
        })
        
    }catch(error){
        console.error(error);
        
        return parseServerActionResponse({ error: JSON.stringify(error), status: 'ERROR'});
    }

}