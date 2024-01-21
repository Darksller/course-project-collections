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
import { LikeButton } from '@/components/ui/like-button'
import { LanguageSelect } from '@/components/ui/header/language-select'
import SearchBar from '@/components/ui/header/search-bar'
import { ItemCard } from '@/components/ui/item-card'

export function CollectionPage() {
  const { collection } = collectionRoute.useLoaderData()
  if (!collection) return <h1 className="text-4xl">Collection not found</h1>
  return (
    <div className="h-full px-4 py-4">
      <Card className="flex w-full flex-col gap-5 border border-purple-700/50 p-5 sm:grid sm:grid-cols-3">
        <div className="h-full w-full  ">
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
        <div className="grid grid-rows-3 border-purple-700/50 max-sm:border-t-[1px] sm:col-span-2 sm:border-l-[1px] dark:border-white/50">
          <CardHeader className="flex p-3 px-6 pt-7 ">
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
          <CardContent className="row-span-2 mx-6 grid grid-cols-3 gap-4 border-t-[1px]  border-purple-700/50 dark:border-white/50">
            <div className="flex h-full flex-col gap-2  border-white/30 py-4">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl"
              >
                Описание
              </Label>
              <div className="w-full border-b-2 border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis break-all">
                {collection.description}
              </div>
            </div>
            <div className="col-span-2 flex h-full flex-col gap-2 rounded-xl border-white/30 px-2 py-4">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl"
              >
                Дополнительные поля
              </Label>
              <div className="w-full border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="grid w-full grid-cols-3 overflow-hidden text-ellipsis break-all">
                <div>Name</div>
                <div>Type</div>
                <div>State</div>
              </div>
              <div className="w-full  border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
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
          <CardFooter className="mx-6 flex justify-end border-t-[1px] border-purple-700/50 py-2 dark:border-white/50">
            <LikeButton />
          </CardFooter>
        </div>
      </Card>

      <div className="px-10 pt-10">
        <div className="w-full border-b-[1px] border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
        <div className="flex w-full justify-end py-2">
          <Button>Add item</Button>
        </div>
        <div className="flex py-2">
          <div className="text-3xl">Items:</div>
          <div className="flex w-full justify-end gap-4">
            <div>
              <SearchBar />
            </div>
            <div>
              <LanguageSelect />
            </div>
          </div>
        </div>
        <div className="w-full border-b-[1px] border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
        <div className="m-auto flex flex-wrap py-5">
          {collection.items?.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
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
          <ItemCard />
          <ItemCard />
          <ItemCard />
        </div>
      </div>
    </div>
  )
}
