import React from 'react'

const formats = [
  {
    startTag: '[i]',
    endTag: '[/i]',
    style: 'font-italic'
  },
  {
    startTag: '[b]',
    endTag: '[/b]',
    style: 'font-bold'
  }
]

export const format = (text = '') => {
  let formatted = text
  let snippet, start, end
  let key = 0
  formats.forEach(formatProps => {
    const { startTag, endTag, style } = formatProps
    if (text.indexOf(startTag) > -1 && text.indexOf(endTag) > -1) {
      // build up an array of parts
      formatted = []

      // get everything up to [i]
      start = 0
      end = text.indexOf(startTag)
      snippet = text.slice(start, end)
      formatted.push(snippet)

      // add from [i] to [/i], substituting span with italic class
      start = end + startTag.length
      end = text.indexOf(endTag)
      snippet = text.slice(start, end)
      formatted.push(<span key={key++} className={style}>{snippet}</span>)

      // tack on remainder using recursion
      start = end + endTag.length
      formatted.push(format(text.slice(start)))
    }
  })
  return formatted
}

export const formatDate = (date) => {
  const value = (typeof date === 'string') ? new Date(Date.parse(date)) : date
  return `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`
}

export const formatDateTime = (date) => {
  const value = (typeof date === 'string') ? new Date(Date.parse(date)) : date
  return `${formatDate(value)} at ${value.getHours()}:${("0" + value.getMinutes()).slice(-2)}`
}
