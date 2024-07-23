import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <div className='text-center mx-auto'>
                    <div className="text-[#F83002] px-4 py-2 rounded-full bg-gray-100 font-medium" >No. 1 Skill Swap Website</div>
                </div>
                <div>
                    <h1 className='text-5xl font-bold'>Find & Swap <br /> Get Your <span className='text-[#6A38C2]'>Dream Skill</span></h1>
                </div>
                <div>
                    <p className='text-gray-500'>Get Your Dream Skill By Bartering</p>
                </div>
                <div className='flex w-[40%] shadow-lg border pl-3 border-gray-200 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find Your Dream Skill"
                        className="outline-none border-none w-full"
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection