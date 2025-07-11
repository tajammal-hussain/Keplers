export default function initSpannerSystem() {
  const elements = document.querySelectorAll("[data-spanner]");

  elements.forEach((el) => {
    const className = el.getAttribute("data-spanner");
    let html = el.innerHTML;

    // Replace <p> tags with markers
    html = html.replaceAll("<p>", " ¥¥¥ ").replaceAll("</p>", " ### ");
    const words = html.split(" ");

    let result = "";
    let index = 1;
    let inSpanTag = false;
    let tempSpan = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const nextWord = words[i + 1];

      if (!word || word === "\n") continue;

      if (!inSpanTag) {
        if (word === "¥¥¥") {
          result += "<p>";
        } else if (word === "###") {
          result += "</p>";
        } else if (word.includes("<span")) {
          // beginning of existing span block
          inSpanTag = true;
          tempSpan = word + " ";
        } else {
          result += `<span class="${className}" data-i="${index}">${word}</span>`;
          index++;

          // Add split unless next is end of paragraph or undefined
          if (nextWord && nextWord !== "###") {
            result += `<span class="split"> </span>`;
          }
        }
      } else {
        tempSpan += word + " ";
        if (word.includes("</span>")) {
          inSpanTag = false;

          if (el.classList.contains("spanSkip")) {
            result += `<span class="${className} skip" data-i="${index}">${tempSpan}</span>`;
            index++;
          } else {
            result += tempSpan;
          }
          tempSpan = "";

          // Add split after closing span unless next is paragraph end
          if (nextWord && nextWord !== "###") {
            result += `<span class="split"> </span>`;
          }
        }
      }
    }

    el.innerHTML = result;
    el.classList.add("spanned");
  });
}
