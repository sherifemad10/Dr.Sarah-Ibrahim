import React from 'react';
const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  px-4">
<div className="w-full gap-x-2 flex justify-center items-center">
  <div
    className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"
  ></div>
  <div
    className ="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"
  ></div>
  <div
    className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"
  ></div>
</div>

    </div>
  );
};

export default Loading;
