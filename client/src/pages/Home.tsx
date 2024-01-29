import { introVideo } from '@/constants/media'
import secondImg from '@/assets/images/second.png'
import fourthImg from '@/assets/images/fourth.jpg'
import thirdImg from '@/assets/images/third.jpeg'
import { HomeImageSection } from '@/components/ui/home/home-image-section'
import { useTranslation } from 'react-i18next'
import { SmoothArrow } from '@/components/ui/smooth-arrow'
import { useGetBiggestQuery } from '@/api/collectionsApi'
import { CollectionCard } from '@/components/ui/collections/collection-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/shadcn-ui/carousel'
import { useGetFiveLatestItemsQuery } from '@/api/itemsApi'
import { ItemPage } from './ItemPage'
import TagCloud from '@/components/ui/home/tag-cloud'
import { Link } from '@tanstack/react-router'

export function Home() {
  const { data } = useGetBiggestQuery()
  const { data: items } = useGetFiveLatestItemsQuery()
  const { t } = useTranslation('global')
  return (
    <div className="absolute top-0 w-full">
      <div className="sticky top-0 flex h-[100dvh] justify-center bg-black">
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 h-full w-full object-cover "
        />

        <div className="absolute top-[50%] z-[100] flex w-full translate-y-[-80%] flex-col  lg:left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-80%] ">
          <div className="bg-white/40 p-4 text-left font-cgb text-5xl font-extrabold backdrop-blur transition-all duration-500 dark:bg-purple-500/50 dark:text-white lg:text-center lg:text-7xl">
            {t('main.enterText')}
          </div>
        </div>
        <Link
          to="/collections/create"
          className="group absolute top-[70%] flex w-full max-w-3xl cursor-pointer items-center justify-center bg-white/50 px-5 backdrop-blur dark:bg-purple-500/50 lg:rounded-full"
        >
          <SmoothArrow className="right-[85%]" />
          <div className="flex py-2 text-4xl italic transition-all duration-300 lg:text-6xl lg:group-hover:scale-110 ">
            {t('main.exploreButton')}
          </div>
          <SmoothArrow className="left-[80%]" />
        </Link>
      </div>

      <HomeImageSection className="h-[125dvh]" imageSrc={secondImg}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-7xl lg:text-9xl ">
            {t('home.five')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]">
            {data?.length && data?.length > 0 ? (
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full max-w-[80%] max-sm:scale-90"
              >
                <CarouselContent>
                  {data?.map((collection, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4"
                    >
                      <CollectionCard
                        key={collection._id}
                        collection={collection}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <h2 className="mt-[10%] text-6xl">
                {t('home.collectionsNotFound')}
              </h2>
            )}
          </div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[125dvh]" imageSrc={thirdImg}>
        <div className="absolute top-[10%] w-full">
          <div className="text-5xl uppercase sm:text-9xl ">
            {t('home.fiveItems')}
          </div>
          <div className="mt-[30%] flex items-center justify-center px-4 sm:mt-[5%]">
            {items?.length && items?.length > 0 ? (
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="z-[999] w-full max-w-[80%] overflow-y-visible max-sm:scale-90"
              >
                <CarouselContent>
                  {items?.map((item, index) => (
                    <CarouselItem
                      key={index}
                      className="overflow-y-visible md:basis-1/2 lg:basis-1/4"
                    >
                      <ItemPage
                        key={item._id}
                        item={item}
                        hideCollection={false}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            ) : (
              <h2 className="mt-[10%] text-6xl">{t('home.itemsNotFound')}</h2>
            )}
          </div>
        </div>
      </HomeImageSection>
      <HomeImageSection className="h-[105dvh]" imageSrc={fourthImg}>
        <div className="w-[50%]">
          <div className="top-[50%] z-[100] flex w-full translate-y-[-80%] flex-col lg:left-[50%] lg:top-[50%] ">
            <div className="bg-white/40 p-4 text-left font-cgb text-5xl font-extrabold backdrop-blur transition-all duration-500 dark:bg-purple-500/50 dark:text-white lg:text-center lg:text-7xl">
              {t('home.tagCloud')}
            </div>
          </div>
          <div className=" bg-black/50">
            <TagCloud />
          </div>
        </div>
      </HomeImageSection>
    </div>
  )
}
