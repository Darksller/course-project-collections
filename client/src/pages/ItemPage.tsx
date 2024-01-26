import { ItemCard } from '@/components/ui/collections/item-card'
import { ItemSheetToOpen } from '@/components/ui/item-sheet-to-open'
import { Button } from '@/components/ui/shadcn-ui/button'
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/shadcn-ui/sheet'
import { Item, UserComment } from '@/schemas/dbSchemas'
import { dummyItemImage } from '@/constants/media'
import { Separator } from '@/components/ui/separator'
import { useIsOwner } from '@/hooks/useIsOwner'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { PaperPlaneIcon, PersonIcon } from '@radix-ui/react-icons'
import { Textarea } from '@/components/ui/shadcn-ui/textarea'
import { useEffect, useState } from 'react'
import { joinRoom, onComment, sendComment } from '@/constants/socket'
import { LikeButton } from '@/components/ui/like-button'

type ItemPageProps = {
  item: Item
  hideCollection?: boolean
}

export function ItemPage({ item, hideCollection = true }: ItemPageProps) {
  const [comments, setComments] = useState<UserComment[]>(item.comments)
  const [comment, setComment] = useState<string>('')
  const { isItemOwner, user } = useIsOwner({ itemId: item._id })
  const [edit, setEdit] = useState<boolean>(false)

  useEffect(() => {
    joinRoom(item._id)
    onComment(setComments)
  }, [])
  function onEdit(): void {
    setEdit(true)
  }

  return (
    <ItemSheetToOpen itemId={item._id}>
      <>
        <SheetTrigger>
          <ItemCard item={item} hideCollection={hideCollection} />
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll scroll-smooth backdrop-blur scrollbar-thin scrollbar-track-white/50 scrollbar-thumb-purple-700/80 lg:w-[40%] dark:bg-purple-950/80 dark:scrollbar-track-white/50 dark:scrollbar-thumb-purple-700/80">
          <SheetHeader className="py-4">
            <SheetTitle className="flex flex-wrap items-center justify-between text-3xl uppercase  text-purple-700 md:text-6xl">
              {item.name}
              {isItemOwner && !edit && (
                <Button
                  variant={'ghost'}
                  onClick={onEdit}
                  className="h-full rounded-xl border-[1px] border-purple-600 text-purple-700 hover:border-white hover:bg-purple-500 hover:text-white"
                >
                  Редактировать
                </Button>
              )}
              {edit && (
                <div>
                  <Button className="">Cancel</Button>
                  <Button className="">Edit</Button>
                </div>
              )}
            </SheetTitle>
          </SheetHeader>
          <Separator className="rounded-xl border-4 border-purple-700" />
          <div className="grid grid-cols-2 gap-2 rounded-xl p-2 md:h-[500px]">
            <div className="h-full ">
              <div className="flex flex-wrap justify-between  py-2">
                <Link>
                  @{item.user != null ? item.user.username : 'deleted'}
                </Link>
                <div>{format(item.creationDate, 'PPP')}</div>
              </div>
              <Separator className="rounded-xl border-2 border-purple-700" />
              <div className="py-2">Description:</div>
              <div className="h-full max-h-16 overflow-y-scroll rounded-xl border-[1px] border-purple-700 bg-white/50  p-4 scrollbar-thin sm:max-h-[390px]">
                {item.description}
              </div>
            </div>

            <img
              className="h-full w-full overflow-hidden rounded-xl object-cover py-2   max-sm:h-[200px] "
              src={item.imageUrl}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null
                currentTarget.src = dummyItemImage
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {item &&
              item.tags?.map((tag) => (
                <Link
                  to="/"
                  style={{ color: `${tag.color}`, borderColor: `${tag.color}` }}
                  key={tag._id}
                  className={`rounded-[27px] border-[1px] p-1 px-4  transition-all duration-500 ease-in-out`}
                >
                  {tag.name}
                </Link>
              ))}
            <Separator className="py-2" />
          </div>

          {user && (
            <>
              <div className="mt-4 grid h-20 w-full grid-cols-10 rounded-3xl border-[1px] border-purple-700 p-2 dark:border-white">
                <div className="flex items-center justify-center border-r-[1px] border-purple-700 p-2 max-sm:col-span-2 dark:border-white">
                  <Avatar>
                    <AvatarImage
                      className="size-9 rounded-full border border-purple-700 p-2 dark:border-white"
                      src={user.imageUrl}
                    />
                    <AvatarFallback>
                      <PersonIcon className="size-9 rounded-full border border-purple-700 p-2 dark:border-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="col-span-6  overflow-y-scroll px-2 scrollbar-thin sm:col-span-8 sm:max-h-20">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Leave a comment..."
                    className="h-full w-full rounded-none border-none focus:border-none"
                  ></Textarea>
                </div>
                <div className="flex items-center justify-center border-l-[1px] border-purple-700 p-2 max-sm:col-span-2 dark:border-white">
                  <Button
                    onClick={() => {
                      const data = {
                        user,
                        content: comment,
                        creationDate: new Date(),
                        likeCount: 0,
                      }
                      setComments((prev) => [...prev, data])
                      sendComment(item._id, data)
                    }}
                    size={'icon'}
                    variant={'outline'}
                    className="border-purple-700 p-2 dark:border-white"
                  >
                    <PaperPlaneIcon />
                  </Button>
                </div>
              </div>
              <Separator className="py-2" />
            </>
          )}
          {comments.length > 0 && (
            <>
              <div className="pt-4">Comments:</div>
              <Separator className="py-2" />
            </>
          )}
          {comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment._id}>
                <div className="mt-4 grid h-20 w-full grid-cols-10 rounded-3xl border-[1px] border-purple-700 p-2 dark:border-white">
                  <div className="flex items-center justify-center border-r-[1px] border-purple-700 p-2 max-sm:col-span-2 dark:border-white">
                    <Avatar>
                      <AvatarImage
                        className="size-9 rounded-full border border-purple-700 p-2 dark:border-white"
                        src={comment.user?.imageUrl}
                      />
                      <AvatarFallback>
                        <PersonIcon className="size-9 rounded-full border border-purple-700 p-2 dark:border-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="col-span-6 max-h-20 overflow-y-scroll px-2 scrollbar-thin sm:col-span-8">
                    <div className="text-[14px]">{comment.user.username}:</div>
                    {comment.content}
                  </div>
                  <div className="flex items-center justify-center border-l-[1px] border-purple-700 p-2 max-sm:col-span-2 dark:border-white">
                    <LikeButton
                      liked={false}
                      onChange={function (): void {
                        throw new Error('Function not implemented.')
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
        </SheetContent>
      </>
    </ItemSheetToOpen>
  )
}
