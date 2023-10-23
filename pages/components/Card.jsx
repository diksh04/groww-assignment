import Link from "next/link";
import React from "react";

import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

const Card = ({ image, title, shareprice, shareIncDec }) => {
  return (
    <Link href={`/product/${title}`}>
      <div className="shadow-xl m-5 w-60 p-3 rounded hover:scale-95 flex flex-col hover:cursor-pointer h-[370px]">
        <div className="h-[70%]">
          <img
            src={image}
            alt="logo"
            className="rounded-lg object-contain bg-white grow"
          />
        </div>
        <div className="ml-2">
          <div className="text-lg">CompanyName: {title}</div>
          <div className="text-base">SharePrice: {`$${shareprice}`}</div>
          <div
            className={`text-base ${
              shareIncDec > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="align-middle">
              ChangeAmount:{" "}
              {shareIncDec > 0 ? `+${shareIncDec}%` : `${shareIncDec}%`}
              {shareIncDec > 0 ? (
                <BiSolidUpArrow className="inline" />
              ) : (
                <BiSolidDownArrow className="inline" />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
