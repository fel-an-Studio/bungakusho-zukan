import Link from "next/link";
import { notFound } from "next/navigation";
import { awardResults } from "@/data/award-results";
import {
  createAmazonSearchUrl,
  createLibrarySearchUrl,
  createMercariSearchUrl,
  createRakutenBooksSearchUrl,
  createWikipediaSearchUrl,
} from "@/lib/book-links";

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    from?: string;
  }>;
};

export function generateStaticParams() {
  return awardResults.map((result) => ({
    id: result.id,
  }));
}

export default async function WorkDetailPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  const result = awardResults.find((awardResult) => awardResult.id === id);

  if (!result) {
    notFound();
  }

  const backUrl = from && from.startsWith("/") ? from : "/";
  const amazonUrl = createAmazonSearchUrl(result.workTitle, result.authorName);
  const mercariUrl = createMercariSearchUrl(result.workTitle, result.authorName);
  const rakutenUrl = createRakutenBooksSearchUrl(
    result.workTitle,
    result.authorName
  );
  const libraryUrl = createLibrarySearchUrl(result.workTitle, result.authorName);
  const wikipediaUrl = createWikipediaSearchUrl(result.authorName);

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href={backUrl}
          className="text-sm font-bold text-amber-700 underline underline-offset-4 hover:text-amber-800"
        >
          ← 一覧に戻る
        </Link>

        <article className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <div>
              {result.coverImageUrl ? (
                <img
                  src={result.coverImageUrl}
                  alt={`${result.workTitle}の表紙`}
                  className="aspect-[2/3] w-full rounded-2xl border border-stone-200 object-cover shadow-sm"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full flex-col justify-between rounded-2xl border border-stone-200 bg-stone-100 p-5 shadow-sm">
                  <div>
                    <p className="text-xs font-bold tracking-[0.25em] text-amber-700">
                      BOOK
                    </p>
                    <p className="mt-4 text-2xl font-bold leading-tight">
                      {result.workTitle}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-stone-600">
                    {result.authorName}
                  </p>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  {result.categoryLabel}
                </span>

                <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-bold text-stone-700">
                  {result.awardName}
                </span>

                <span className="text-sm text-stone-500">
                  {result.awardYear}年
                  {result.round ? `・第${result.round}回` : ""}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight">
                {result.workTitle}
              </h1>

              <dl className="mt-8 grid gap-5 border-t border-stone-200 pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-bold text-stone-500">作家</dt>
                  <dd className="mt-1 text-lg font-bold">
                    <a
                      href={wikipediaUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-stone-400 underline-offset-4 hover:text-amber-700"
                    >
                      {result.authorName}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-bold text-stone-500">出版社</dt>
                  <dd className="mt-1 text-lg font-bold">
                    {result.publisher ?? "未登録"}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-bold text-stone-500">
                    ジャンル
                  </dt>
                  <dd className="mt-1 text-lg font-bold">
                    {result.categoryLabel}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-bold text-stone-500">
                    受賞結果
                  </dt>
                  <dd className="mt-1 text-lg font-bold">
                    {result.resultType === "winner" ? "受賞" : "候補"}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-bold text-stone-500">ISBN</dt>
                  <dd className="mt-1 text-lg font-bold">
                    {result.isbn ?? "未登録"}
                  </dd>
                </div>
              </dl>

              <section className="mt-8 rounded-2xl bg-stone-50 p-5">
                <h2 className="text-lg font-bold">この作品を探す</h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
                  >
                    Amazon
                  </a>

                  <a
                    href={mercariUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
                  >
                    メルカリ
                  </a>

                  <a
                    href={rakutenUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
                  >
                    楽天ブックス
                  </a>

                  <a
                    href={libraryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
                  >
                    図書館
                  </a>
                </div>
              </section>

              {result.sourceName && (
                <p className="mt-6 text-xs text-stone-500">
                  出典：
                  {result.sourceUrl ? (
                    <a
                      href={result.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 hover:text-amber-700"
                    >
                      {result.sourceName}
                    </a>
                  ) : (
                    result.sourceName
                  )}
                  {result.verifiedAt ? ` / 確認日：${result.verifiedAt}` : ""}
                </p>
              )}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}