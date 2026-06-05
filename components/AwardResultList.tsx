"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AwardCategory, AwardResult } from "@/data/award-results";
import {
  createAmazonSearchUrl,
  createLibrarySearchUrl,
  createMercariSearchUrl,
  createRakutenBooksSearchUrl,
  createWikipediaSearchUrl,
} from "@/lib/book-links";

type SortType = "year-desc" | "year-asc" | "author-asc" | "title-asc";

type Props = {
  results: AwardResult[];
};

type CategoryFilter = "all" | AwardCategory;

const categories = [
  {
    category: "literature",
    label: "文学",
  },
  {
    category: "manga",
    label: "漫画",
  },
  {
    category: "anime",
    label: "アニメ",
  },
  {
    category: "movie",
    label: "映画",
  },
  {
    category: "game",
    label: "ゲーム",
  },
] as const;

const awardNames = ["芥川賞", "直木賞", "本屋大賞"] as const;

function isValidCategory(value: string) {
  return categories.some((category) => category.category === value);
}

function isValidAwardName(value: string) {
  return awardNames.some((awardName) => awardName === value);
}

function isValidSortType(value: string): value is SortType {
  return (
    value === "year-desc" ||
    value === "year-asc" ||
    value === "author-asc" ||
    value === "title-asc"
  );
}

function getSortTypeLabel(sortType: SortType) {

  if (sortType === "year-desc") {
    return "受賞年 新しい順";
  }

  if (sortType === "year-asc") {
    return "受賞年 古い順";
  }

  if (sortType === "author-asc") {
    return "作家名順";
  }

  return "作品名順";
}

