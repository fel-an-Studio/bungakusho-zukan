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
            読書回遊
          </h1>

          <p className="mt-6 max-w-3xl text-2xl font-bold leading-10 text-stone-900">
            文学賞を入口に、次に読みたい一冊へ。
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-stone-700">
            受賞作、候補作、同じ作家、似たテーマの本をたどれる読書案内サイトです。
            まずは芥川賞・直木賞・本屋大賞などを入口に、次に読みたい一冊を探せる場所として育てています。
          </p>
        </header>

        <section className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <h2 className="text-lg font-bold">
            文学賞は、次の一冊への入口です
          </h2>

          <p className="mt-2 leading-7 text-stone-700">
            気になる受賞作から、同じ作家の別作品や、似たテーマ・読後感の本へ。
            文学賞をきっかけに、次に読みたい一冊を探せる場所を目指しています。
          </p>

          <p className="mt-2 text-sm text-stone-600">
            現在は受賞作データを中心に掲載しています。今後は候補作や読書案内も少しずつ追加していきます。
          </p>
        </section>

        <AwardResultList results={awardResults} />

        <footer className="mt-12 border-t border-stone-200 pt-8 text-sm text-stone-600">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-bold text-stone-900">読書回遊</p>
              <p className="mt-2 leading-7">
                文学賞を入口に、次に読みたい一冊を探すための個人制作サイトです。
                <br />
                現在は芥川賞・直木賞・本屋大賞の受賞作データを中心に掲載しています。
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