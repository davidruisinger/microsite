import CMS from "netlify-cms-app";
import cloudinary from "netlify-cms-media-library-cloudinary";
import ArticlePreview from "./preview-templates/ArticlePreview";
import ContactPagePreview from "./preview-templates/ContactPagePreview";
import HomePagePreview from "./preview-templates/HomePagePreview";

// import the netlify config for collections from js files
import collections from "./collections";

// initialize the media library
CMS.registerMediaLibrary(cloudinary);
CMS.init({
  config: {
    load_config_file: false,
    backend: {
      name: "git-gateway",
      branch: "master"
    },
    media_folder: "static/img",
    public_folder: "/img",
    media_library: {
      name: "cloudinary",
      output_filename_only: false,
      config: {
        cloud_name: "dhpk1grmy",
        api_key: "933727136379134",
        multiple: false,
        default_transformations: [
          [
            {
              fetch_format: "auto",
              width: 2000,
              quality: "auto",
              crop: "scale"
            }
          ]
        ]
      }
    },
    collections: collections
  }
});

CMS.registerPreviewStyle("/styles.css");
CMS.registerPreviewTemplate("about", ArticlePreview);
CMS.registerPreviewTemplate("contact", ContactPagePreview);
CMS.registerPreviewTemplate("blog", ArticlePreview);
CMS.registerPreviewTemplate("home", HomePagePreview);
