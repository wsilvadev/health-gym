
// injectCSS("body { background: violet; }")
export function injectCSS(css: string) {
  return document.head.appendChild(document.createElement("style")).innerHTML += css
}
