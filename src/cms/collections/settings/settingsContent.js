export const settingsContent = {
  files: [
    {
      file: "src/pages/settings.md",
      label: "All Settings",
      name: "settings",
      fields: [
        {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "settings"
        },
        {
          label: "Impressum",
          name: "impressum",
          widget: "markdown"
        },
        {
          label: "Twitter",
          name: "twitter",
          widget: "string"
        },
        {
          label: "LinkedIn",
          name: "linkedin",
          widget: "string"
        },
        {
          label: "Facebook",
          name: "facebook",
          widget: "string"
        },
        {
          label: "Menu Items",
          name: "menu_items",
          widget: "list",
          fields: [
            {
              label: "Text",
              name: "text",
              widget: "text"
            },
            {
              label: "Link Type",
              name: "linkType",
              widget: "select",
              options: ["internal", "external", "submenu"]
            },
            {
              label: "Link URL",
              name: "location",
              widget: "string",
              hint:
                "Use a relative URL (e.g. /about) if the link is an internal link"
            },
            {
              label: "Submenu Items",
              name: "sub_menu_items",
              widget: "list",
              hint: "Fill only when selected type is submenu!",
              required: false,
              fields: [
                {
                  label: "Text",
                  name: "text",
                  widget: "text"
                },
                {
                  label: "Link Type",
                  name: "linkType",
                  widget: "select",
                  options: ["internal", "external"]
                },
                {
                  label: "Link URL",
                  name: "location",
                  widget: "string",
                  hint:
                    "Use a relative URL (e.g. /about) if the link is an internal link"
                }
              ]
            }
          ]
        },
        {
          label: "Footer Col 1",
          name: "footer_items_1",
          widget: "list",
          fields: [
            {
              label: "Text",
              name: "text",
              widget: "text"
            },
            {
              label: "Link Type",
              name: "linkType",
              widget: "select",
              options: ["internal", "external"]
            },
            {
              label: "Link URL",
              name: "location",
              widget: "string",
              hint:
                "Use a relative URL (e.g. /about) if the link is an internal link"
            }
          ]
        }
      ]
    }
  ]
};
