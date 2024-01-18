import intro from "@/assets/videos/intro.mp4";
import secondImg from "@/assets/images/second.png";
import fourthImg from "@/assets/images/fourth.jpg";
import thirdImg from "@/assets/images/third.jpeg";
import { HomeImageSection } from "@/components/ui/home-image-section";
import { useTranslation } from "react-i18next";
import { SmoothArrow } from "@/components/ui/smooth-arrow";
import { Link } from "@tanstack/react-router";

export function Home() {
  const { t } = useTranslation("global");

  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 flex h-[100dvh] justify-center bg-black">
        <video
          src={intro}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />

        <div className="absolute top-[50%] z-[100] flex w-full translate-y-[-80%] flex-col  lg:left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-80%] ">
          <h1 className="bg-white/40 p-4 text-left font-cgb text-5xl font-extrabold text-pink-500 backdrop-blur transition-all duration-500 lg:text-center lg:text-7xl dark:bg-pink-500/50 dark:text-white">
            {t(`main.enterText`)}
          </h1>
        </div>
        <Link
          to="/collections/createCollection"
          className="group absolute top-[70%] flex w-full max-w-3xl cursor-pointer items-center justify-center bg-white/50 px-5 backdrop-blur lg:rounded-full dark:bg-pink-500/50"
        >
          <SmoothArrow className="right-[85%]" />
          <div className="flex py-2 text-4xl italic transition-all duration-300 lg:text-6xl lg:group-hover:scale-110 ">
            {t("main.exploreButton")}
          </div>
          <SmoothArrow className="left-[80%]" />
        </Link>
      </div>

      <HomeImageSection className="h-[125dvh]" imageSrc={secondImg}>
        <div className="mt-2 p-4 text-center font-muli text-2xl">
          {t("main.secondSectionDescription")}
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[125dvh]" imageSrc={thirdImg}>
        Example text
      </HomeImageSection>
      <HomeImageSection className="h-[105dvh]" imageSrc={fourthImg}>
        Example text
      </HomeImageSection>
    </div>
  );
}
