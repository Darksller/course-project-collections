import { InfoCircledIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Link } from '@tanstack/react-router'
import { LikeButton } from '../like-button'
import { Collection, User } from '@/schemas/dbSchemas'
import { dummyCollectionImage } from '@/constants/media'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useLike } from '@/hooks/useLike'
import ReactMarkdown from 'react-markdown'
type CollectionCardProps = {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const user = useAuthUser<User>()
  const { collectionLiked, onLike } = useLike({
    collectionId: collection._id,
  })

  return (
    <div className="group relative m-auto h-[250px] w-[225px] scale-95 cursor-pointer overflow-hidden rounded-md border-purple-300 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
      <div className="absolute right-0 top-0 z-50 h-14 w-11 translate-x-[10px] translate-y-[-22px] rounded-xl border border-white/50 backdrop-blur hover:animate-pulse md:hidden">
        <InfoCircledIcon className="ml-1 mt-[26px] size-6 text-white " />
      </div>
      <Link
        to={'/collections/$collectionId'}
        params={{ collectionId: collection._id }}
        className="group/img"
      >
        <img
          className={
            'absolute h-full w-full overflow-hidden rounded-md bg-cover object-cover transition-all delay-1000 duration-1000'
          }
          src={collection.imageUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = dummyCollectionImage
          }}
        />
        <div className="relative h-full w-full rounded-md bg-black/45 text-white opacity-0 transition-all duration-500 group-hover/img:z-[999] max-md:group-hover:opacity-100 md:group-hover/img:opacity-100">
          <div className="relative h-[80%] max-w-[92%] pl-5 ">
            <div className="text-sm italic tracking-wide text-white transition-all duration-1000 group-hover/img:translate-y-[160%] group-hover:translate-y-[160%] group-hover/img:text-2xl group-hover:text-2xl">
              {collection.name}
            </div>
            <div className="absolute bottom-0 max-h-[50%] w-[92%] translate-y-full overflow-hidden text-ellipsis break-all text-sm text-white opacity-0 duration-1000 group-hover/img:translate-y-0 group-hover:translate-y-0 group-hover/img:opacity-100 group-hover:opacity-100">
              <div className="w-0 border-b-2 text-white transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-white" />
              <ReactMarkdown className={'prose text-white '}>
                {String(collection.description)}
              </ReactMarkdown>
            </div>
          </div>

          <div className="absolute bottom-2 left-3 max-w-[50%] translate-x-[-300%] overflow-hidden truncate rounded-lg border pl-2 pr-2 text-sm text-white opacity-70 backdrop-blur transition-all duration-1000 group-hover/img:translate-x-0 group-hover:translate-x-0 hover:opacity-100 dark:border-white">
            #{collection.category.name}
          </div>
          <div className="absolute bottom-2 right-3 max-w-[39%] translate-x-[300%] truncate rounded-lg border pl-2 pr-2 text-sm text-white opacity-70 backdrop-blur  transition-all duration-1000 group-hover/img:translate-x-0 group-hover:translate-x-0 hover:opacity-100 dark:border-white">
            @{collection.user != null ? collection.user.username : 'deleted'}
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 flex h-[50px] w-full items-center  bg-black/45 font-bold text-white transition-all duration-1000 group-hover:bottom-[-30%] hover:!bottom-0">
        <LockClosedIcon className="ml-2 mr-1" color="white" />
        {collection.name}
        {user && (
          <LikeButton
            liked={collectionLiked}
            onChange={onLike}
            className="ml-auto"
          />
        )}
      </div>
    </div>
  )
}
