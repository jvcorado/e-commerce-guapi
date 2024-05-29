import React from "react";

export default function Skeleton({ isLoading }: { isLoading?: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="h-96 flex flex-col gap-5 bg-slate-800 p-3 rounded-lg animate-pulse">
          <div className="relative w-full flex items-center justify-center max-h-72 flex-1 bg-slate-500 rounded-lg"></div>
          <div className="flex flex-col gap-3 text-white">
            <h1 className="font-bold text-base h-6 bg-slate-500 rounded-lg"></h1>
            <h2 className="text-base font-bold h-6 w-[70%] bg-slate-500 rounded-lg"></h2>
            <button className="bg-slate-500 transition duration-300 text-white p-4 rounded-lg w-full h-12"></button>
          </div>
        </div>
      )}
    </>
  );
}
