import { useEffect, useRef } from 'react'

/**
 * Custom hook: attaches an IntersectionObserver to the given ref.
 * Adds the class `reveal--visible` when the element scrolls into view.
 * Elements should have the `reveal` CSS class for initial hidden state.
 *
 * @param {Object} options
 * @param {number} options.threshold - visibility ratio (0-1) to trigger
 * @param {string} options.rootMargin - margin around viewport
 */
export const useScrollReveal = (options = {}) => {
    const ref = useRef(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal--visible')
                    observer.unobserve(el) // only trigger once
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -40px 0px',
            }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [options.threshold, options.rootMargin])

    return ref
}

/**
 * Initializes scroll-reveal observer on ALL elements matching a selector.
 * Call once from a top-level component (e.g. App.jsx).
 * Adds staggered delays based on element index within the parent.
 */
export const initScrollReveal = () => {
    const selectors = [
        '.deals__card',
        '.recommended__card',
        '.category-panel',
        '.category-panel__item',
        '.extra-service__card',
        '.plp__card',
        '.plp__list-item',
        '.hero__promo',
        '.hero__user-card',
        '.newsletter',
        '.inquiry',
    ]

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible')
                    observer.unobserve(entry.target)
                }
            })
        },
        {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px',
        }
    )

    // Small delay so DOM is ready
    requestAnimationFrame(() => {
        selectors.forEach((sel) => {
            document.querySelectorAll(sel).forEach((el, i) => {
                el.classList.add('reveal')
                // Stagger siblings
                el.style.transitionDelay = `${i * 0.07}s`
                observer.observe(el)
            })
        })
    })

    return observer
}

export default useScrollReveal
