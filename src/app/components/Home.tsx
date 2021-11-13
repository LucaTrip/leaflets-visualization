import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import { GlobalContext } from "../context/GlobalContext";

import { Leaflet, LeafletResponse } from "../models/LeafletResponse";
import Card from "../components/Card";

const Home = () => {
  const [leaflets, setLeaflets] = useState<Leaflet[]>([]);
  const [noLeafletToShow, setNoLeafletToShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(GlobalContext);

  useEffect(() => {
    console.log("CONTEXT BEFORE CALLED API", context);
    setIsLoading(true);
    axios
      .get<LeafletResponse>(
        "https://pq-leaflets.herokuapp.com/api/leaflets/filter",
        {
          params: {
            limit: context.state.limit,
            excludeExpired: context.state.excludeExpired,
            maxDistance: context.state.maxDistance,
            sort: context.state.sort,
            name: context.state.name,
            offset: context.state.offset,
          },
        }
      )
      .then(({ data }) => {
        console.log("response", data);
        if (!data.error) {
          setLeaflets(data.data.leaflets);
        } else {
          setNoLeafletToShow(true);
        }
      })
      .catch((error) => {
        console.log("response error", error);
        setNoLeafletToShow(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [context]);

  return (
    <div className="w-full h-full">
      <div className="flex justify-center">
        <Loader
          type="MutatingDots"
          color="dodgerblue"
          secondaryColor="dodgerblue"
          width={100}
          height={100}
          visible={isLoading}
        />
      </div>

      {noLeafletToShow && (
        <div className="w-full h-full flex flex-col justify-center">
          <p className="text-center">There is currently no leaflet to show</p>
          <p className="text-center">Come back later</p>
        </div>
      )}

      {!noLeafletToShow && !leaflets.length && (
        <div className="w-full h-full flex flex-col justify-center">
          <p className="text-center">No flyers found</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {leaflets.map((leaflet) => (
          <Card {...leaflet} key={leaflet.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
