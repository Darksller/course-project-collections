import { Item } from '@/schemas/dbSchemas'
import dummyImage from '@/assets/images/dummyItemImage.jpg'
import { LikeButton } from './like-button'
type ItemCardProps = {
  item: Item
}
export function ItemCard({ item }: ItemCardProps) {
  return (
    <div className="group relative mx-auto h-[250px] w-[270px] rounded-md border  border-purple-600 shadow-2xl dark:bg-purple-300/30">
      <div className="absolute left-[50%] top-1 h-full w-full translate-x-[-50%] px-1 transition-all duration-200 ease-in-out group-hover:top-[-90px] ">
        <img
          className={
            'h-[81%] w-full overflow-hidden rounded-md bg-cover object-cover transition-all delay-1000 duration-1000'
          }
          src={dummyImage}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = dummyImage
          }}
        />
      </div>
      <div className="absolute bottom-0 w-full px-4">
        <div className="grid grid-cols-2 rounded-lg text-xs font-bold  ">
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
            Автор: <div>Григорий Автор </div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
            Дата: <div>22.22.2022</div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
            Кол-во <div>213</div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
            Том: <div>4</div>
          </div>
        </div>
        <div className="w-full border border-purple-700 transition-all delay-700 duration-1000 group-hover/img:w-full group-hover:w-full dark:border-b-[1px] dark:border-white" />
        <div className="flex items-center justify-center ">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold">
            Грибковый арбуз
          </span>
          <LikeButton className="" />
        </div>
      </div>
    </div>
  )
}

// ;<div className="relative mb-[45px] p-[5px]">
//   <div className="absolute left-[50%] top-[50%] translate-x-[-50%]  translate-y-[-50%] rounded-[27px] border-[1px] border-black bg-[#212121] px-[30px] py-[12px] text-[12px] font-bold text-white shadow-big transition-all duration-75 ease-in-out group-hover:border-white group-hover:px-[28px] group-hover:py-[11px] group-hover:shadow-none">
//     Loh
//   </div>
// </div>
