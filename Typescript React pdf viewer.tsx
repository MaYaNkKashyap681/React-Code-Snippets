import React, { useEffect, useState } from 'react';
import { Document, Page, Thumbnail, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdfFile from '../../assets/ui-color-palette.pdf';
import { useResizeDetector } from 'react-resize-detector';
import Loader from './../components/Loader';
import { AiOutlineZoomOut, AiOutlineZoomIn, AiOutlineFullscreenExit, AiOutlineFullscreen } from 'react-icons/ai'
import PdfFullScreen from './PdfFullScreen';
import KeySuggestion from './KeySuggestion';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfRendered = () => {
    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [renderedScale, setRenderedScale] = useState(null);
    const isLoading = renderedScale !== scale;
    const [isOpen, setIsOpen] = useState(false);

    const { width, ref } = useResizeDetector();

    const handleZoomOutClick = () => {
        if (scale == 0.25) return;
        setScale((prev) => prev - 0.25)
    }

    const handleZoomInClick = () => {
        if (scale == 2) return;
        setScale((prev) => prev + 0.25)
    }

    const handleFullScreenClick = () => {
        setIsOpen((prev) => !prev)
    }


    const keyPressFunction = (e) => {
        if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
            setIsOpen(false)
        } else if (e.key === 'f' || e.key === 'F') {
            setIsOpen(true)
        }
    }


    useEffect((e) => {
        window.addEventListener('keydown', keyPressFunction)
        return () => {
            window.addEventListener('keydown', keyPressFunction)
        }
    }, [])

    return (
        <div className='relative flex-1 w-full  mx-auto h-screen '>

            <Document
                loading={
                    <div className='h-screen flex items-center justify-center w-full'>
                        <Loader />
                    </div>
                }
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                file={pdfFile}
                className='max-h-full w-full'
            >
                <div className='flex w-full h-full'>
                    <div className='w-[30%] h-full   max-h-screen overflow-scroll scrollbar-hide'>
                        {new Array(numPages).fill(0).map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrPage(index + 1)}
                                className={`w-[50%] bg-white p-1 relative my-4 mx-auto overflow-hidden rounded-md border-[3px]  cursor-pointer ${currPage === index + 1 ? 'border-blue-600' : ''
                                    }`}
                            >
                                <div className={`absolute z-[20] bg-blue-600 rounded-br-lg top-0 left-0 p-4 text-white font-bold ${currPage === index + 1 ? '' : 'hidden'}`}>{index + 1}</div>
                                <Thumbnail pageIndex={index} width={200} height={200} className={`h-[200px] w-[200px]`} />
                            </div>
                        ))}
                    </div>
                    <div className='w-[50%] max-h-screen overflow-scroll scrollbar-hide' ref={ref}>
                        {isLoading && renderedScale ? (
                            <Page
                                width={width ? width : 1}
                                pageNumber={currPage}
                                scale={scale}
                                rotate={rotation}
                                key={'@' + renderedScale}
                            />
                        ) : null}

                        {new Array(numPages).fill(0).map((_, index) => (
                            <Page
                                width={width ? width : 1}
                                pageNumber={index + 1}
                                scale={scale}
                                rotate={rotation}
                                loading={
                                    <div className='h-screen flex items-center justify-center w-full'>
                                        <Loader />
                                    </div>
                                }
                                key={index}
                                onRenderSuccess={() => setRenderedScale(scale)}
                                className='mx-auto'
                            />
                        ))}
                    </div>
                </div>
            </Document>

            {
                isOpen && <PdfFullScreen PDFurl={pdfFile} />
            }
            <div className=' w-[32rem] flex items-center p-2 rounded-3xl gap-4 bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-100 fixed z-[40] bottom-4 left-1/2 -translate-x-1/2'>
                <div className='cursor-pointer'><AiOutlineZoomOut className={`${scale === 0.25 ? 'text-gray-500' : 'text-white'} text-3xl`} onClick={handleZoomOutClick} /></div>
                <span className='text-white font-bold'>{scale * 100}%</span>
                <div className='cursor-pointer'><AiOutlineZoomIn className={`${scale === 0.25 ? 'text-gray-50' : 'text-white'} text-3xl`} onClick={handleZoomInClick} /></div>
                <KeySuggestion text={isOpen ? 'Min: Esc' : 'Full: F'}>
                    <div className='cursor-pointer' onClick={handleFullScreenClick}>
                        {isOpen ? (
                            <AiOutlineFullscreenExit className="text-white text-3xl" />
                        ) : (
                            <AiOutlineFullscreen className="text-white text-3xl" />
                        )}
                    </div>
                </KeySuggestion>
            </div>

        </div>
    );
};

export default PdfRendered;
