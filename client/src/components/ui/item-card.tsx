import { Item } from '@/schemas/dbSchemas'
import dummyImage from '@/assets/images/dummyItemImage.jpg'
import { LikeButton } from './like-button'
import { getFieldsToPresent } from '@/lib/cardUtils'
type ItemCardProps = {
  item: Item
  hideCollection?: boolean
}
export function ItemCard({ item, hideCollection = false }: ItemCardProps) {
  return (
    <div className="group relative mx-auto h-[250px] w-[270px] rounded-md border  border-purple-600 shadow-2xl dark:bg-purple-300/30">
      <div className="absolute left-[50%] top-1 h-full w-full translate-x-[-50%] px-1 transition-all duration-200 ease-in-out group-hover:top-[-90px] ">
        <div className="absolute flex flex-wrap gap-1 truncate p-1">
          {item.tags?.slice(0, 2).map((tag) => (
            <div
              key={tag._id}
              className={`rounded-[27px] border-[1px] border-[${tag.color}] bg-[#212121] px-[10px] py-[5px] text-[10px] font-bold text-[${tag.color}] opacity-30 transition-all duration-500 ease-in-out group-hover:border-white group-hover:opacity-100`}
            >
              {tag.name}
            </div>
          ))}
        </div>
        <img
          className={
            'h-[81%] w-full overflow-hidden rounded-md bg-cover object-cover transition-all delay-1000 duration-1000'
          }
          src={item.imageUrl}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = dummyImage
          }}
        />
        {!hideCollection && (
          <div className="relative ">
            <div className="absolute left-[50%]  translate-x-[-50%]  translate-y-[-120%] rounded-[27px] border-[1px] border-black bg-[#212121] px-[30px] py-[12px] text-[12px] font-bold text-white shadow-big transition-all duration-75 ease-in-out group-hover:border-white group-hover:px-[28px] group-hover:py-[11px] group-hover:shadow-none">
              Loh
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 w-full px-4">
        <div className="grid grid-cols-2 rounded-lg text-xs font-bold  ">
          {getFieldsToPresent(item.customFields!).map((field) => (
            <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
              {field.fieldName}: <div>{field.fieldValue}</div>
            </div>
          ))}
        </div>
        <div className="w-full border border-purple-700 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-b-[1px] dark:border-white" />
        <div className="flex items-center justify-center ">
          <span className="0 overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold">
            {item.name}
          </span>
          <LikeButton iconProps="bg-purple-700 p-1 size-8 text-purple-700 fill-purple-700 border-purple-70" />
        </div>
      </div>
    </div>
  )
}
