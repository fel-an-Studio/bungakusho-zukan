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
            読書回遊について
          </h1>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">読書回遊とは</h2>
            <p className="mt-4 leading-8 text-stone-700">
              読書回遊は、文学賞を入口にして、次に読みたい一冊を見つけるための読書案内サイトです。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              文学賞の受賞作だけを並べるのではなく、受賞作、候補作、同じ作家の別作品、似たテーマや読後感の作品をたどれる場所を目指しています。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">文学賞は入口です</h2>
            <p className="mt-4 leading-8 text-stone-700">
              芥川賞・直木賞・本屋大賞などの文学賞は、信頼できる読書の入口として使います。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              そこから、気になった作品、同じ作家、近いテーマ、明るい読後感、少し重たい読後感など、自分の読みたい方向へ回遊できるサイトに育てていきます。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">現在できること</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-stone-700">
              <li>文学賞の受賞作を探す</li>
              <li>作品名・作家名・出版社で検索する</li>
              <li>文学賞や受賞年で絞り込む</li>
              <li>作品詳細ページで出典や確認日を見る</li>
              <li>Amazon・メルカリ・楽天ブックス・図書館検索で作品を探す</li>
              <li>一部の作品で「この作品が気になった人へ」の読書案内を見る</li>
            </ul>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">掲載データについて</h2>
            <p className="mt-4 leading-8 text-stone-700">
              掲載している受賞作データは、公式サイト等を確認しながら手入力しています。
              各作品カードや詳細ページには、出典リンクと確認日を表示しています。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              一部のおすすめ作品は、公式な受賞情報ではなく、作品テーマや読書体験をもとに個人で整理した読書案内です。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              できるだけ正確な情報を掲載するようにしていますが、表記ゆれ、出版社名の変更、受賞年と対象年度の違いなどがある場合があります。
              最新情報や詳細は、各賞の公式サイト・出版社・販売サイト等をご確認ください。
            </p>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">現在の入口にしている賞</h2>
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
              <li>候補作・ノミネート作の追加</li>
              <li>同じ作家の次の一冊を追加</li>
              <li>似たテーマ・読後感の作品を追加</li>
              <li>作品詳細ページの読書案内を拡充</li>
              <li>ISBN・表紙画像の追加</li>
              <li>CSVやスプレッドシートによるデータ管理</li>
            </ul>
          </section>

          <section className="mt-8 border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-bold">やらないこと</h2>
            <p className="mt-4 leading-8 text-stone-700">
              読書回遊は、すべての文学賞や作品を網羅することだけを目的にしたサイトではありません。
            </p>
            <p className="mt-4 leading-8 text-stone-700">
              中心にしたいのは「賞の一覧」ではなく、気になった一冊から次の一冊へ進める読書体験です。
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
              本サイトは個人制作の読書案内サイトです。
              掲載情報の正確性には注意していますが、最新情報や詳細は各賞の公式サイト・出版社・販売サイト等をご確認ください。
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}