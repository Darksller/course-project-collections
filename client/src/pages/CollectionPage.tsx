import { collectionRoute } from '@/routes'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn-ui/card'
import { Label } from '@/components/ui/shadcn-ui/label'
import { LockClosedIcon, LockOpen1Icon } from '@radix-ui/react-icons'
import { dummyCollectionImage } from '@/constants/media'
import { LikeButton } from '@/components/ui/like-button'
import { LanguageSelect } from '@/components/ui/header/language-select'
import SearchBar from '@/components/ui/header/search-bar'
import { v4 } from 'uuid'
import { Fragment } from 'react'
import { ItemPage } from './ItemPage'
import { DialogWrapper } from '@/components/ui/dialog-wrapper'
import { AddItemPage } from './AddItemPage'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

export function CollectionPage() {
  const isAuthenticated = useIsAuthenticated()
  const { collection } = collectionRoute.useLoaderData()
  if (!collection) return <h1 className="text-4xl">Collection not found</h1>

  return (
    <div className="h-full px-4 py-4 ">
      <Card className="flex w-full flex-col gap-5 border border-purple-700/50 p-5 max-sm:pb-0 sm:grid sm:grid-cols-3 sm:rounded-3xl">
        <div className="h-full w-full  ">
          <div className="h-full w-full overflow-hidden rounded-xl border ">
            <img
              className="h-full w-full object-cover max-sm:h-[200px]"
              src={collection.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = dummyCollectionImage
              }}
            />
          </div>
        </div>
        <div className="grid grid-rows-3 border-purple-700/50 max-sm:flex max-sm:flex-col max-sm:border-t-[1px] sm:col-span-2 sm:border-l-[1px] dark:border-white/50">
          <CardHeader className="flex p-0 pt-7 max-sm:py-4 sm:p-3 sm:px-6">
            <CardTitle className="flex w-full items-center justify-between">
              <div className="flex text-3xl max-lg:text-2xl max-sm:text-xl lg:items-center">
                {collection.name}
                {collection.isClosed ? (
                  <LockClosedIcon className="ml-2 sm:size-7" />
                ) : (
                  <LockOpen1Icon className="ml-2 sm:size-7" />
                )}
              </div>
              <Button
                variant={'ghost'}
                className=" border-[1px] border-purple-600 dark:border-white"
              >
                Редактировать
              </Button>
            </CardTitle>
            <div className="flex justify-between text-[14px]">
              <div>Author: {collection.user.username}</div>
              <div>Category: {collection.category.name}</div>
            </div>
          </CardHeader>

          <CardContent className="row-span-2 grid grid-cols-3 gap-4 border-t-[1px] border-purple-700/50 max-md:p-0 sm:mx-6 dark:border-white/50">
            <div className="flex h-full flex-col gap-2 border-white/30 py-4">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl max-md:text-base max-md:font-bold"
              >
                Описание
              </Label>
              <div className="w-full border-b-2 border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis max-md:text-[14px] max-sm:text-[11px]">
                {collection.description}
              </div>
            </div>
            <div className="col-span-2 flex h-full flex-col gap-2 rounded-xl border-white/30 py-4 max-md:text-[14px] max-sm:text-[11px] md:px-2">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl max-md:text-base max-md:font-bold"
              >
                Дополнительные поля
              </Label>
              <div className="w-full border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="grid w-full grid-cols-3 overflow-hidden text-ellipsis break-all">
                <div>Name</div>
                <div>Type</div>
                <div>State</div>
              </div>
              <div className="w-full border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis break-all">
                <div className="grid w-full grid-cols-3 overflow-hidden text-ellipsis break-all">
                  {collection.customFields?.map((field) => (
                    <Fragment key={v4()}>
                      <div>{field.fieldName}</div>
                      <div>{field.fieldType}</div>
                      <div>{field.fieldState}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end border-t-[1px] border-purple-700/50 py-2 max-md:pr-0  sm:mx-6 dark:border-white/50">
            <LikeButton />
          </CardFooter>
        </div>
      </Card>

      <div className="px-10 pt-10">
        <div className="w-full border-b-[1px] border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
        <div className="flex w-full justify-end py-2">
          {isAuthenticated() && (
            <DialogWrapper
              className="scrollbar-thin"
              contentClassName="sm:w-[50%] h-[70%] scrollbar-thin overflow-y-scrollbar overflow-y-scroll"
              dialogTitle={'Add Item'}
              dialogDescription="There is the page where you can add your own item!"
              dialogContent={
                <AddItemPage
                  collectionId={collection._id}
                  customFields={collection.customFields}
                />
              }
            >
              Add Item
            </DialogWrapper>
          )}
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
        <div className="m-auto flex flex-wrap gap-4 py-5">
          {collection.items?.map((item) => <ItemPage key={v4()} item={item} />)}
        </div>
      </div>
    </div>
  )
}
