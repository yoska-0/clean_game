"use client";

import Image from "next/image";
import Link from "next/link";

export default function GameReviewPage() {
  // معلومات اللعبة - يمكن استبدالها بالبيانات الفعلية من API
  const gameInfo = {
    id: "islets",
    name: "Islets",
    image: "/game-character.png", // يجب وضع الصورة في مجلد public
    ratings: {
      shirk: "لا يوجد", // الشركيات
      lgbt: "لا يوجد", // الشذوذ
      nudity: "لا يوجد", // التعري
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-right">
      {/* شريط التنقل العلوي */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white font-bold text-xl">
                مراجعة الألعاب الإسلامية
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Link
                href="/games"
                className="px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                الألعاب
              </Link>
              <Link
                href="/categories"
                className="px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                التصنيفات
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                من نحن
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 text-sm text-white hover:bg-gray-700 rounded"
              >
                اتصل بنا
              </Link>
            </div>
            {/* زر القائمة للشاشات الصغيرة */}
            <div className="md:hidden">
              <button className="text-white hover:text-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* رأس صفحة اللعبة */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            {/* صورة اللعبة */}
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative w-64 h-64">
                <Image
                  src="/photos/2566425.jpg" // يمكن تغييرها حسب اللعبة
                  alt={gameInfo.name}
                  width={256}
                  height={256}
                  className="object-contain"
                />
              </div>
            </div>

            {/* معلومات اللعبة */}
            <div className="w-full md:w-2/3 text-right">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {gameInfo.name}
              </h1>

              {/* بطاقات التقييم */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    الشركيات:
                  </h2>
                  <div className="bg-blue-900 text-center py-2 px-4 rounded">
                    <p className="text-white">{gameInfo.ratings.shirk}</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    الشذوذ:
                  </h2>
                  <div className="bg-blue-900 text-center py-2 px-4 rounded">
                    <p className="text-white">{gameInfo.ratings.lgbt}</p>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">
                    التعري:
                  </h2>
                  <div className="bg-blue-900 text-center py-2 px-4 rounded">
                    <p className="text-white">{gameInfo.ratings.nudity}</p>
                  </div>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition">
                  تحميل اللعبة
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition">
                  مشاهدة فيديو
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition">
                  المزيد من الصور
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* التحذير والإخلاء من المسؤولية */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-orange-500 border-r-4 border-orange-600 rounded p-4 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white text-sm">
              التقييمات الواردة على هذا الموقع تعكس رأيي الشخصي بناءً على تجربتي
              الخاصة أو بحثت عنه، وقد لا تكون خالية من الأخطاء. إذا كان لديك رأي
              مختلف أو ملاحظات، فقد تجد في مشاركتها لتعزيز الفائدة للجميع.
            </p>
          </div>
        </div>

        {/* تقييم إسلامي شامل للعبة */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            تقييم إسلامي شامل
          </h2>

          <div className="space-y-6">
            {/* قسم الشركيات */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                الشركيات:
              </h3>
              <p className="text-gray-300">
                لا تحتوي اللعبة على أي إشارات للشرك بالله أو عبادة آلهة متعددة.
                اللعبة خالية من أي طقوس وثنية أو سحرية.
              </p>
            </div>

            {/* قسم الشذوذ */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                الشذوذ:
              </h3>
              <p className="text-gray-300">
                لا توجد أي إشارات للشذوذ أو العلاقات المثلية في اللعبة. جميع
                العلاقات والشخصيات تظهر بشكل طبيعي.
              </p>
            </div>

            {/* قسم التعري */}
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                التعري:
              </h3>
              <p className="text-gray-300">
                لا يوجد أي مشاهد أو شخصيات عارية في اللعبة. جميع الشخصيات ترتدي
                ملابس محتشمة.
              </p>
            </div>

            {/* قسم العنف */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                العنف:
              </h3>
              <p className="text-gray-300">
                تحتوي اللعبة على بعض مشاهد القتال البسيطة مع الوحوش وليس مع
                البشر. لا يوجد دماء أو مشاهد عنيفة واقعية.
              </p>
            </div>

            {/* قسم الموسيقى */}
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                الموسيقى:
              </h3>
              <p className="text-gray-300">
                تحتوي اللعبة على موسيقى خلفية طوال فترات اللعب. يمكن إيقاف
                الموسيقى من إعدادات اللعبة.
              </p>
            </div>
          </div>

          {/* الحكم العام */}
          <div className="mt-8 p-4 bg-green-900/50 rounded-lg border border-green-700">
            <h3 className="text-xl font-bold text-white mb-2">الحكم العام:</h3>
            <p className="text-green-300 text-lg">
              اللعبة مناسبة من الناحية الإسلامية ولا تحتوي على محتوى مخالف
              للشريعة الإسلامية.
            </p>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">معلومات إضافية</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                متطلبات التشغيل:
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>نظام التشغيل: Windows 10</li>
                <li>المعالج: Intel Core i5 أو ما يعادله</li>
                <li>الذاكرة: 8GB RAM</li>
                <li>بطاقة الرسومات: GTX 1050 أو ما يعادلها</li>
                <li>المساحة: 5GB</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">
                معلومات اللعبة:
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>سنة الإصدار: 2022</li>
                <li>المطور: Kyle Thompson</li>
                <li>الناشر: Armor Games Studios</li>
                <li>النوع: مغامرة، منصات</li>
                <li>الأنظمة: PC, Switch, PlayStation, Xbox</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* تذييل الصفحة */}
      <footer className="bg-gray-800 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">
                مراجعة الألعاب الإسلامية
              </h3>
              <p className="text-gray-400">
                موقع متخصص في تقييم الألعاب من منظور إسلامي لمساعدة المسلمين في
                اختيار الألعاب المناسبة.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">تواصل معنا</h3>
              <div className="flex space-x-4 justify-end">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">تويتر</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">فيسبوك</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">يوتيوب</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              جميع الحقوق محفوظة © {new Date().getFullYear()} مراجعة الألعاب
              الإسلامية
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
