import AOSWrapper from "./AOSAnimaton";

export default function AboutUs() {
  return (
    <div className=" bg-[var(--main-background)] py-6 px-5">
      <h1 className="text-7xl text-[var(--color-text)]  p-1 my-5 m-auto w-fit text-center headerSectionAnimation">
        عن الموقع
      </h1>
      <div className="flex justify-between items-center">
        <div className="text-white  p-4 " data-aos="fade-up">
          <AOSWrapper />
          <p className="text-2xl  text-center leading-9 ">
            هذا الموقع يهدف إلى تقييم الألعاب الإلكترونية بناءً على مدى توافقها
            مع المعايير الشرعية الإسلامية. نحن نقوم بتقييم الألعاب بعناية لتحديد
            وجود أي محتوى يتعارض مع الشريعة الإسلامية، مثل: وجود مشاهد فاحشة،
            تعري، شركيات، مشاهد شذوذ جنسي، أو أي ممارسات تخالف القيم الأخلاقية
            والدينية. يتيح الموقع للمستخدمين البحث عن الألعاب التي يرغبون في
            تجربتها والتأكد من خلوها من أي محاذير شرعية. بهذا الشكل، نساعدك على
            اتخاذ قرارات مدروسة حول الألعاب التي يمكنك الاستمتاع بها دون القلق
            من المحتويات غير المناسبة. هدفنا هو توفير بيئة آمنة وممتعة للأفراد
            والعائلات المسلمة، بحيث يتمكن كل فرد من التمتع بالألعاب الإلكترونية
            بشكل يتوافق مع قيمه ومبادئه.
            <br />
          </p>
        </div>
        <div data-aos="fade-up" className="max-md:hidden">
          <AOSWrapper />
          <img
            src="/photos/About us page-amico.png"
            className=""
            width={"4000px"}
            height={"4000px"}
          />
        </div>
      </div>
    </div>
  );
}
