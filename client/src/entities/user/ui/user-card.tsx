import { User } from '@/shared/api/types'

export type UserCardProps = {
  data: User
  className?: string
}

export const UserCard = ({ data }: UserCardProps) => {
  return <div>{data.username}</div>
}
