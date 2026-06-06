import { AwardResultList } from "@/components/AwardResultList";
import { awardResults } from "@/data/award-results";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <header>
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-amber-700">
            BUNGAKUSHO ZUKAN
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            文学賞図鑑
          </h1>

          <p className="mt-6 max-w-2xl leading-8 text-stone-700">
            芥川賞・直木賞・本屋大賞などの受賞作を、作家名・作品名・受賞年から探せる読書案内サイトです。
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <h2 className="text-lg font-bold">データについて</h2>
          <p className="mt-2 leading-7 text-stone-700">
            掲載している受賞作データは、公式サイト等を確認しながら手入力しています。
            各作品カードや詳細ページには、出典リンクと確認日を表示しています。
          </p>
          <p className="mt-2 text-sm text-stone-600">
            現在は文学賞を中心に掲載しています。将来的には漫画・アニメ・映画・ゲームなどの受賞作にも広げる予定です。
          </p>
        </section>

        <AwardResultList results={awardResults} />

        <footer className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-600">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-bold text-stone-900">文学賞図鑑</p>
              <p className="mt-2 leading-7">
                受賞作から次に読む本を探すための個人制作サイトです。
                <br />
                データは公式サイト等を確認しながら掲載しています。
              </p>
            </div>

            <div className="flex flex-wrap gap-3 font-bold">
              <a
                href="/about"
                className="underline underline-offset-4 hover:text-amber-700"
              >
                このサイトについて
              </a>

              <a
                href="https://github.com/fel-an-Studio/bungakusho-zukan"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-amber-700"
              >
                GitHub
              </a>

              <a
                href="https://bungakusho-zukan.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-amber-700"
              >
                公開サイト
              </a>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}