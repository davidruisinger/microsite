import { BLOCKS } from '@contentful/rich-text-types'
import React from 'react'

export const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (node.data.target.fields) {
        const { description, file, title } = node.data.target.fields
        const mimeType = file['en-US'].contentType
        const mimeGroup = mimeType.split('/')[0]

        switch (mimeGroup) {
          case 'image':
            return (
              <img
                alt={description ? description['en-US'] : null}
                src={file['en-US'].url}
                style={{ maxWidth: '100%' }}
                title={title ? title['en-US'] : null}
              />
            )
          case 'application':
            return (
              <a
                alt={description ? description['en-US'] : null}
                href={file['en-US'].url}
              >
                {title ? title['en-US'] : file['en-US'].details.fileName}
              </a>
            )
          default:
            return (
              <span style={{ backgroundColor: 'red', color: 'white' }}>
                {' '}
                {mimeType} embedded asset{' '}
              </span>
            )
        }
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: function customEntry(node) {
      const fields = node.data.target.fields
      switch (node.data.target.sys.contentType.sys.id) {
        case 'blockquote':
          return (
            <div>
              {fields.quoteText['en-US']}
              {fields.quoter['en-US']}
            </div>
          )
        default:
          return <div>?</div>
      }
    },
  },
}
