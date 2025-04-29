"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesAPI, getGame } from "../../features/APIGames/APIGamesSlice";

// import from material-ui
import Alert from "@mui/material/Alert";

// import lodding animation
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function GamesPage({ Promise }) {
  const { name } = useParams();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const games = useSelector((state) => state.APIGames.data || []);
  const error = useSelector((state) => state.APIGames.error);
  const status = useSelector((state) => state.APIGames.status);

  function loaddingAnimation() {
    if (loading) {
      return (
        <>
          <DotLottieReact
            src="/animation/loaddinglottie.lottie"
            loop
            autoplay
            style={{
              height: "100vh",
              width: "100%",
              fontSize: "100px",
              objectFit: "contain",
              color: "red",
            }}
            className=" z-20 absolute top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 scale-200 "
          />
          <div className="absolute top-0 left-0 w-full h-full bg-white z-10"></div>
        </>
      );
    }
  }
  useEffect(() => {
    if (status != "succeeded") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    if (status == "idle") {
      dispatch(fetchGamesAPI());
    }
  }, [status, dispatch]);

  function showGame() {
    const curentGame = getGame(games, name);
    if (curentGame != undefined) {
      return <>{pageContent(curentGame)}</>;
    }
    return (
      <div>
        <p>{error}</p>
        <p>heloooooooooooooooooooooooooooooooooooooooooo</p>
      </div>
    );
  }

  function rateContent(rateNum) {
    switch (rateNum) {
      case rateNum <= 10 && rateNum >= 7:
        return "كثير جدا";
      case rateNum < 7 && rateNum >= 5:
        return "كتير";
      case rateNum < 5 && rateNum >= 3:
        return "متوسط";
      case 2:
        return "قليل";
      case 1:
        return "قليل جدا";
      default:
        return "لا يوجد";
    }
  }

  function pageContent(curentGame) {
    return (
      <div key={curentGame.id} className="bg-[var(--bg-darkBlue)] p-5">
        <div className="flex items-center justify-between flex-col">
          <img src={curentGame.imge} alt="img" className=" w-5/6"></img>

          <div className="text-white text-left w-full md:mr-2">
            <h2 className="text-8xl max-md:text-4xl max-md:mt-3">
              {curentGame.name}
            </h2>

            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 mt-5 ">
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-[1px] border-gray-400">
                <p className="text-right">التعري:</p>
                <p className="px-16 py-1 bg-[var(--blue)] rounded-sm text-center">
                  {rateContent(curentGame.rate.nudity)}
                </p>
              </div>
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-[1px] border-gray-400">
                <p className="text-right">الشركيات:</p>
                <p className="px-16 py-1 bg-[var(--blue)] rounded-sm text-center">
                  {rateContent(curentGame.rate.paganism)}
                </p>
              </div>
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-[1px] border-gray-400">
                <p className="text-right">الشذوذ:</p>
                <p className="px-16 py-1 bg-[var(--blue)] rounded-sm text-center">
                  {rateContent(curentGame.rate.homosexuality)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <Alert
          variant="filled"
          severity="warning"
          className="w-full text-8xl my-7 "
        >
          التقييمات الواردة على هذا الموقع تعكس رأيي الشخصي بناءً على تجربتي
          الخاصة أو بحث قمت به، وقد لا تكون خالية من الأخطاء. إذا كان لديك رأي
          مختلف أو ملاحظات، فلا تتردد في مشاركتها لتعزيز الفائدة للجميع.
        </Alert>

        {/* descraption */}
        <div className="bg-[var(--bg-blue)] w-full p-3 text-white mt-7">
          <h3 className="text-2xl">التقييم</h3>
          <h4 className="text-xl my-3">الشركيات:</h4>
          <p className="my-2">{curentGame.content.paganism}</p>
          <h4 className="text-xl my-3">الشذوذ:</h4>
          <p className="my-2">{curentGame.content.homosexuality}</p>
          <h4 className="text-xl my-3">التعري:</h4>
          <p className="my-2">{curentGame.content.nudity}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {loaddingAnimation()}
      {status == "succeeded" && loading == false ? (
        <div className="">{showGame()}</div>
      ) : (
        ""
      )}
    </>
  );
}
