"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function VidiosSliderRefrance() {
  const settings = {
    infinite: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    centerMode: true,
    centerPadding: "200px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "70px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: false,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          centerPadding: "0px",
        },
      },
    ],
  };

  const vidieosUrl = [
    {
      url: "https://www.youtube.com/embed/PX5K_4aQprI?si=r_TgyhKNy-OiD3Tb",
      id: 1,
    },
    {
      url: "https://www.youtube.com/embed/8V4fBST26GA?si=ZnCBcH72fvNIccpP",
      id: 2,
    },
    {
      url: "https://www.youtube.com/embed/GH9v-MUEbwo?si=cIYTQJDxhJDLcaWM",
      id: 3,
    },
  ];

  const videosShow = vidieosUrl.map((video) => {
    return (
      <div
        key={video.id}
        className="relative h-0 overflow-hidden pb-[56.5%] px-3 "
      >
        <iframe
          loading="lazy"
          className=" absolute top-0 left-0 w-full h-full "
          width={"100%"}
          src={video.url}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    );
  });

  return (
    <div className="bg-[var(--main-background)]  py-20 px-10">
      <div className="slider-container">
        <Slider {...settings}>{videosShow}</Slider>
      </div>
    </div>
  );
}
