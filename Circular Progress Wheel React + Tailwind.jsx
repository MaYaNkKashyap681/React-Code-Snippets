import React from 'react';

const FollowersWheel = () => {
  return (
    <>
      <div className="p-4 mt-6">
        <span className=" font-SFpro text-xl font-semibold">Your Followers</span>
      </div>
      <div className="flex items-center justify-center mt-16">
        <div className="w-[14rem] h-[14rem] bg-gray-400 rounded-full flex items-center justify-center relative">
          {
            new Array(50).fill(0).map((_, index) => (
              <div key={index} className="w-[7rem] absolute right-0 h-6 bg-[#8270DB] origin-left rotate-[-90deg]" style={{
                rotate: index * (270 / 50) + "deg"
              }}></div>
            ))}
          {/* <div className="w-[7rem] absolute right-0 h-2 bg-white origin-left " ></div> */}

          <div className="w-[12rem] h-[12rem] rounded-full bg-white z-[8]">
          </div>
        </div>
      </div>
    </>
  )
}
