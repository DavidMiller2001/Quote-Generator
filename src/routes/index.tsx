import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useEffect, useState } from 'react'
import { getQuote } from '../../actions'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const getQuoteFn = useServerFn(getQuote)
  const debouncedFn = debounce(handleGetQuote, 500)

  const [quote, setQuote] = useState({
    quoteText: 'Click to get new quote!',
    author: 'David Miller',
  })

  async function handleGetQuote() {
    try {
      setIsLoading(true)
      const data = await getQuoteFn()

      setQuote({
        quoteText: data.quote,
        author: data.author,
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetQuote()
  }, [])

  return (
    <div className="bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-center flex-col gap-4 h-screen p-8">
      <h1 className="text-sm uppercase tracking-widest text-indigo-300">
        Quote Generator
      </h1>
      <main className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-2xl p-8 sm:p-10 text-center">
        <h2 className="font-bold italic text-3xl sm:text-4xl leading-tight mb-6">
          {`"${quote.quoteText}"`}
        </h2>

        <div className="h-px w-24 bg-indigo-300/50 mx-auto mb-6" />

        <h2 className="text-lg sm:text-xl text-slate-300 mb-8">
          — {quote.author}
        </h2>

        <button
          className="rounded-full px-6 py-3 bg-indigo-500 font-semibold shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer "
          onClick={() => debouncedFn()}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'New Quote'}
        </button>
      </main>
      <footer className="text-center text-sm text-slate-400">
        David Miller @2026
      </footer>
    </div>
  )
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined

  return function (this: any, ...args: Parameters<T>): void {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
