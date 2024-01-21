import { Collection } from '@/pages/Collections'
import { User } from './header/profile-button'
import { Tag } from '../TagCloud'

export function ItemCard() {
  return (
    //TODO: При появлении айтема картинка круто выезжает (типо когда меняешь там снизу в диве картинку и сразу альтабаешься там прикольная анимация)
    <div className="group relative mx-auto  h-[250px] w-[270px] rounded-md border border-gray-200 font-muli shadow-2xl">
      <div className="absolute left-[50%] top-1 h-full w-full translate-x-[-50%] px-2 transition-all duration-200 ease-in-out group-hover:top-[-90px] ">
        <div className="h-[85%] overflow-hidden rounded-md bg-[url('@/assets/images/dummyItemImage.jpg')] bg-cover transition-all delay-1000 duration-1000 " />
      </div>
      <div className="absolute bottom-0 mb-1 h-[120px] w-full px-4">
        <div className="relative mb-[45px] p-[5px]">
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%]  translate-y-[-50%] rounded-[27px] border-[1px] border-black bg-[#212121] px-[30px] py-[12px] text-[12px] font-bold text-white shadow-big transition-all duration-75 ease-in-out group-hover:border-white group-hover:px-[28px] group-hover:py-[11px] group-hover:shadow-none">
            Арбузики
          </div>
        </div>
        <div className="grid h-[95px] grid-cols-2 rounded-md text-xs font-bold  group-hover:border-l-[1px] group-hover:border-r-[1px] group-hover:border-t-[1px]">
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap border-b-[1px] border-r-[1px] p-1">
            Автор: <div>Григорий Автор </div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap border-b-[1px]  p-1">
            Дата: <div>22.22.2022</div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap border-r-[1px] p-1">
            Кол-во <div>213</div>
          </div>
          <div className="z-[-1] max-h-[47.5px] min-h-[47.5px] truncate text-wrap p-1">
            Том: <div>4</div>
          </div>
        </div>
        <div className="mx-[-5px] border-t-[1px] border-solid border-gray-300" />
        <div className="float-left">
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[16px] font-bold">
            Грибковый арбуз
          </span>
        </div>
      </div>
    </div>
  )
}

export type Comment = {
  content: string
  date: Date
  user: User
  likeCount: number
}

export type Item = {
  name: string
  description: string
  imageUrl?: string
  user: User
  collection: Collection
  likeCount: number
  tags: Tag[]
  comments: Comment[]
  customFields?: [
    {
      fieldState: 'NOT_PRESENT' | 'PRESENT_OPTIONAL' | 'PRESENT_REQUIRED'
      fieldName: string
      fieldType: string
      fieldValue: unknown
    },
  ]
}
