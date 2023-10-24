import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

const Card = ({ image, title, shareprice, shareIncDec }) => {

  return (
    <Link href={`/product/${title}`}>
      <div className=" m-5 w-60 p-2 rounded hover:scale-95 flex flex-col hover:cursor-pointer h-[370px] shadow-2xl">
        <div className="h-[70%]">
          <Image
            loader={() => image}
            src={image}
            alt="logo"
            width={300}
            height={300}
            className="rounded-lg object-contain bg-white grow"
          />
        </div>
        <div className="ml-2">
          <div className="text-lg">CompanyName: {title}</div>
          <div className="text-base">SharePrice: {`$${shareprice}`}</div>
          <div
            className={`text-base  ${
              shareIncDec > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="align-middle ">
              ChangeAmount:{""}
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
