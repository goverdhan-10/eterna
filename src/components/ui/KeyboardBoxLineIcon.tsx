import React from "react";

const KeyboardBoxLineIcon = ({ size = 20, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M20 5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h16Zm0-2H4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3Zm-9 11h2v2h-2v-2Zm-4 0h2v2H7v-2Zm8 0h2v2h-2v-2ZM7 9h2v2H7V9Zm4 0h2v2h-2V9Zm4 0h2v2h-2V9Z" />
    </svg>
  );
};

export default KeyboardBoxLineIcon;
