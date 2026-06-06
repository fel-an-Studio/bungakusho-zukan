import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-stone-50/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group">
          <p className="text-xs font-bold tracking-[0.3em] text-amber-700">
            BUNGAKUSHO ZUKAN
          </p>
          <p className="mt-1 text-xl font-bold text-stone-900 group-hover:text-amber-700">
            文学賞図鑑
          </p>
        </Link>

        <nav className="flex flex-wrap gap-4 text-sm font-bold text-stone-700">
          <Link href="/" className="hover:text-amber-700">
            トップ
          </Link>

          <Link href="/about" className="hover:text-amber-700">
            このサイトについて
          </Link>

          <a
            href="https://github.com/fel-an-Studio/bungakusho-zukan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-700"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}