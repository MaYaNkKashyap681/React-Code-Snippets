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
