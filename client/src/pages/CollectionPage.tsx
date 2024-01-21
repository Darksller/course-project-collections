import { collectionRoute } from '@/routes'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn-ui/card'
import { Label } from '@/components/ui/shadcn-ui/label'
import {
  HeartFilledIcon,
  HeartIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons'
import dummyImage from '@/assets/images/dummyCollectionImage.jpg'
import { useState } from 'react'
import { ItemCard } from '@/components/ui/item-card'

export function CollectionPage() {
  const [isLiked, setLiked] = useState(false)
  const { collection } = collectionRoute.useLoaderData()
  if (!collection) return <h1 className="text-4xl">Collection not found</h1>
  return (
    <div className="mx-auto mt-12 max-w-1440 rounded-xl backdrop-blur dark:bg-white dark:bg-opacity-40">
      <div className="h-full px-4 py-4">
        <Card className="flex w-full flex-col  sm:grid sm:grid-cols-3">
          <div className="h-full w-full p-3 ">
            <div className="h-full w-full overflow-hidden rounded-xl border ">
              <img
                className="h-full w-full object-cover max-sm:h-[200px]"
                src={collection.imageUrl}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null
                  currentTarget.src = dummyImage
                }}
              />
            </div>
          </div>
          <div className="grid grid-rows-3 max-sm:border-t-[1px] sm:col-span-2 sm:border-l-[1px] dark:border-white/50 ">
            <CardHeader className="flex p-3 px-7 pt-7">
              <CardTitle className="flex w-full items-center justify-between">
                <div className="flex lg:text-3xl ">
                  {collection.name}
                  <LockClosedIcon className="ml-2" />
                </div>
                <Button className="dark:bg-[#B33047]">Редактировать</Button>
              </CardTitle>
              <CardDescription className="flex justify-between">
                <div>Author: {collection.user.username}</div>
                <div>Category: {collection.category.name}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="row-span-2 grid grid-cols-2 gap-4 border-t-[1px] pt-3 dark:border-white/50">
              <div className="flex h-full flex-col gap-2 rounded-xl  border-white/30 p-4">
                <Label
                  htmlFor="description"
                  className="overflow-hidden text-ellipsis break-all"
                >
                  Описание
                </Label>
                <div className="w-full border-b-2  transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
                <div className="overflow-hidden text-ellipsis break-all">
                  {collection.description}
                </div>
              </div>
              <div className="flex h-full flex-col gap-2 rounded-xl  border-white/30 p-4">
                <Label
                  htmlFor="description"
                  className="overflow-hidden text-ellipsis break-all"
                >
                  Дополнительные поля
                </Label>
                <div className="w-full border-b-2  transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
                <div className="overflow-hidden text-ellipsis break-all"></div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t-[1px] dark:border-white/50">
              <Button
                variant="ghost"
                className="ml-auto "
                onClick={() => setLiked((prev) => !prev)}
              >
                {!isLiked ? (
                  <HeartIcon className="size-7 transition-all duration-300 hover:scale-125" />
                ) : (
                  <HeartFilledIcon className="size-7  transition-all duration-300 hover:scale-125 " />
                )}
              </Button>
            </CardFooter>
          </div>
        </Card>
        <div className="flex flex-wrap pt-4">
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  )
}
