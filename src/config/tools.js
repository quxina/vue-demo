function testFn() {
    console.log(this)
}
function debounce(fn, delay = 300, immed = false) {
    let timer = null
    let timeOutFn
    return function (...args) {
        if(immed && !timer) {
            fn.apply(this, args)
        }
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timeOutFn = timeOutFn ? timeOutFn : () => {
            fn.apply(this, args)
            console.log('debounce')
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(timeOutFn, delay)
    }
}
function throttle(fn, delay = 300) {
    let prevTime = new Date()
    let timer = null
    let timeOutFn
    return function (...args) {
        let e = args[0]
        let newTime = new Date()
        e.cancelBubble = true;
        timeOutFn = timeOutFn ? timeOutFn : () => {
            // console.log('timeout')
            clearTimeout(timer)
            timer = null
            fn.apply(this, args)
        }
        clearTimeout(timer)
        timer = null
        if(newTime - prevTime >= delay) {
            // console.log('throttle')
            fn.apply(this, args)
            prevTime = newTime
        } else {
            timer = setTimeout(timeOutFn, 150)
        }
    }
}
let obj = {
    demoFn() {
        console.log(this)
    }
}
export {
    testFn,
    debounce,
    throttle,
    obj
}