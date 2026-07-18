"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

// import commponts
import SearchBar from "./SearchBar";

const AnimationBackGround = dynamic(() => import("./AnimationBackGround"), {
  ssr: false,
});

export default function Header() {
  return (
    <div
      id="home"
      className="text-white bg-[var(--bg-darkBlue)] relative  py-8 px-10
       h-[100vh] flex justify-center items-center "
    >
      <AnimationBackGround />
      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <Image
          src="/photos/logo.png"
          alt="Clean Game Logo"
          priority
          width={280}
          height={280}
          className="mb-1 drop-shadow-2xl"
        />

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide mb-4">
          Clean Game
        </h1>

        <h2 className="max-w-4xl text-xl md:text-3xl leading-relaxed text-green-300 font-semibold mb-6">
          ﴿ وَذَرِ الَّذِينَ اتَّخَذُوا دِينَهُمْ لَعِبًا وَلَهْوًا
          وَغَرَّتْهُمُ الْحَيَاةُ الدُّنْيَا ﴾
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-gray-300 leading-8 mb-8">
          منصة تساعد اللاعبين على التعرف على محتوى الألعاب من خلال تقييمات
          المجتمع، لاتخاذ قرارات واعية قبل اللعب.
        </p>

        <div className="w-full mx-auto max-w-2xl">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
