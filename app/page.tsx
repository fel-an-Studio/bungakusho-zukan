import { AwardResultList } from "@/components/AwardResultList";
import { SiteHeader } from "@/components/SiteHeader";
import { awardResults } from "@/data/award-results";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-12">
        <header>
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-amber-700">
            CULTURE ATLAS
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            作品のつながりをたどる文化地図
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-stone-700">
            文学賞を入口に、受賞作・作家・映像化作品・関連作品のつながりをたどる文化作品データベースです。
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-stone-700">
            まずは芥川賞・直木賞・本屋大賞などの文学賞から、次に読む本や気になる作家を探せる「文学賞図鑑」として育てています。
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <h2 className="text-lg font-bold">現在の入口：文学賞図鑑</h2>
          <p className="mt-2 leading-7 text-stone-700">
            掲載している受賞作データは、公式サイト等を確認しながら手入力しています。
            各作品カードや詳細ページには、出典リンクと確認日を表示しています。
          </p>
          <p className="mt-2 text-sm text-stone-600">
            将来的には、文学作品から映画化・アニメ化・漫画化・関連作品へたどれるようなデータベースに広げる予定です。
          </p>
        </section>

        <AwardResultList results={awardResults} />

        <footer className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-600">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-bold text-stone-900">Culture Atlas</p>
              <p className="mt-2 leading-7">
                文学賞を入口に、作品・作家・メディア展開のつながりをたどるための個人制作サイトです。
                <br />
                現在は文学賞データを中心に掲載しています。
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