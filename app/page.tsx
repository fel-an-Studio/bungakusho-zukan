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

        <AwardResultList results={awardResults} />
      </section>
    </main>
  );
}