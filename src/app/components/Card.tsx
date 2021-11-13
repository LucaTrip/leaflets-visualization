import React from "react";

import fallbackImage from "../assets/img/fallback-image.jpg";

import { Retailer } from "../models/LeafletResponse";

type Props = {
  name: string;
  retailer: Retailer;
};

const Card: React.FC<Props> = ({ name, retailer }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-white m-4 p-3 shadow-md transform transition duration-300 hover:scale-105">
      <div className="relative aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg">
        <img
          alt=""
          src={retailer.images.sm}
          onError={(e) => (e.currentTarget.src = fallbackImage)}
          className="absolute h-full w-full object-cover rounded-lg"
        />
      </div>
      <p className="pt-3 text-sm font-semibold">{name}</p>
    </div>
  );
};

export default Card;
