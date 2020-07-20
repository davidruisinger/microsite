import { contentTemplate } from "./contentTemplate";

export const content = {
  name: "content",
  identifier_field: "slug",
  label: "Content",
  folder: "src/pages/content",
  format: "frontmatter",
  create: true,
  slug: "{{slug}}",
  ...contentTemplate
};
