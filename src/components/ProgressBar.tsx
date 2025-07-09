import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  progress,
}) => {
  return (
    <>
      <div className="flex justify-between text-white text-sm mb-2">
        <span>진행률</span>
        <span>
          {current + 1}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};
