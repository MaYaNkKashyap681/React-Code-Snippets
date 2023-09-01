import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/ass5/banner1.png';
import banner2 from '../../assets/ass5/banner2.png';
import banner3 from '../../assets/ass5/banner3.png';
import banner4 from '../../assets/ass5/banner4.png';
import banner5 from '../../assets/ass5/banner5.png';
import banner6 from '../../assets/ass5/banner6.png';

const imagesList = [banner1, banner2, banner3, banner4, banner5, banner6]


const ImageChanger = () => {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % imagesList.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='h-screen w-full bg-black mt-12 flex flex-col items-center justify-center'>
            <div>
                <img src={imagesList[currentImage]} alt="banner image" className='w-[30rem]' />
            </div>
        </div>
    )
}

export default ImageChanger

//More Corrected Code

import React, { useEffect, useState } from 'react';
import banner1 from '../../assets/ass5/banner1.png';
import banner2 from '../../assets/ass5/banner2.png';
import banner3 from '../../assets/ass5/banner3.png';
import banner4 from '../../assets/ass5/banner4.png';
import banner5 from '../../assets/ass5/banner5.png';
import banner6 from '../../assets/ass5/banner6.png';
import dollar from '../../assets/ass5/dollar.png';
import sparkle from '../../assets/ass5/sparkle.png';

const imagesList = [banner1, banner2, banner3, banner4, banner5, banner6];

const TryNowButton = () => {
    return (
        <div className='flex items-center justify-center uppercase font-qb1 text-[#000000] bg-yellowx text-[0.8rem] rounded-[10rem] px-28 py-4 mt-20'>
            <span className='uppercase font-qb2 text-md'>Try it Now</span>
        </div>
    );
};

const ImageChanger = () => {
    const [count, setCount] = useState(0);
    const [dollarVisible, setDollarVisibility] = useState(false);

    useEffect(() => {
        const interval = setTimeout(() => {
            if (count === imagesList.length - 1) {
                setDollarVisibility((prev) => !prev);
            }
            setCount((prevCount) => (prevCount + 1) % imagesList.length);
        }, 1000);
        return () => clearTimeout(interval);
    }, [count]);

    return (
        <div className='min-h-screen w-full bg-black mt-12 flex flex-col items-center py-20'>
            <div className=' items-center justify-center  border-[2px] px-1 py-[0.4rem] inline-block border-[#ffffff] bg-transparent text-white'>
                <span className='uppercase font-qb2 flex justify-center items-center text-xs'>VINYL STUDIO</span>
            </div>

            <h2 className='text-center font-qb2 text-4xl text-white mt-8 leading-9'>Make it real with <br /> Qrates Vinyl Studio</h2>
            <p className='mt-12 text-white text-center max-w-[50%] text-lg font-qb1'>Design the look and feel of your vinyl and cassette and use the profit calculator to immediately see how much your project will cost, and how much you'll earn.</p>
            <div className='mt-16 relative'>
                <img src={dollar} alt="dollar image" className={`w-[8rem] absolute right-[-240px] top-[-100px] ${dollarVisible ? 'opacity-1' : 'opacity-0'}`} />
                <img src={sparkle} alt="sparkle image" className={`w-[12rem] absolute left-[-300px] bottom-0 ${dollarVisible ? 'opacity-0' : 'opacity-1'}`} />
                <img src={imagesList[count]} alt="banner image" className='w-[30rem]' />
            </div>
            <TryNowButton />
        </div>
    );
};

export default ImageChanger;


// SetInterval was not correctly handling the incrementing the currentImage/count.


// Previous Code is not working because you are not clearing the interval
// import React, { useEffect, useState } from 'react'
// import banner1 from '../../assets/ass5/banner1.png';
// import banner2 from '../../assets/ass5/banner2.png';
// import banner3 from '../../assets/ass5/banner3.png';
// import banner4 from '../../assets/ass5/banner4.png';
// import banner5 from '../../assets/ass5/banner5.png';
// import banner6 from '../../assets/ass5/banner6.png';

// const imagesList = [banner1, banner2, banner3, banner4, banner5, banner6]


// const ImageChanger = () => {

//     const [currentImage, setCurrentImage] = useState(0);

//     useEffect(() => {
//         setInterval(() => {
//             let imageIndex = currentImage;
//             if (currentImage === imagesList.length) imageIndex = 0;
//             else {
//                 imageIndex += 1;
//             }
//             setCurrentImage(imageIndex)
//         }, 1000)
//     }, [])

//     return (
//         <div className='h-screen w-full bg-black mt-12 flex flex-col items-center justify-center'>
//             <div>
//                 <img src={imagesList[currentImage]} alt="banner image" className='w-[30rem]' />
//             </div>
//         </div>
//     )
// }

// export default ImageChanger
