   <div className='relative rounded-full h-[300px]'>
                    {
                        // name.split("").map((item, index) => (
                        //     <span className='h-[160px] w-[80px] absolute transform origin-center left-0 top-0'
                        //         style={{
                        //             transform: `rotate(${index * (360 / name.length)}deg)`
                        //         }}>{item}</span>
                        // ))

                        name.split('').map((item, index) => (
                            <h1><span className='absolute transform origin-bottom-center h-[200px]' style={{
                                transform: `rotate(${index * (360 / name.length)}deg)`
                            }}>{item}</span></h1>
                        ))
                    } 
   </div>