export function AwardResultList({ results }: Props) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [awardName, setAwardName] = useState("all");
  const [awardYear, setAwardYear] = useState("all");
  const [sortType, setSortType] = useState<SortType>("author-asc");
  const [hasLoadedUrlParams, setHasLoadedUrlParams] = useState(false);

  const awardCount = new Set(results.map((result) => result.awardName)).size;
  const authorCount = new Set(results.map((result) => result.authorName)).size;
  const latestYear = Math.max(...results.map((result) => result.awardYear));

  const categorySummaries = categories.map((summaryCategory) => {
    const count = results.filter(
      (result) => result.category === summaryCategory.category
    ).length;

    return {
      category: summaryCategory.category,
      label: summaryCategory.label,
      count,
    };
  });

  const awardSummaries = awardNames.map((summaryAwardName) => {
    const count = results.filter(
      (result) => result.awardName === summaryAwardName
    ).length;

    return {
      awardName: summaryAwardName,
      count,
    };
  });

  const awardYears = useMemo(() => {
    const years = results.map((result) => result.awardYear);
    const uniqueYears = Array.from(new Set(years));

    return uniqueYears.sort((a, b) => b - a);
  }, [results]);

  const activeConditions = useMemo(() => {
    const conditions: string[] = [];

    if (keyword.trim() !== "") {
      conditions.push(`検索「${keyword.trim()}」`);
    }

    if (category !== "all") {
      const selectedCategory = categories.find(
        (categoryItem) => categoryItem.category === category
      );

      if (selectedCategory) {
        conditions.push(selectedCategory.label);
      }
    }

    if (awardName !== "all") {
      conditions.push(awardName);
    }

    if (awardYear !== "all") {
      conditions.push(`${awardYear}年`);
    }

    conditions.push(getSortTypeLabel(sortType));

    return conditions;
  }, [awardName, awardYear, category, keyword, sortType]);

  const currentListUrl = useMemo(() => {
    const searchParams = new URLSearchParams();

    if (keyword.trim() !== "") {
      searchParams.set("q", keyword.trim());
    }

    if (category !== "all") {
      searchParams.set("category", category);
    }

    if (awardName !== "all") {
      searchParams.set("award", awardName);
    }

    if (awardYear !== "all") {
      searchParams.set("year", awardYear);
    }

    if (sortType !== "author-asc") {
      searchParams.set("sort", sortType);
    }

    const queryString = searchParams.toString();

    return queryString ? `/?${queryString}` : "/";
  }, [awardName, awardYear, category, keyword, sortType]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const urlKeyword = searchParams.get("q") ?? "";
    const urlCategory = searchParams.get("category") ?? "all";
    const urlAwardName = searchParams.get("award") ?? "all";
    const urlAwardYear = searchParams.get("year") ?? "all";
    const urlSortType = searchParams.get("sort") ?? "author-asc";

    setKeyword(urlKeyword);

    if (urlCategory === "all" || isValidCategory(urlCategory)) {
      setCategory(urlCategory as CategoryFilter);
    }

    if (urlAwardName === "all" || isValidAwardName(urlAwardName)) {
      setAwardName(urlAwardName);
    }

    if (
      urlAwardYear === "all" ||
      awardYears.some((year) => String(year) === urlAwardYear)
    ) {
      setAwardYear(urlAwardYear);
    }

    if (isValidSortType(urlSortType)) {
      setSortType(urlSortType);
    }

    setHasLoadedUrlParams(true);
  }, [awardYears]);

  useEffect(() => {
    if (!hasLoadedUrlParams) {
      return;
    }

    const searchParams = new URLSearchParams();

    if (keyword.trim() !== "") {
      searchParams.set("q", keyword.trim());
    }

    if (category !== "all") {
      searchParams.set("category", category);
    }

    if (awardName !== "all") {
      searchParams.set("award", awardName);
    }

    if (awardYear !== "all") {
      searchParams.set("year", awardYear);
    }

    if (sortType !== "author-asc") {
      searchParams.set("sort", sortType);
    }

    const queryString = searchParams.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
  }, [awardName, awardYear, category, hasLoadedUrlParams, keyword, sortType]);

  const filteredResults = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    const filtered = results.filter((result) => {
      const matchesKeyword =
        normalizedKeyword === "" ||
        result.authorName.toLowerCase().includes(normalizedKeyword) ||
        result.workTitle.toLowerCase().includes(normalizedKeyword) ||
        result.publisher?.toLowerCase().includes(normalizedKeyword);

      const matchesCategory =
        category === "all" || result.category === category;

      const matchesAward =
        awardName === "all" || result.awardName === awardName;

      const matchesYear =
        awardYear === "all" || result.awardYear === Number(awardYear);

      return matchesKeyword && matchesCategory && matchesAward && matchesYear;
    });

    return [...filtered].sort((a, b) => {

      if (sortType === "year-desc") {
        return b.awardYear - a.awardYear;
      }

      if (sortType === "year-asc") {
        return a.awardYear - b.awardYear;
      }

      if (sortType === "author-asc") {
        return a.authorName.localeCompare(b.authorName, "ja");
      }

      return a.workTitle.localeCompare(b.workTitle, "ja");
    });
  }, [awardName, awardYear, category, keyword, results, sortType]);

  function resetFilters() {
    setKeyword("");
    setCategory("all");
    setAwardName("all");
    setAwardYear("all");
    setSortType("author-asc");
  }

  return (
    <>
      <section className="mt-10 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-stone-500">登録作品数</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {results.length}
            <span className="ml-1 text-base">件</span>
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-stone-500">対象文学賞</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {awardCount}
            <span className="ml-1 text-base">賞</span>
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-stone-500">登録作家数</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {authorCount}
            <span className="ml-1 text-base">人</span>
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-bold text-stone-500">最新受賞年</p>
          <p className="mt-2 text-3xl font-bold text-stone-900">
            {latestYear}
            <span className="ml-1 text-base">年</span>
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold">対象ジャンル</h2>
            <p className="mt-1 text-sm text-stone-600">
              将来的に、文学・漫画・アニメ・映画・ゲームへ広げる予定です。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-5">
            {categorySummaries.map((summary) => {
              const isSelected = category === summary.category;

              return (
                <button
                  key={summary.category}
                  type="button"
                  onClick={() => setCategory(summary.category)}
                  className={`rounded-xl px-4 py-3 text-left transition ${
                    isSelected
                      ? "bg-amber-100 ring-2 ring-amber-600"
                      : "bg-stone-50 hover:bg-amber-50"
                  }`}
                >
                  <p className="text-sm font-bold text-stone-700">
                    {summary.label}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-amber-700">
                    {summary.count}
                    <span className="ml-1 text-sm text-stone-600">件</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">賞別の登録件数</h2>
            <p className="mt-1 text-sm text-stone-600">
              クリックすると、その文学賞だけに絞り込めます。
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {awardSummaries.map((summary) => {
              const isSelected = awardName === summary.awardName;

              return (
                <button
                  key={summary.awardName}
                  type="button"
                  onClick={() => setAwardName(summary.awardName)}
                  className={`rounded-xl px-4 py-3 text-left transition ${
                    isSelected
                      ? "bg-amber-100 ring-2 ring-amber-600"
                      : "bg-stone-50 hover:bg-amber-50"
                  }`}
                >
                  <p className="text-sm font-bold text-stone-700">
                    {summary.awardName}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-amber-700">
                    {summary.count}
                    <span className="ml-1 text-sm text-stone-600">件</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 border-b border-stone-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">受賞作一覧</h2>
            <p className="mt-2 text-sm text-stone-600">
              作品名・作家名・出版社・受賞年で探せます。
            </p>
          </div>

          <p className="text-sm font-bold text-amber-700">
            {filteredResults.length} 件
          </p>
        </div>

        <div className="mt-6 grid gap-3 rounded-2xl bg-stone-50 p-4 lg:grid-cols-[1fr_160px_160px_180px_auto]">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-700">検索</span>
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="例：村上龍、ハンチバック、新潮社"
              className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-600"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-700">文学賞</span>
            <select
              value={awardName}
              onChange={(event) => setAwardName(event.target.value)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-600"
            >
              <option value="all">すべて</option>
              <option value="芥川賞">芥川賞</option>
              <option value="直木賞">直木賞</option>
              <option value="本屋大賞">本屋大賞</option>
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-700">受賞年</span>
            <select
              value={awardYear}
              onChange={(event) => setAwardYear(event.target.value)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-600"
            >
              <option value="all">すべて</option>
              {awardYears.map((year) => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-bold text-stone-700">並び順</span>
            <select
              value={sortType}
              onChange={(event) => setSortType(event.target.value as SortType)}
              className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-amber-600"
            >
              <option value="year-desc">受賞年 新しい順</option>
              <option value="year-asc">受賞年 古い順</option>
              <option value="author-asc">作家名順</option>
              <option value="title-asc">作品名順</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
            >
              リセット
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
          <p className="text-sm font-bold text-stone-700">現在の条件</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {activeConditions.map((condition) => (
              <span
                key={condition}
                className="rounded-full bg-white px-3 py-1 text-sm font-bold text-amber-800"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          {filteredResults.map((result) => {
            const amazonUrl = createAmazonSearchUrl(
              result.workTitle,
              result.authorName
            );
            const mercariUrl = createMercariSearchUrl(
              result.workTitle,
              result.authorName
            );
            const rakutenUrl = createRakutenBooksSearchUrl(
              result.workTitle,
              result.authorName
            );
            const libraryUrl = createLibrarySearchUrl(
              result.workTitle,
              result.authorName
            );
            const wikipediaUrl = createWikipediaSearchUrl(result.authorName);

            return (
              <article
                key={result.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-5"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="w-full shrink-0 sm:w-24">
                      {result.coverImageUrl ? (
                        <img
                          src={result.coverImageUrl}
                          alt={`${result.workTitle}の表紙`}
                          className="aspect-[2/3] w-full rounded-xl border border-stone-200 object-cover shadow-sm"
                        />
                      ) : (
                        <div className="flex aspect-[2/3] w-full flex-col justify-between rounded-xl border border-stone-200 bg-white p-3 shadow-sm">
                          <p className="text-[10px] font-bold tracking-[0.2em] text-amber-700">
                            BOOK
                          </p>
                          <p className="line-clamp-3 text-sm font-bold leading-snug">
                            {result.workTitle}
                          </p>
                          <p className="line-clamp-1 text-xs font-bold text-stone-500">
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

                      <h3 className="mt-4 text-2xl font-bold">
                        <Link
                          href={`/works/${result.id}?from=${encodeURIComponent(
                            currentListUrl
                          )}`}
                          className="underline decoration-amber-500 decoration-2 underline-offset-4 hover:text-amber-700"
                        >
                          {result.workTitle}
                        </Link>
                      </h3>

                      <p className="mt-3 text-stone-700">
                        作家：{" "}
                        <a
                          href={wikipediaUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold underline decoration-stone-400 underline-offset-4 hover:text-amber-700"
                        >
                          {result.authorName}
                        </a>
                      </p>

                      {result.publisher && (
                        <p className="mt-1 text-sm text-stone-500">
                          出版社：{result.publisher}
                        </p>
                      )}

                      {result.sourceName && (
                        <p className="mt-3 text-xs text-stone-500">
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
                          {result.verifiedAt
                            ? ` / 確認日：${result.verifiedAt}`
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
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
                </div>
              </article>
            );
          })}

          {filteredResults.length === 0 && (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="font-bold">該当する受賞作がありません</p>
              <p className="mt-2 text-sm text-stone-600">
                検索キーワードやフィルターを変えてみてください。
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm font-bold hover:border-amber-600 hover:text-amber-700"
              >
                条件をリセットする
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}