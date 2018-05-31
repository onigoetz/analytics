export default function canonical() {
  const tags = document.getElementsByTagName("link");
  // eslint-disable-next-line no-cond-assign
  for (let i = 0, tag; (tag = tags[i]); i++) {
    if (tag.getAttribute("rel") === "canonical") {
      return tag.getAttribute("href");
    }
  }

  return false;
}
