//get page apth that include.html in produciton

export const getPagePath = (pagePath: string) => {
    if (pagePath === "./") {
      return process.env.NODE_ENV === "production"
        ? "index.html"
        : pagePath;
    }
    return process.env.NODE_ENV === "production"
        ? `${pagePath}.html`
        : pagePath;
    };