import { useEffect, useRef } from 'react'

const SRC = 'https://app.astroway.info/widget.js'

/**
 * Loads the Astroway loader once per page and mounts a natal chart widget.
 * The loader mounts every [data-astroway-widget] it finds, so on re-render we
 * only need to make sure the script tag exists.
 */
export default function AstrowayWidget({ lang = 'en', theme = 'dark' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (document.querySelector(`script[src="${SRC}"]`)) return
    const s = document.createElement('script')
    s.src = SRC
    s.async = true
    document.body.appendChild(s)
  }, [])

  return <div ref={ref} data-astroway-widget="natal" data-lang={lang} data-theme={theme} />
}
