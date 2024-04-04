import axios from "axios";
import React, { useState } from "react";

const CopyLinkContainer = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${link}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-transparent border-none focus:outline-none text-blue-500 underline"
          >
            {link}
          </a>
        
          <button
            className="p-1 bg-gray-400 text-white rounded-2xl focus:outline-none"
            onClick={handleCopy}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5h6M9 12h6m-6 7h6a2 2 0 002-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
        {isCopied && (
          <div className="ml-4 text-green-500 font-semibold">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default CopyLinkContainer;
