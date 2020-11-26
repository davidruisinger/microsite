import React from "react";
import { BLOCKS } from "@contentful/rich-text-types";

export const richTextOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      if (node.data.target.fields) {
        const { title, description, file } = node.data.target.fields;
        const mimeType = file["en-US"].contentType;
        const mimeGroup = mimeType.split("/")[0];

        switch (mimeGroup) {
          case "image":
            return (
              <img
                style={{ maxWidth: "100%" }}
                title={title ? title["en-US"] : null}
                alt={description ? description["en-US"] : null}
                src={file["en-US"].url}
              />
            );
          case "application":
            return (
              <a
                alt={description ? description["en-US"] : null}
                href={file["en-US"].url}
              >
                {title ? title["en-US"] : file["en-US"].details.fileName}
              </a>
            );
          default:
            return (
              <span style={{ backgroundColor: "red", color: "white" }}>
                {" "}
                {mimeType} embedded asset{" "}
              </span>
            );
        }
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: function customEntry(node) {
      const fields = node.data.target.fields;
      switch (node.data.target.sys.contentType.sys.id) {
        case "blockquote":
          return (
            <div>
              {fields.quoteText["en-US"]}
              {fields.quoter["en-US"]}
            </div>
          );
        default:
          return <div>?</div>;
      }
    },
  },
};
