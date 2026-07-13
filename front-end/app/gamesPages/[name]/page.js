"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

//import componts
import NotFound from "../../_componts/NotFound";
import CommentsForm from "../../_componts/CommentsForm";
import apiFutrues from "../../../lib/api";

// import from material ui
import LinearProgress from "@mui/material/LinearProgress";

export default function GamesPage() {
  const { name } = useParams();

  const [limit, setLimit] = useState(10);
  const [totalDoc, setTotalDoc] = useState(0);

  const [curentGame, setCurentGame] = useState({});
  const [comments, setComment] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await apiFutrues.getGame(name);
        setCurentGame(game);
        const dataComments = await apiFutrues.bringComments(game._id, limit);
        setComment(dataComments.data.data);
        setTotalDoc(dataComments.totalDocs);
      } catch (error) {
        setCurentGame(undefined);
        setComment([]);
        setTotalDoc(0);
      }
    };
    fetchGame();
  }, [name, limit]);

  function showGame() {
    if (curentGame != undefined) {
      return <>{pageContent(curentGame)}</>;
    }
    return <NotFound />;
  }

  function commentsSection() {
    const colors = [
      "#6B5FD4",
      "#A8A00D",
      "#A80D39",
      "#8995A1",
      "#C5B6E0",
      "#E0DAB6",
      "#BCE0B6",
      "#B6E0C3",
      "#D3E0B6",
      "#E0B6CB",
      "#C387C7",
      "#CCE6E2",
      "#D0E6CC",
      "#C1CEDB",
    ];

    const getColor = (letter) => {
      const index = letter.charCodeAt(0);
      return colors[index % colors.length];
    };

    return (
      <div className="text-right">
        {comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className="bg-[var(--bg-blue)] py-3.5 px-5 mb-5 rounded-2xl"
            >
              <div className="flex items-center gap-3">
                <div
                  className=" rounded-full mb-2 flex items-center justify-center px-3.5 py-1.5 text-xl uppercase"
                  style={{ background: getColor(comment.user.name[0]) }}
                >
                  {comment.user.name[0]}
                </div>
                <p>{comment.user.name}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
          );
        })}
        {limit < totalDoc && (
          <button
            className="bg-[var(--bg-blue)] py-3.5 px-5 mb-5 rounded-2xl cursor-pointer"
            onClick={() => setLimit(limit + 10)}
          >
            عرض المزيد من التعليقات
          </button>
        )}
      </div>
    );
  }

  function pageContent(curentGame) {
    return (
      <div key={curentGame._id} className="bg-[var(--bg-darkBlue)] p-5 mt-10">
        <div className="flex items-center justify-between flex-col">
          <img
            src={curentGame.image}
            alt="img"
            className="w-full h-full object-contain"
          />

          <div className="text-white text-left w-full md:mr-2">
            <h2 className="text-8xl max-md:text-4xl max-md:mt-3">
              {curentGame.name}
            </h2>

            {/* rating */}
            <div className="flex flex-col gap-4 mt-5 bg-[var(--bg-blue)] rounded-lg">
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-gray-400">
                <p className="text-right">التعري:</p>
                <div>
                  <div>{curentGame.averageNudity}/10</div>
                  <LinearProgress
                    variant="determinate"
                    value={(curentGame.averageNudity / 10) * 100}
                    aria-label="Export data"
                    sx={{
                      backgroundColor: "#334155",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3b82f6",
                      },
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>
              </div>
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-gray-400">
                <p className="text-right">الشركيات:</p>
                <div>
                  <div>{curentGame.averageBeliefs}/10</div>
                  <LinearProgress
                    variant="determinate"
                    value={(curentGame.averageBeliefs / 10) * 100}
                    aria-label="Export data"
                    sx={{
                      backgroundColor: "#334155",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3b82f6",
                      },
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>
              </div>
              <div className="p-5 bg-[var(--bg-blue)] rounded-lg border-gray-400">
                <p className="text-right">الشذوذ:</p>
                <div>
                  <div>{curentGame.averageHomosexuality}/10</div>
                  <LinearProgress
                    variant="determinate"
                    value={(curentGame.averageHomosexuality / 10) * 100}
                    aria-label="Export data"
                    sx={{
                      backgroundColor: "#334155",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#3b82f6",
                      },
                      transform: "scaleX(-1)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* line */}
            <div className="w-1/2 m-auto h-0.5 bg-white/30 mt-7 rounded-2xl"></div>

            {/* comments */}
            <div className="mt-10">
              <button
                className="bg-[var(--bg-blue)] py-3 px-4 mb-5 rounded-2xl cursor-pointer"
                onClick={() => setShowCommentForm(true)}
              >
                اضافة تعليق
              </button>
              {commentsSection()}
              {showCommentForm && (
                <div className="fixed inset-0 bg-gray-300/50 w-full h-full flex justify-center items-center">
                  <CommentsForm
                    setShowCommentForm={setShowCommentForm}
                    curentGame={curentGame}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="">{showGame()}</div>;
}
