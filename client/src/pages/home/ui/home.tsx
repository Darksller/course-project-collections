import introVideo from '@/shared/assets/videos/intro.mp4'
import one from '@/shared/assets/images/second.png'
import two from '@/shared/assets/images/third.jpeg'
import three from '@/shared/assets/images/fourth.jpg'
import { TextGenerateEffect } from '@/shared/ui/aceternity-ui'
import { useTranslation } from 'react-i18next'
import { HomeImageSection } from './home-image-section'

export function Home() {
  const { t } = useTranslation('global')

  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 h-[100dvh]">
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />
        <div className="absolute top-[20%] flex w-full justify-center sm:top-[30%]">
          <TextGenerateEffect words={t('home.entranceText')} />
        </div>
      </div>

      <HomeImageSection className="h-[125dvh]" imageSrc={one}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-7xl lg:text-9xl ">
            {t('home.five')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]"></div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[125dvh]" imageSrc={two}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-9xl ">
            {t('home.fiveItems')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]"></div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[105dvh]" imageSrc={three}>
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
