import intro from "@/assets/videos/intro.mp4";
import secondImg from "@/assets/images/second.png";
import fourthImg from "@/assets/images/fourth.jpg";
import thirdImg from "@/assets/images/third.jpeg";
import { HomeImageSection } from "@/components/ui/home-image-section";
import { useTranslation } from "react-i18next";

export function Home() {
  const { t } = useTranslation("global");

  return (
    <div>
      <div className="sticky top-0 h-[100dvh] w-full bg-purple-400">
        <video
          src={intro}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />
        <div className="absolute top-[50%] z-[100] flex w-full translate-y-[-80%] flex-col  lg:left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-80%] ">
          <div className="font-cgb bg-white/40 p-4 text-left text-5xl font-extrabold text-pink-500 backdrop-blur transition-all duration-500 lg:text-center lg:text-7xl dark:bg-pink-500/50 dark:text-white">
            {t(`main.enterText`)}
          </div>
          {/* <AnimArrow className="absolute left-[50%] cursor-pointer bg-pink-500/50">
      {t("main.exploreButton")}
    </AnimArrow> */}
        </div>
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
