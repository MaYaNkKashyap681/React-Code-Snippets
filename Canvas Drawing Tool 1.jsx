import React, { useEffect, useRef, useState } from 'react';

const colors = [
    {
        name: "Black", code: "black",
    },
    {
        name: "Yellow", code: "yellow"
    },
    {
        name: "Red", code: "red",
    },
    {
        name: "Blue", code: "blue",
    },
    {
        name: "Green", code: "green"
    }
]

const App = () => {
    const canvasContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const context = useRef(null);
    const canvasSize = useRef({ w: 0, h: 0 });
    const isDrawing = useRef(false);
    const history = useRef([]);
    const redoHistory = useRef([]);

    let temp = {
        color: 'black',
        points: []
    }

    const [selectedColor, setSelectedColor] = useState(colors[0]);

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current) {
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            
            if (context.current) {
                context.current.scale(dpr, dpr);
                redraw();
            }
        }
    };

    const initCanvas = () => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d");
        }
        resizeCanvas();
    };

    useEffect(() => {
        initCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    const handleMouseDown = () => {
        isDrawing.current = true;
        context.current.beginPath();
        history.current.push({ color: selectedColor.code, points: [] });
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        if (history.current[history.current.length - 1].points.length === 0) { history.current.pop(); }
        console.log(history.current)
        context.current.closePath();
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) return;
        const x = e.clientX;
        const y = e.clientY;

        if(redoHistory.current.length >= 1) redoHistory.current = [];

        if (x > canvasRef.current.width || x < 0 || y > canvasRef.current.height || y < 0) return;
        temp.color = selectedColor.code
        history.current[history.current.length - 1].points.push({ x, y });
        context.current.lineWidth = 3;
        context.current.strokeStyle = selectedColor.code; // Update stroke color
        context.current.lineCap = "round";
        context.current.lineTo(x, y);
        context.current.stroke();
    };

    useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [selectedColor]); // Listen for changes in selectedColor

    const handleUndo = () => {
        if (history.current.length === 0) return;
        redoHistory.current.push(history.current[history.current.length - 1]);
        history.current.pop();

        // history.current.map((item) => {
            redraw()
        // })
    };

    const handleRedo = () => {
        if (redoHistory.current.length === 0) return;
        history.current.push(redoHistory.current[redoHistory.current.length - 1]);
        redoHistory.current.pop();

        // history.current.map((item) => {
            redraw()
        // })
    };

    const redraw = () => {
        context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        history.current.forEach(path => {
            context.current.lineWidth = 3;
            context.current.strokeStyle = path.color;
            context.current.lineCap = "round";
            context.current.beginPath();
            path.points.forEach(point => {
                context.current.lineTo(point.x, point.y);
            });
            context.current.stroke();
            context.current.closePath();
        });
    };

    const handleClear = () => {
        if(!canvasRef.current) return;
        context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }

    return (
        <>
            <div ref={canvasContainerRef} className='h-screen relative'>
                <canvas className='' ref={canvasRef}></canvas>
            </div>
            <div className='h-[4rem] w-[8rem] bg-white border-[2px] shadow-xl cursor-pointer hover:scale-[1.01] rounded-md absolute bottom-4 left-4 flex items-center justify-center group'>
                <div className={`flex items-center gap-4`}>
                    <div className='w-[2rem] h-[2rem] rounded-full' style={{
                        backgroundColor: selectedColor.code
                    }}>
                    </div>
                    <span>{selectedColor.name}</span>
                </div>
                <div className='absolute top-[-400%] flex-col gap-4 bg-white border-[1px] p-4 rounded-2xl hidden group-hover:flex'>
                    {
                        colors.map((item) => (
                            <div
                                className='w-[2rem] h-[2rem] rounded-full'
                                key={item.name}
                                onClick={() => setSelectedColor(item)}
                                style={{
                                    backgroundColor: item.code
                                }}>
                            </div>
                        ))
                    }

                </div>

            </div>
            <div className='bg-white shadow-lg rounded-lg absolute top-4 left-4 p-4 flex items-start gap-12 justify-between'>
                <button onClick={handleUndo} className='hover:bg-green-300 p-2 rounded-md'>Undo</button>
                <button onClick={handleRedo} className='hover:bg-green-300 p-2 rounded-md'>Redo</button>
                <button onClick={handleClear} className='hover:bg-green-300 p-2 rounded-md'>Clear</button>
            </div>
        </>
    );
};

export default App;
