import { Tag } from '@/schemas/dbSchemas'

export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function mapStringTagsToObjectArray(tags: Tag[]) {
  return tags.map((tag) => {
    if (typeof tag === 'object') {
      return tag
    } else {
      return { _id: '', name: tag, color: getRandomColor() }
    }
  })
}
