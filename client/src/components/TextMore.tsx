"use client";

import { useState } from "react";

export interface TextMoreProps {
  children?: React.ReactNode;
  content: string;
  containerClass?: string;
}

export default function TextMore({ children, containerClass, content }: TextMoreProps) {
  const [showMore, setShowMore] = useState(content.length > 100);
  const text = showMore ? content.substring(0, 100) + "..." : content;
  const handleShow = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={containerClass}>
      {children} {text}
      {content.length > 100 && (
        <button className="cursor-pointer font-bold block -ml-1" onClick={handleShow}>
          {showMore ? " Show more" : " Show less"}
        </button>
      )}
    </div>
  );
}
