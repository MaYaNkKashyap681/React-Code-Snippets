// useScrollingCategories.tsx

import { useState, useEffect, useRef } from "react";

const useScrollingCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isListShifted, setIsListShifted] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (index: number) => {
    setSelectedCategory(index);
  };

  const handleArrowClick = (e: React.MouseEvent) => {

    console.log(e);
    const elementId = (e.currentTarget as HTMLDivElement).id;

    if (!containerRef.current) return;
    containerRef.current.scrollLeft += elementId === "right" ? -150 : 150;
  };

  const startDrag = (e: MouseEvent) => {
    setIsDragging(true);
  };

  const stopDrag = (e: MouseEvent) => {
    setIsDragging(false);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // container.addEventListener("mousedown", startDrag);
      // container.addEventListener("mousemove", controlDrag);
      // window.addEventListener("mouseup", stopDrag);

      return () => {
        // container.removeEventListener("mousemove", controlDrag);
        // container.removeEventListener("mousedown", startDrag);
        // window.removeEventListener("mouseup", stopDrag);
      };
    }
  }, []);

  return [selectedCategory, isListShifted, isDragging, handleClick, startDrag, stopDrag, containerRef, handleArrowClick] as const;
};

export default useScrollingCategories;


// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Catergories.tsx
import useScrollingCategories from '../hooks/useScrollingCategories';
import ImageIcon from '../../../components/atoms/Icons/ImageIcons';
import arrow from './../../../assets/Icons/arrow.svg';

const categories = [
  'All',
  'Internet of Things (IoT)',
  'Biomedical Engineering',
  'Cybersecurity in Engineering Systems',
  'Biomedical Engineering',
  'Big Data',
  'Medi Engineering',
];

const Catergories = () => {
  const [selectedCategory, isListShifted, isDragging, handleClick, startDrag, stopDrag, containerRef, handleArrowClick] = useScrollingCategories();

  return (
    <div className='w-[70%] flex flex-row items-center py-2 text-[15px] font-inter '>
      <div id="left" className="mx-2 cursor-pointer rounded-xl bg-[#DEF3FF] px-3 py-4 font-bold text-[#1DA1F2]" onClick={handleArrowClick}>
        <ImageIcon
          url={arrow}
          wt="16px"
          ht="16px"
          classname={`rotate-[90deg]`}
        />
      </div>
      <div className={`overflow-x-hidden whitespace-nowrap  scrollbar-hide transition-all duration-200 flex ${isListShifted ? 'ml-auto' : ''}`} ref={containerRef}
      style={{
        scrollBehavior: 'smooth'
      }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`mx-2 cursor-pointer px-2 py-1 text-sm transition-all duration-200 ${selectedCategory === index ? 'bg-[#DEF3FF]' : ''
              } rounded-3xl text-center hover:bg-[#DEF3FF]`}
            onClick={() => handleClick(index)}
          >
            {category}
          </div>
        ))}
      </div>
      <div id="right" className="mx-2 cursor-pointer rounded-xl bg-[#DEF3FF] px-3 py-4 font-bold text-[#1DA1F2]" onClick={handleArrowClick}>
        <ImageIcon
          url={arrow}
          wt="16px"
          ht="16px"
          classname={`rotate-[-90deg]`}
        />
      </div>
    </div>
  );
};

export default Catergories;



// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
