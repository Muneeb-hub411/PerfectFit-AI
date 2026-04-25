import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0f]">
      <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
