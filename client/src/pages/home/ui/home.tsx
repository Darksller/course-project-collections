import introVideo from '@/shared/assets/videos/intro.mp4'
import secondImg from '@/shared/assets/images/second.png'
import fourthImg from '@/shared/assets/images/fourth.jpg'
import thirdImg from '@/shared/assets/images/third.jpeg'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { HomeImageSection } from './home-image-section'

export function Home() {
  const { t } = useTranslation('global')

  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 flex h-[100dvh] justify-center">
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />

        <div className="absolute top-[50%] z-[100] w-full translate-y-[-80%] p-4 text-left text-5xl font-extrabold lg:left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-80%] lg:text-center lg:text-7xl">
          {t('home.entranceText')}
        </div>

        <Link
          to="/"
          className="group absolute top-[70%] flex w-full max-w-3xl cursor-pointer items-center justify-center bg-white/50 px-5 backdrop-blur dark:bg-purple-500/50 lg:rounded-full "
        >
          <div className="flex py-2 text-4xl transition-all duration-300 lg:text-6xl lg:group-hover:scale-110 ">
            {t('main.exploreButton')}
          </div>
        </Link>
      </div>

      <HomeImageSection className="h-[125dvh]" imageSrc={secondImg}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-7xl lg:text-9xl ">
            {t('home.five')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]"></div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[125dvh]" imageSrc={thirdImg}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-9xl ">
            {t('home.fiveItems')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]"></div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[105dvh]" imageSrc={fourthImg}>
        <div className="w-[50%]">
          <div className="top-[50%] z-[100] flex w-full translate-y-[-80%] flex-col lg:left-[50%] lg:top-[50%] ">
            <div className="font-cgb bg-white/40 p-4 text-left text-5xl font-extrabold backdrop-blur transition-all duration-500 dark:bg-purple-500/50 dark:text-white lg:text-center lg:text-7xl">
              {t('home.tagCloud')}
            </div>
          </div>
        </div>
      </HomeImageSection>
    </div>
  )
}
