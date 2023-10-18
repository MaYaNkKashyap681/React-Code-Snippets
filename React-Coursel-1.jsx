import React, { useState } from 'react';
import left from '../../assets/left.svg';
import right from '../../assets/right.svg';

const Scroll = () => {
    const [windowPercent, setWindowPercent] = useState(0);

    const incWindow = () => {
        setWindowPercent((prevWindowPercent) => prevWindowPercent + 1200);
    }

    const decWindow = () => {
        setWindowPercent((prevWindowPercent) => prevWindowPercent - 1200);
    }

    return (
        <div className='h-[420px] w-[85%] relative'>
            <div className='w-[50px] h-full absolute left-[-50px] flex items-center'>
                {windowPercent > 0 && <img src={left} className='hover:scale-[1.01] cursor-pointer w-[2rem]' alt="left arrow" onClick={decWindow} />
                }
            </div>
            <div className='w-[50px] h-full absolute right-[-50px] flex items-center'>
                {windowPercent < 2400 && < img src={right} className="hover:scale-[1.01] cursor-pointer w-[2rem]" alt="right arrow" onClick={incWindow} />}
            </div>
            <div className='bg-white w-[800px] lg:w-[1200px] h-full mx-auto flex gap-x-[1.2px] overflow-hidden'>
                <div className='w-[3600px] flex gap-[5px] transform transition-all duration-700' style={{
                    transform: `translateX(-${windowPercent}px)`,
                }}>
                    {
                        new Array(12).fill(0).map((_, index) => (
                            <div className='h-full w-[260px] lg:w-[360px] bg-black rounded-lg shadow-md backdrop-filter backdrop-blur-sm bg-opacity-40' key={index}>{index}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Scroll;
