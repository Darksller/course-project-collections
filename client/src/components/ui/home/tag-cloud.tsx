import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { useGetTagsQuery } from '@/api/tagsApi'

import { Tag } from '@/schemas/dbSchemas'
import { Link } from '@tanstack/react-router'

const TagCloudComponent: React.FC = () => {
  const { data, isLoading, isError } = useGetTagsQuery()
  const customRenderer = (tag: Tag, size: number) => (
    <Link
      to="/"
      key={tag._id}
      style={{
        fontSize: `${size / 2}em`,
        borderRadius: '15px',
        border: `2px solid ${tag.color}`,
        margin: '3px',
        padding: '3px',
        display: 'inline-block',
        color: 'white',
      }}
    >
      {tag.name}
    </Link>
  )

  return (
    <div>
      {isLoading && <p>Loading tags...</p>}
      {isError && <p>Theres no tags yet :) </p>}
      {data && (
        //@ts-ignore
        <TagCloud
          tags={data.map((tag) => ({
            _id: tag._id,
            color: tag.color,
            count: tag.items.length,
            name: tag.name,
          }))}
          minSize={1}
          maxSize={5}
          renderer={customRenderer}
        />
      )}
    </div>
  )
}

export default TagCloudComponent
