import { createServerFn } from '@tanstack/react-start'

export const getQuote = createServerFn({ method: 'GET' }).handler(async () => {
  const response = await fetch(
    'https://api.api-ninjas.com/v2/randomquotes?categories=inspirational',
    {
      method: 'GET',
      headers: {
        'x-api-key': process.env.API_KEY ?? '',
      },
    },
  )

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }

  const data = await response.json()

  return data[0]
})
