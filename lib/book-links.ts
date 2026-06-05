export function createBookSearchKeyword(workTitle: string, authorName: string) {
  return `${workTitle} ${authorName}`;
}

export function createAmazonSearchUrl(workTitle: string, authorName: string) {
  const keyword = encodeURIComponent(
    createBookSearchKeyword(workTitle, authorName)
  );

  return `https://www.amazon.co.jp/s?k=${keyword}&i=stripbooks`;
}

export function createMercariSearchUrl(workTitle: string, authorName: string) {
  const keyword = encodeURIComponent(
    createBookSearchKeyword(workTitle, authorName)
  );

  return `https://jp.mercari.com/search?keyword=${keyword}`;
}

export function createRakutenBooksSearchUrl(
  workTitle: string,
  authorName: string
) {
  const keyword = encodeURIComponent(
    createBookSearchKeyword(workTitle, authorName)
  );

  return `https://books.rakuten.co.jp/search?sitem=${keyword}`;
}

export function createLibrarySearchUrl(workTitle: string, authorName: string) {
  const keyword = encodeURIComponent(
    createBookSearchKeyword(workTitle, authorName)
  );

  return `https://ndlsearch.ndl.go.jp/search?cs=bib&keyword=${keyword}`;
}

export function createWikipediaSearchUrl(authorName: string) {
  const keyword = encodeURIComponent(authorName);

  return `https://ja.wikipedia.org/wiki/Special:Search?search=${keyword}`;
}