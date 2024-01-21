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
import { LockClosedIcon } from '@radix-ui/react-icons'
import dummyImage from '@/assets/images/dummyCollectionImage.jpg'
import { ItemCard } from '@/components/ui/item-card'
import { LikeButton } from '@/components/ui/like-button'

export function CollectionPage() {
  const { collection } = collectionRoute.useLoaderData()
  if (!collection) return <h1 className="text-4xl">Collection not found</h1>
  return (
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
              <Button
                variant={'ghost'}
                className=" border-[1px] border-purple-600 dark:border-white"
              >
                Редактировать
              </Button>
            </CardTitle>
            <CardDescription className="flex justify-between">
              <div>Author: {collection.user.username}</div>
              <div>Category: {collection.category.name}</div>
            </CardDescription>
          </CardHeader>
          <CardContent className="row-span-2 grid grid-cols-3 gap-4 border-t-[1px]  dark:border-white/50">
            <div className="flex h-full flex-col gap-2 rounded-xl  border-white/30 p-4">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl"
              >
                Описание
              </Label>
              <div className="w-full border-b-2  transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis break-all">
                {collection.description}
              </div>
            </div>
            <div className="col-span-2 flex h-full flex-col gap-2 rounded-xl border-white/30 p-4">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl"
              >
                Дополнительные поля
              </Label>
              <div className="w-full border-b-2  transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="grid w-full grid-cols-3 overflow-hidden text-ellipsis break-all">
                <div>Name</div>
                <div>Type</div>
                <div>State</div>
              </div>
              <div className="w-full border-b-2  transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis break-all">
                <div className="grid w-full grid-cols-3 overflow-hidden text-ellipsis break-all">
                  {collection.customFields?.map((field) => (
                    <>
                      <div>{field.fieldName}</div>
                      <div>{field.fieldType}</div>
                      <div>{field.fieldState}</div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t-[1px] py-2 dark:border-white/50">
            <LikeButton />
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
  )
}
