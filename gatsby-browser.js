import objectFitPolyfill from "objectFitPolyfill";

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    // eslint-disable-next-line no-unused-expressions
    import(`intersection-observer`);
    console.log(`# IntersectionObserver is polyfilled!`);
    objectFitPolyfill();
  }
};
