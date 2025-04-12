import React from 'react';
import Form from 'next/form';
import SearchFormReset from './SearchFormReset';
import { Search } from 'lucide-react';

const SearchForm = ({query}: {query?: string}) => {

    return (
        <Form action='/' scroll={false} className='search-form'>
            <input
                name='query'
                defaultValue={query}
                className='search-input'
                placeholder='Search Startups!'

            />

            {/* Button -> An Issue, Form is a server side component but button click we are calling is client side -> Extract it to a new component*/}
            <div className='flex gap-2'>
                {query && (
                    <SearchFormReset />
                )}

                <button
                    type='submit'
                    className='search-btn text-white'
                >
                    <Search className='size-5'/>
                </button>
            </div>
        </Form>
    );
}

export default SearchForm