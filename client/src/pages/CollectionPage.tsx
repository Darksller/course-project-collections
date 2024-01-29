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
import ReactMarkdown from 'react-markdown'
import { format } from 'date-fns'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { User } from '@/schemas/dbSchemas'
import { useLike } from '@/hooks/useLike'
import { Link } from '@tanstack/react-router'
import { useIsOwner } from '@/hooks/useIsOwner'
import { collectionRoute } from '@/router/routes/collection.routes'

export function CollectionPage() {
  const user = useAuthUser<User>()
  const { collection } = collectionRoute.useLoaderData()
  const { isCollectionOwner } = useIsOwner({ collectionId: collection?._id })
  const { collectionLiked, onLike } = useLike({ collectionId: collection?._id })
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
        <div className="grid grid-rows-3 border-purple-700/50 dark:border-white/50 max-sm:flex max-sm:flex-col max-sm:border-t-[1px] sm:col-span-2 sm:border-l-[1px]">
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
              {user && isCollectionOwner && (
                <Link
                  to={'/collections/edit/$collectionId'}
                  params={{ collectionId: collection._id }}
                  className="border-[1px] border-white hover:border-purple-700"
                >
                  <Button
                    variant={'ghost'}
                    className="rounded-none border-[1px] border-purple-600 hover:border-white hover:bg-purple-500 hover:text-white "
                  >
                    Редактировать
                  </Button>
                </Link>
              )}
            </CardTitle>
            <div className="flex justify-between text-[14px]">
              <div>
                Author: @
                {collection.user != null ? collection.user.username : 'deleted'}
              </div>
              <div>Category: {collection.category.name}</div>
            </div>
          </CardHeader>

          <CardContent className="row-span-2 grid grid-cols-2 gap-4 border-t-[1px] border-purple-700/50 dark:border-white/50 max-md:p-0 sm:mx-6">
            <div className="flex h-full max-h-[250px] flex-col gap-2  border-white/30 py-4 ">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl max-md:text-base max-md:font-bold"
              >
                Описание
              </Label>
              <div className="w-full border-b-2 border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden overflow-y-scroll text-ellipsis scrollbar-thin max-md:text-[14px] max-sm:text-[11px]">
                <ReactMarkdown className={'prose'}>
                  {String(collection.description)}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex h-full flex-col gap-2 rounded-xl border-white/30 py-4 max-md:text-[14px] max-sm:text-[11px] md:px-2">
              <Label
                htmlFor="description"
                className="overflow-hidden text-ellipsis break-all text-2xl max-md:text-base max-md:font-bold"
              >
                Дополнительные поля
              </Label>
              <div className="w-full border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="grid w-full grid-cols-2 overflow-hidden text-ellipsis break-all">
                <div>Name</div>
                <div>Type</div>
              </div>
              <div className="w-full border-b-2  border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <div className="overflow-hidden text-ellipsis break-all">
                <div className="grid w-full grid-cols-2 overflow-hidden text-ellipsis break-all">
                  {collection.customFields?.map((field) => (
                    <Fragment key={v4()}>
                      <div>{field.fieldName}</div>
                      <div>{field.fieldType}</div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t-[1px] border-purple-700/50 py-2 dark:border-white/50  max-md:pr-0 sm:mx-6">
            <div>{format(String(collection.creationDate), 'PPP')}</div>
            <LikeButton onChange={onLike} liked={collectionLiked} />
          </CardFooter>
        </div>
      </Card>

      <div className="px-10 pt-10">
        <div className="w-full border-b-[1px] border-purple-700/50 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
        <div className="flex w-full justify-end py-2">
          {((!collection.isClosed && user) || isCollectionOwner) && (
            <DialogWrapper
              className="border border-purple-700 p-4 transition-all duration-300 scrollbar-thin hover:bg-purple-400 hover:text-white"
              contentClassName="sm:w-[50%] h-[70%] scrollbar-thin overflow-y-scrollbar overflow-y-scroll"
              dialogTitle={'Add Item'}
              dialogDescription="This is the page where you can add your own item!"
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
        {collection.items.length > 0 && (
          <div>
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
            <div className="m-auto flex flex-wrap justify-between gap-4 py-5">
              {collection.items?.map((item) => (
                <ItemPage key={v4()} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
