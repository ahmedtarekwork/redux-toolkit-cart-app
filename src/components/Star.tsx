import { nanoid } from "@reduxjs/toolkit";
import { FaStar } from "react-icons/fa";

const idFunc = () => `grad-${nanoid()}`;

const Star = ({ percent }: { percent: number }) => {
  const id = idFunc();

  return (
    <div data-star-percent={percent + "%"} className="star">
      <FaStar className="the-star" fill={`url(#${id})`} />

      <svg className="star-grad">
        <defs>
          <linearGradient id={id}>
            <stop offset={percent + "%"} stopColor="gold" />
            <stop offset={percent + "%"} stopColor="gray" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
export default Star;
