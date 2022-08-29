const quoteElement = document.querySelector('.quote')
const authorElement = document.querySelector('.author')

export const changeQuoteBtn = document.querySelector('.change-quote')


function getRandomNumForQuotes(quotesNumber) {
  return Math.floor(Math.random() * quotesNumber)
}

export async function getQuotes(lang) {
  const quotes = `./assets/data/${lang}QuotesData.json`
  const res = await fetch(quotes)
  const data = await res.json()
  const index = getRandomNumForQuotes(data.length)
  quoteElement.textContent = data[index].text
  authorElement.textContent = data[index].author
}

