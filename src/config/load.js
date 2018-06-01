import { debounce, throttle } from './tools'
export const loadMore = {
    directives: {
        'load-more': {
            inserted(el, binding, vnode) {
                let elHeight = el.clientHeight
                let fn = binding.value
                let elScrollHeight
                let elScrollTop
                let checkScroll
                let callback
                let inertiaScroll
                let isScrollStop

                checkScroll = function () {
                    elScrollTop = el.scrollTop
                    elScrollHeight = el.scrollHeight
                    return elScrollHeight - elHeight - elScrollTop <= 300
                }
                callback = function (e) {
                    if (checkScroll()) {
                        fn()
                    }
                }
                el.addEventListener('touchmove', throttle(callback, 300), false)
                isScrollStop = function () {
                    let timer = null;
                    return function(e) {
                        e.cancelBubble = true;
                        let prevScroll = el.scrollTop
                        clearInterval(timer)
                        timer = setInterval(function () {
                            let newScroll = el.scrollTop
                            if (prevScroll == newScroll) {
                                clearInterval(timer)
                                timer = null
                                callback()
                            } else {
                                prevScroll = newScroll
                            }
                        }, 100)
                    }
                }
                el.addEventListener('touchend', isScrollStop())
            },
            componentUpdated(el, binding) {
                if(!binding.modifiers.lazy) {
                    return
                }
                let clientHeight = document.body.clientHeight
                let th = 300
                let domCache = el.querySelectorAll('.lazy-load[unload="true"]')
                let isVisible
                let lazyLoad
                isVisible = function(ele) {
                    let pos = ele.getBoundingClientRect()
                    if (pos.bottom >= -th && pos.top <= clientHeight + th) {
                        return true
                    }
                    return false
                }
                lazyLoad = function() {
                    domCache.forEach(function (ele) {
                        if (!isVisible(ele) || !ele.getAttribute('unload')) return;
                        ele.removeAttribute('unload')
                        let src = ele.dataset.src
                        let img = new Image()
                        img.onload = function () {
                            ele.src = img.src
                        }
                        img.src = src
                    })
                }
                el.onscroll = null
                el.onscroll = throttle(lazyLoad, 400)
                lazyLoad()
            }
        }
    }
}