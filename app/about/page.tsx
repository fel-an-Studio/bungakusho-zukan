import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
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
            このサイトについて
          </h1>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">文学賞図鑑とは</h2>
            <p className="mt-4 leading-8 text-stone-700">
              文学賞図鑑は、芥川賞・直木賞・本屋大賞などの受賞作を、
              作品名・作家名・受賞年から探せる読書案内サイトです。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              受賞作を一覧で眺めたり、気になった作品をAmazon・メルカリ・楽天ブックス・図書館検索で探したりできます。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">掲載データについて</h2>
            <p className="mt-4 leading-8 text-stone-700">
              掲載している受賞作データは、公式サイト等を確認しながら手入力しています。
              各作品カードや詳細ページには、出典リンクと確認日を表示しています。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              できるだけ正確な情報を掲載するようにしていますが、表記ゆれや出版社名の変更などがある場合があります。
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
              <li>漫画・アニメ・映画・ゲームなどの受賞作への拡張</li>
              <li>CSVやスプレッドシートによるデータ管理</li>
            </ul>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">リンク・アフィリエイトについて</h2>
            <p className="mt-4 leading-8 text-stone-700">
              現在、掲載しているAmazon・メルカリ・楽天ブックス等へのリンクは、作品を探しやすくするための検索リンクです。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              現時点ではアフィリエイトリンクは使用していません。将来的に収益化を行う場合は、このページなどで明記します。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">免責事項</h2>
            <p className="mt-4 leading-8 text-stone-700">
              本サイトは個人制作の読書案内サイトです。
              掲載情報の正確性には注意していますが、最新情報や詳細は各賞の公式サイト・出版社・販売サイト等をご確認ください。
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}