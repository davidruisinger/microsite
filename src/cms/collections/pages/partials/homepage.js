export const homepage = {
  file: "src/pages/index.md",
  label: "Home Page",
  name: "home",
  fields: [
    {
      label: "Template Key",
      name: "templateKey",
      widget: "hidden",
      default: "home-page"
    },
    {
      label: "Language Key",
      name: "langKey",
      widget: "select",
      options: ["de", "en"],
      default: "de"
    },
    {
      label: "Title",
      name: "title",
      widget: "string"
    },
    {
      label: "Heading",
      name: "heading",
      widget: "string"
    },
    {
      label: "Description",
      name: "description",
      widget: "string"
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
