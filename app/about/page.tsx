import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/"
          className="text-sm font-bold text-amber-700 underline underline-offset-4 hover:text-amber-800"
        >
          ← トップに戻る
        </Link>

        <article className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-amber-700">
            ABOUT
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Culture Atlas について
          </h1>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">Culture Atlas とは</h2>
            <p className="mt-4 leading-8 text-stone-700">
              Culture Atlas は、作品・作家・賞・メディア展開・関連作品のつながりをたどるための文化作品データベースです。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              最初の入口として、芥川賞・直木賞・本屋大賞などの文学賞受賞作を掲載しています。
              受賞作をきっかけに、気になる作家や次に読む本を探せるサイトを目指しています。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">現在の入口：文学賞図鑑</h2>
            <p className="mt-4 leading-8 text-stone-700">
              現在は、文学賞を中心に受賞作データを掲載しています。
              作品名・作家名・受賞年・文学賞から探せるほか、作品詳細ページでは出典や作品検索リンクも確認できます。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              作品ページからは、Amazon・メルカリ・楽天ブックス・図書館検索などへ移動できます。
              作家名からは Wikipedia 検索にも移動できます。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">掲載データについて</h2>
            <p className="mt-4 leading-8 text-stone-700">
              掲載している受賞作データは、公式サイト等を確認しながら手入力しています。
              各作品カードや詳細ページには、出典リンクと確認日を表示しています。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              できるだけ正確な情報を掲載するようにしていますが、表記ゆれ、出版社名の変更、受賞年と対象年度の違いなどがある場合があります。
              最新情報や詳細は、各賞の公式サイト・出版社・販売サイト等をご確認ください。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">現在の対象賞</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-stone-700">
              <li>芥川賞</li>
              <li>直木賞</li>
              <li>本屋大賞</li>
            </ul>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">今後の予定</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-stone-700">
              <li>文学賞データの追加</li>
              <li>ISBN・表紙画像の追加</li>
              <li>作家別ページ・賞別ページの作成</li>
              <li>作品同士の関連表示</li>
              <li>映画化・アニメ化・漫画化などのメディア展開データの追加</li>
              <li>漫画・アニメ・映画・ゲームなどの受賞作への拡張</li>
              <li>CSVやスプレッドシートによるデータ管理</li>
            </ul>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">やらないこと</h2>
            <p className="mt-4 leading-8 text-stone-700">
              Culture Atlas は、すべての賞や作品を網羅することだけを目的にしたサイトではありません。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              作品を起点に、「この作品はその後どう広がったのか」「この作家は他に何を生み出したのか」を見つけられる体験を重視します。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">
              リンク・アフィリエイトについて
            </h2>
            <p className="mt-4 leading-8 text-stone-700">
              現在、掲載しているAmazon・メルカリ・楽天ブックス等へのリンクは、作品を探しやすくするための検索リンクです。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              現時点ではアフィリエイトリンクは使用していません。
              将来的に収益化を行う場合は、このページなどで明記します。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">免責事項</h2>
            <p className="mt-4 leading-8 text-stone-700">
              本サイトは個人制作の文化作品データベースです。
              掲載情報の正確性には注意していますが、最新情報や詳細は各賞の公式サイト・出版社・販売サイト等をご確認ください。
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}