"use client";

// framer motion
import { motion } from "motion/react";
export default function OurFeatures() {
  // motion virables
  const headerMoving = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const featuresCards = {
    hidden: { opacity: 0, transform: "translateY(30px)" },
    visible: {
      opacity: 1,
      transform: "translateY(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const featuresCardsParrrent = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  let features = [
    {
      id: 1,
      icon: "🕹️",
      title: "تقييمات المجتمع",
      description:
        "يعتمد الموقع على تقييمات وتجارب المستخدمين لتوضيح المحتوى الموجود داخل الألعاب، مما يساعدك على اتخاذ قرار يناسب قيمك.",
    },
    {
      id: 2,
      icon: "🔄",
      title: "قاعدة بيانات متجددة",
      description:
        "نعمل على إضافة ألعاب جديدة باستمرار، بينما يشارك المستخدمون بتقييماتهم وتجاربهم لتبقى المعلومات محدثة.",
    },
    {
      id: 3,
      icon: "🔍",
      title: "بحث سريع",
      description:
        "ابحث عن أي لعبة بالاسم للوصول إلى تقييمات المجتمع ومعرفة محتواها في ثوانٍ.",
    },
    {
      id: 4,
      icon: "🛡️",
      title: "تجربة استخدام بسيطة",
      description:
        "ابحث عن أي لعبة واستعرض تقييمات المجتمع بسهولة من خلال واجهة سريعة وسهلة الاستخدام.",
    },
    {
      id: 5,
      icon: "🎮",
      title: "تنوع في الألعاب",
      description:
        "نُقيّم ألعابًا من مختلف الأنواع والمنصات لتجد دائمًا ما يناسب ذوقك دون مخالفة لمعتقداتك.",
    },
    {
      id: 6,
      icon: "🤝",
      title: "نحو محتوى نظيف",
      description:
        "هدفنا هو بناء مجتمع من اللاعبين الواعين الذين يسعون للترفيه المباح بعيدًا عن كل ما يُخالف قيمنا الإسلامية.",
    },
  ];

  return (
    <div id="ourFeatures" className=" bg-[var(--bg-section)] w-full py-10 px-7">
      <div className=" text-center flex flex-col items-center">
        <motion.h2
          variants={headerMoving}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="headerSectionAnimation w-fit text-7xl text-[var(--color-text)]"
        >
          مميزاتنا
        </motion.h2>
        {/* cards */}
        <motion.div
          variants={featuresCardsParrrent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-10"
        >
          {features.map((ele) => {
            return (
              <motion.div
                key={ele.id}
                variants={featuresCards}
                className=" featureCard bg-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.06]"
              >
                <div className="flex justify-start items-center py-3">
                  <div className="mx-2 text-3xl">{ele.icon}</div>
                  <h3 className=" text-xl text-[var(--color-text)]">
                    {ele.title}
                  </h3>
                </div>
                <p className="text-start text-[var(--normal-text)] leading-8 text-[18px] py-2">
                  {ele.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
