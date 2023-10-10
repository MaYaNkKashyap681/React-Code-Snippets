/*
Here it is the custom hook you can do it in the same file.

- Write your whole logic outside the file and in the useEffect copy and paste as usual.
- You can return ref element as well from the custom Hook.
- The custom hook only have all the logic.
*/


import { useEffect, useRef } from "react";

const useColorToggle = (options) => {
    const blocks = useRef(null);
    // Function to handle intersection
    function handleIntersect(entries, observer) {
        entries.forEach((entry) => {
            if (entry.intersectionRatio > 0.5) { // Check if more than 50% is visible
                entry.target.style.backgroundColor = 'green'; // Change color
            } else {
                entry.target.style.backgroundColor = 'blue'; // Reset to initial color
            }
        });
    }
    useEffect(() => {
        // Create an Intersection Observer
        const observer = new IntersectionObserver(handleIntersect, options);

        // Start observing the target element
        observer.observe(blocks.current);

        // Clean up by disconnecting the observer when the component unmounts
        return () => {
            observer.disconnect();
        };
    }, []);
    return [blocks];
}

export default useColorToggle;
