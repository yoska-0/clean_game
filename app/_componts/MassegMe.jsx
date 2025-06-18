import React from "react";

import AOSWrapper from "./AOSAnimaton";

//import from matrul ui
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="flex items-center  bg-[#e7e7e7] justify-center ">
      <div
        className="h-full w-full md:w-1/2 flex flex-col justify-center items-center"
        data-aos="fade-left"
      >
        <AOSWrapper />
        <p className="text-2xl text-center  leading-9 p-4">
          إذا كنت لا تجد اللعبة التي تبحث عنها، أو إذا كنت تعتقد أنها تحتوي على
          مخالفات شرعية أو شروحات تتعلق بالشركيات، أو حتى إذا كان لديك استفسار
          حول محتوى لعبة معينة على موقعنا، يمكنك التواصل معنا. نحن هنا للتأكد من
          أن جميع الألعاب على الموقع تتماشى مع المعايير الشرعية والأخلاقية. كما
          يمكنك الإبلاغ عن أي خطأ في وصف اللعبة أو أي محتوى غير دقيق مذكور في
          تقييماتها.
        </p>
        <div className="flex  items-center justify-around w-1/2">
          <Button
            href="https://docs.google.com/forms/d/e/1FAIpQLSdP0zMZyi_ng1ZF5wzMnJETlE8JzAz3nGP7gFEaOgxgIt8-vQ/viewform?usp=dialog"
            target="_blank"
            variant="outlined"
            className="headerSectionAnimation overflow-hidden"
            sx={{
              color: "var(--color-text)",
              borderColor: "var(--color-text)",
              fontSize: "24px",
              padding: "0px 20px",
            }}
          >
            تواصل معنا
          </Button>
          <Button
            href=""
            target="_blank"
            variant="outlined"
            className="headerSectionAnimation overflow-hidden"
            sx={{
              color: "var(--color-text)",
              borderColor: "var(--color-text)",
              fontSize: "24px",
              padding: "0px 20px",
            }}
          >
            أضف لعبة
          </Button>
        </div>
      </div>
      <div className="w-1/2 h-full max-md:hidden">
        <img
          src="/photos/ChatGPT Image Apr 9, 2025, 09_05_54 AM.png"
          height={"100%"}
          width={"100%"}
        />
      </div>
    </div>
  );
}

export default App;
