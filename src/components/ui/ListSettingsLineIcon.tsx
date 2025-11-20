import React from "react";

const ListSettingsLineIcon = ({ size = 20, className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d="M11 4v2H3V4h8Zm10 0v2h-4V4h4ZM11 11v2H3v-2h8Zm10 0v2h-4v-2h4ZM11 18v2H3v-2h8Zm10 0v2h-4v-2h4Z" />
      <path d="M16 6.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm2.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM16 13.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm2.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM16 20.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Zm2.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
    </svg>
  );
};

export default ListSettingsLineIcon;
