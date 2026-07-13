"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// liberies to solve the problem
import LiteYouTubeEmbed from "react-lite-youtube-embed";
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
      youtubeId: "PX5K_4aQprI",
      id: 1,
    },
    {
      youtubeId: "8V4fBST26GA",
      id: 2,
    },
    {
      youtubeId: "GH9v-MUEbwo",
      id: 3,
    },
  ];

  const videosShow = vidieosUrl.map((video) => {
    return (
      <div
        key={video.id}
        className="relative h-0 overflow-hidden pb-[56.5%] px-3 "
      >
        <div className=" absolute top-0 left-0 w-full h-full ">
          <LiteYouTubeEmbed
            id={video.youtubeId}
            title="YouTube video player"
          ></LiteYouTubeEmbed>
        </div>
      </div>
    );
  });

  return (
    <div id="evidence" className="bg-[var(--main-background)]  py-20 px-10">
      <div className="slider-container">
        <Slider {...settings}>{videosShow}</Slider>
      </div>
    </div>
  );
}
