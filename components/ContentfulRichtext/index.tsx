import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { Document } from '@contentful/rich-text-types'

interface ContentfulRichtextProps {
  content: Document
}

export const ContentfulRichtext = ({ content }: ContentfulRichtextProps) => {
  return (
    <div
      className="page-body"
      dangerouslySetInnerHTML={{
        __html: documentToHtmlString(content),
      }}
    />
  )
}
