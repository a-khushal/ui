'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function ScrollWordReveal() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [progress, setProgress] = useState(0)

    const text = `
    In the vibrant world of Framer, a powerful secret was discovered. 
    By implementing the Scroll Word Reveal component in your canvas, 
    you could now glide effortlessly through the content, transforming a static page into a dynamic journey. 
    Each scroll uncovers a new phrase, like a soft spotlight passing across the words.
    The deeper you scroll, the brighter the story becomes.
  `
    const words = text.trim().split(/\s+/)

    const onScroll = useCallback(() => {
        const el = containerRef.current
        if (!el) return
        const maxScroll = el.scrollHeight - el.clientHeight
        const p = maxScroll > 0 ? el.scrollTop / maxScroll : 0
        setProgress(p)
    }, [])

    useEffect(() => {
        onScroll()
        const el = containerRef.current
        if (!el) return
        el.addEventListener('scroll', onScroll)
        const ro = new ResizeObserver(onScroll)
        ro.observe(el)
        return () => {
            el.removeEventListener('scroll', onScroll)
            ro.disconnect()
        }
    }, [onScroll])

    const revealIndex = progress * words.length
    const visibleRange = 6

    return (
        <div className="h-screen flex items-center justify-center bg-black text-white">
            <div
                ref={containerRef}
                className="relative w-[700px] h-[600px] overflow-y-scroll p-12 border border-neutral-800 rounded-2xl leading-relaxed text-[20px] scrollbar-thin scrollbar-thumb-neutral-800"
                style={{ overscrollBehavior: 'contain' }}
            >
                <div style={{ minHeight: '300%' }} />

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 p-12 flex items-start flex-wrap gap-1"
                    style={{ alignContent: 'flex-start' }}
                >
                    {words.map((word, i) => {
                        const distance = revealIndex - i
                        const abs = Math.abs(distance)
                        const raw = Math.max(0, 1 - abs / visibleRange)
                        const eased = raw * raw * (3 - 2 * raw)
                        const opacity = Math.max(0, Math.min(1, eased))
                        const style = {
                            opacity,
                            color: `rgba(255,255,255,${opacity})`,
                            transition: 'opacity 120ms linear',
                        }
                        return (
                            <span key={i} style={style} className="select-text">
                                {word}{' '}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
