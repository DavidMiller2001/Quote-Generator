import { createServerFn } from '@tanstack/react-start'

export const getQuote = createServerFn({ method: 'GET' }).handler(async () => {
  const response = await fetch(
    'https://api.api-ninjas.com/v2/randomquotes?categories=inspirational',
    {
      method: 'GET',
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY,
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const data = await response.json()

  return data[0]
})

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
