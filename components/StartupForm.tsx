'use client';

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { formSchema } from '@/lib/validation';
import { form } from 'sanity/structure';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createIdea } from '@/lib/actions';


const StartupForm = () => {

    const [error, setError] = useState<Record<string,string>>({});
    const [pitch, setPitch] = React.useState("");

    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try{
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            //Validate
            await formSchema.parseAsync(formValues);
            //console.log(formValues);

            const result = await createIdea(prevState, formData, pitch);
            //console.log(result);
            
            if(result.status === 'SUCCESS'){
                toast({
                    title: 'Success',
                    description: 'Your startup pitch has been created!',  
                });

                //Re-route 
                router.push(`/startup/${result._id}`)

            }

            return result;
        }catch(err){
            if(err instanceof z.ZodError){
                const fieldErrors = err.flatten().fieldErrors;

                setError(fieldErrors as unknown as Record<string,string>);
                toast({
                    title: 'Error',
                    description: 'Please check your inputs and try again',
                    variant: 'destructive'
                })

                return { ...prevState, error: 'Validation failed', status: 'ERROR' };
            }
        }
        
        toast({
            title: 'Error',
            description: 'An unexpected error occurred',
            variant: 'destructive'
        })

        return {
            ...prevState,
            error: 'An unexpected error occurred',
            status: 'ERROR'
        }
    }

    // const isPending = false;
    //React's useActionState:
    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error: '',
            status: 'INITIAL'
        }
     );


    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor='title' className='startup-form_label'>
                Title
                </label>
                <Input 
                    id='title'
                    name='title'
                    className='startup-form_input'
                    required
                    placeholder='Startup Title!'
                />

                {error.title && <p className='startup-form_error'> {error.title} </p> }
            </div>
            

            <div>
                <label htmlFor='description' className='startup-form_label'>
                    Description
                </label>
                <Textarea 
                    id='description'
                    name='description'
                    className='startup-form_textarea'
                    required
                    placeholder='Startup Description'
                />
                {error.description && <p className='startup-form_error'> {error.description} </p> }
            </div>
            
            <div>
                <label htmlFor='category' className='startup-form_label'>
                    Category
                </label>
                <Input 
                    id='category'
                    name='category'
                    className='startup-form_input'
                    required
                    placeholder='Startup Category (Education, Tech, Food .....)'
                />

                {error.category && <p className='startup-form_error'> {error.category} </p> }
            </div>

            <div>
                <label htmlFor='link' className='startup-form_label'>
                    Image URL
                </label>
                <Input 
                    id='link'
                    name='link'
                    className='startup-form_input'
                    required
                    placeholder='Startup Image URL'
                />

                {error.link && <p className='startup-form_error'> {error.link} </p> }
            </div>

            <div data-color-mode='light'>
                <label htmlFor='pitch' className='startup-form_label'>
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id="pitch"
                    preview='edit'
                    height={300}
                    style={
                        {
                            borderRadius: 20,
                            overflow: 'hidden'
                        }
                    }
                    textareaProps={{
                        placeholder: "Breifly describe your idea!"
                    }}
                    previewOptions={{
                        disallowedElements: ['style']
                    }}
                />

                {error.pitch && <p className='startup-form_error'> {error.pitch} </p> }
            </div>

            <Button 
                type='submit' 
                className='startup-form_btn text-white'
                disabled={isPending}
            >
                { isPending ? 'Submitting...' : 'Submit Your Pitch' }
            </Button>
        </form>
    )
}

export default StartupForm