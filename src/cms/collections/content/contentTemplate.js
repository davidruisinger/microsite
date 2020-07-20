export const contentTemplate = {
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "article-page"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Slug",
      name: "slug",
      widget: "string"
    },
    {
      label: "Publish Date",
      name: "date",
      widget: "datetime"
    },
    {
      label: "Cover",
      name: "cover",
      widget: "image",
      required: false
    },
    {
      label: "Body",
      name: "body",
      widget: "markdown"
    },
    {
      label: "Tags",
      name: "tags",
      widget: "list",
      required: false
    },
    {
      label: "Meta Title",
      name: "meta_title",
      widget: "string"
    },
    {
      label: "Meta Description",
      name: "meta_description",
      widget: "text"
    }
  ]
};
