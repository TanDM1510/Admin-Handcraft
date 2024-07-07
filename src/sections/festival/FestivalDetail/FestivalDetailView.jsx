"use client";

import axiosClient from "@/utils/customeAxios";
import React, { useEffect, useState } from "react";
import FestivalDetailHeader from "./FestivalDetailHeader";
import FestivalInformation from "./FestivalInformation";

const FestivalDetailView = ({ id }) => {
  const [festival, setFestival] = useState();
  const festivalId = id.id;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(
          `https://prm-api.webbythien.com/v1/api/festival/`
        );
        if (response) {
          const filteredFestival = response.data.find(
            (fest) => fest.id == festivalId
          );
          setFestival(filteredFestival);
          setIsLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <>
          {/* Header */}
          <FestivalDetailHeader />
          {/* Infor */}
          <FestivalInformation festival={festival} />
        </>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default FestivalDetailView;
