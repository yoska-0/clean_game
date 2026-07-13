import AOSWrapper from "./AOSAnimaton";

export default function AboutUs() {
  return (
    <div id="about" className=" bg-[var(--main-background)] py-6 px-5">
      <h1 className="text-7xl text-[var(--color-text)]  p-1 my-5 m-auto w-fit text-center headerSectionAnimation">
        عن الموقع
      </h1>
      <div className="flex justify-between items-center">
        <div className="text-white  p-4 " data-aos="fade-up">
          <AOSWrapper />
          <p className="text-2xl  text-center leading-9 ">
            يهدف هذا الموقع إلى مساعدة المستخدمين المسلمين في التعرف على محتوى
            الألعاب الإلكترونية من منظور يتوافق مع القيم والمبادئ الإسلامية.
            يعتمد الموقع على مساهمات وتقييمات المستخدمين، حيث يشارك كل لاعب
            تجربته ويقيّم المحتوى الموجود داخل اللعبة، مثل مشاهد التعري،
            والمحتوى الجنسي، والشركيات، والألفاظ البذيئة، والعنف، وغيرها من
            العناصر التي قد يرغب البعض في معرفتها قبل تجربة اللعبة. لا يقدم
            الموقع أحكامًا شرعية أو تقييمات رسمية، وإنما يوفر منصة تجمع آراء
            وتجارب المستخدمين في مكان واحد، مما يساعد الآخرين على اتخاذ قرار
            يناسب قناعاتهم وقيمهم قبل شراء أو لعب أي لعبة. نسعى إلى بناء مجتمع
            موثوق يشارك المعرفة والخبرة، ويوفر قاعدة بيانات متجددة تساعد الأفراد
            والعائلات المسلمة على اختيار الألعاب المناسبة لهم بسهولة وشفافية.
            <br />
          </p>
        </div>
        <div data-aos="fade-up" className="max-md:hidden">
          <AOSWrapper />
          <img
            src="/photos/About us page-amico.webp"
            className=""
            width={"4000px"}
            height={"4000px"}
          />
        </div>
      </div>
    </div>
  );
}
