import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { awardResults, questionTags, workTags } from "@/data/award-results";
import type { AwardName } from "@/data/award-results";
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

function getAwardBadgeClassName(awardName: AwardName) {
  if (awardName === "芥川賞") {
    return "bg-sky-100 text-sky-800 ring-1 ring-sky-200";
  }

  if (awardName === "直木賞") {
    return "bg-violet-100 text-violet-800 ring-1 ring-violet-200";
  }

  return "bg-amber-100 text-amber-800 ring-1 ring-amber-200";
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

  const readingRecommendations = result.readingRecommendations ?? [];
  const mediaExpansions = result.mediaExpansions ?? [];
  const relatedWorkNames = result.relatedWorkNames ?? [];

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

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

                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${getAwardBadgeClassName(
                  result.awardName
                )}`}
              >
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

              {result.summary && (
                <section className="mt-8 rounded-2xl border border-stone-200 bg-white p-5">
                  <h2 className="text-2xl font-bold">どんな本？</h2>
                  <p className="mt-3 leading-8 text-stone-700">{result.summary}</p>
                </section>
              )}

              {result.questions && result.questions.length > 0 && (
                <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
                  <h2 className="text-2xl font-bold">この本が連れてくる問い</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    答えを出すためではなく、この本を読みながら考えてみたい問いです。
                  </p>

                  <div className="mt-4 space-y-3">
                    {result.questions.map((question) => {
                      const questionTag = questionTags.find(
                        (tag) => tag.id === question.tagId
                      );

                      return (
                        <div
                          key={`${question.tagId}-${question.question}`}
                          className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100"
                        >
                          <div className="flex flex-wrap gap-2">
                            {questionTag && (
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
                                {questionTag.label}
                              </span>
                            )}
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-600 ring-1 ring-stone-200">
                              {question.guideLabel}
                            </span>
                          </div>
                          <p className="mt-3 text-base font-bold leading-7 text-stone-900">
                            {question.question}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {result.recommendedFor && result.recommendedFor.length > 0 && (
                <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
                  <h2 className="text-2xl font-bold">こんな人におすすめ</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-stone-700">
                    {result.recommendedFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {result.tagIds && result.tagIds.length > 0 && (
                <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-5">
                  <h2 className="text-2xl font-bold">タグ</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.tagIds.map((tagId) => {
                      const tag = workTags.find((workTag) => workTag.id === tagId);

                     if (!tag) {
                        return null;
                      }

                      return (
                        <span
                          key={tag.id}
                          className="rounded-full bg-stone-100 px-3 py-1 text-sm font-bold text-stone-700 ring-1 ring-stone-200"
                        >
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
                <h2 className="text-lg font-bold">
                  次に読みたい一冊
                </h2>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  この作品が気になった人に向けて、次に読みたい本を紹介します。
                </p>

                {readingRecommendations.length > 0 ? (
                  <div className="mt-5 grid gap-3">
                    {readingRecommendations.map((recommendation) => {
                      const recommendationAmazonUrl = createAmazonSearchUrl(
                        recommendation.workTitle,
                        recommendation.authorName
                      );

                      return (
                        <article
                          key={`${recommendation.label}-${recommendation.workTitle}`}
                          className="rounded-2xl bg-white p-4"
                        >
                          <p className="text-sm font-bold text-amber-700">
                            {recommendation.label}
                          </p>

                          <h3 className="mt-2 text-lg font-bold">
                            <a
                              href={recommendationAmazonUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="underline decoration-amber-500 underline-offset-4 hover:text-amber-700"
                            >
                              {recommendation.workTitle}
                            </a>
                          </h3>

                          <p className="mt-1 text-sm font-bold text-stone-700">
                            {recommendation.authorName}
                          </p>

                          <p className="mt-3 text-sm leading-7 text-stone-600">
                            {recommendation.reason}
                          </p>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 rounded-2xl bg-white p-4">
                    <p className="text-sm font-bold text-stone-500">
                      次に読みたい一冊は準備中です。
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      今後、この作品からつながる本を少しずつ追加していきます。
                    </p>
                  </div>
                )}
              </section>

              {(mediaExpansions.length > 0 || relatedWorkNames.length > 0) && (
                <section className="mt-8 rounded-2xl bg-stone-50 p-5">
                  <h2 className="text-lg font-bold">補足情報</h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {mediaExpansions.length > 0 && (
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-sm font-bold text-stone-500">
                          メディア展開
                        </p>

                        <ul className="mt-3 space-y-3">
                          {mediaExpansions.map((mediaExpansion) => (
                            <li
                              key={`${mediaExpansion.type}-${mediaExpansion.title}`}
                              className="text-sm leading-6 text-stone-700"
                            >
                              <span className="font-bold text-stone-900">
                                {mediaExpansion.typeLabel}
                              </span>
                              ：
                              {mediaExpansion.url ? (
                                <a
                                  href={mediaExpansion.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-bold underline underline-offset-4 hover:text-amber-700"
                                >
                                  {mediaExpansion.title}
                                </a>
                              ) : (
                                <span className="font-bold">
                                  {mediaExpansion.title}
                                </span>
                              )}
                              {mediaExpansion.year
                                ? `（${mediaExpansion.year}年）`
                                : ""}
                              {mediaExpansion.note
                                ? ` / ${mediaExpansion.note}`
                                : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {relatedWorkNames.length > 0 && (
                      <div className="rounded-2xl bg-white p-4">
                        <p className="text-sm font-bold text-stone-500">
                          関連作品
                        </p>

                        <ul className="mt-3 space-y-2">
                          {relatedWorkNames.map((relatedWorkName) => (
                            <li
                              key={relatedWorkName}
                              className="text-sm font-bold text-stone-700"
                            >
                              {relatedWorkName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              )}

              <section className="mt-8 rounded-2xl bg-stone-50 p-5">
                <h2 className="text-lg font-bold">この本を探す</h2>

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