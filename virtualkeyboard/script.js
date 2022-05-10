import keys_en from '../keys.js';

/////////adding html structure//////////

const body = document.querySelector('body')

body.insertAdjacentHTML('beforeend', `<header>Virtual Keyboard</header>`)
body.insertAdjacentHTML('beforeend', `<textarea name="field" id="field" cols="50" rows="7"></textarea>`)
body.insertAdjacentHTML('beforeend', `<div class="wrapper"></div>`)
body.insertAdjacentHTML('beforeend', `<footer>
<a href="https://github.com/PaHaNchickT" target="blank" tabindex="-1">GitHub</a>
<div>
    <p>Press Ctrl+Alt for swap language</p>
    <p>Made on Windows</p>
</div>
<a href="https://rs.school/index.html" target="blank" tabindex="-1">RSSchool 2022</a>
</footer>`)

//////////core functions//////////

const wrapper = document.querySelector('.wrapper')
const area = document.querySelector('textarea')
area.focus()
let isCaps = 0

function keys_en_core() {
    // delete_nahuy_all()
    for (let ks in keys_en) {
        if (ks[0] === '+' && ks.length === 2) {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key n${ks[1]}'>${ks[1]}</div>`)
        } else if (ks === 'ShiftL' || ks === 'ShiftR') {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks} shift'>Shift</div>`)
        } else if (ks === 'Space') {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks}'>`)
        } else if (ks === 'rAlt') {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks}'>Alt</div>`)
        } else if (ks === 'rCtrl') {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks}'>Ctrl</div>`)
        } else {
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks}'>${ks}</div>`)
        }
    }
}
keys_en_core()

//////////input field//////////

const allKeys = document.querySelectorAll('.key')
allKeys.forEach(e => {
    e.onclick = function () {
        if (this.textContent.length < 2) {
            if (this.textContent === '') {
                area.value = area.value + ' '
            }
            area.value = area.value + this.textContent
            console.log(this.textContent)
        }

    }
})

//////////consts of keys//////////

const shift = document.querySelectorAll('.shift')
const capslock = document.querySelector('.CapsLock')
const backspace = document.querySelector('.Backspace')
const del = document.querySelector('.Del')
const tab = document.querySelector('.Tab')
const enter = document.querySelector('.Enter')
const ctrlL = document.querySelector('.Ctrl')
const ctrlR = document.querySelector('.rCtrl')
const altL = document.querySelector('.Alt')
const altR = document.querySelector('.rAlt')
const space = document.querySelector('.Space')
const arrup = document.querySelector('.▲')
const arrleft = document.querySelector('.◄')
const arrdown = document.querySelector('.▼')
const arrright = document.querySelector('.►')

//////////SHIFT//////////

function keys_en_shift() {
    wrapper.childNodes.forEach(e => {
        for (let keys in keys_en) {
            if ((keys === e.textContent || keys[1] === e.textContent) && keys_en[keys] !== 'special') {
                e.textContent = keys_en[keys]
            }
        }
    })
}

function keys_en_unshift() {
    wrapper.childNodes.forEach(e => {
        for (let keys in keys_en) {
            if (keys[0] === '+' && keys.length === 2 && keys_en[keys] === e.textContent) {
                e.textContent = keys[1]
            } else if (keys_en[keys] === e.textContent) {
                e.textContent = keys
            }
        }
    })
}

shift.forEach(e => {
    e.addEventListener('mousedown', function () {
        keys_en_shift()
    })

    e.addEventListener('mouseup', function () {
        keys_en_unshift()
    })
})

//////////CAPS LOCK//////////

function caps_up() {
    wrapper.childNodes.forEach(e => {
        for (let keys in keys_en) {
            if ((keys === e.textContent || keys[1] === e.textContent) && keys_en[keys] !== 'special') {
                e.textContent = e.textContent.toUpperCase()
            }
        }
    })
    isCaps = 1
}

function caps_down() {
    wrapper.childNodes.forEach(e => {
        for (let keys in keys_en) {
            if ((keys.toUpperCase() === e.textContent || keys[1] === e.textContent) && keys_en[keys] !== 'special') {
                e.textContent = e.textContent.toLowerCase()
            }
        }
    })
    isCaps = 0
}

capslock.onclick = function () {
    if (isCaps === 0) {
        caps_up()
    } else {
        caps_down()
    }
};

//////////BACKSPACE AND DELETE//////////

function back() {
    let pos
    if (area.selectionStart === area.selectionEnd) {
        pos = area.selectionStart - 1
        area.value = area.value.slice(0, area.selectionStart - 1) + area.value.slice(area.selectionStart, area.value.length)
    } else {
        pos = area.selectionStart
        area.value = area.value.slice(0, area.selectionStart) + area.value.slice(area.selectionEnd, area.value.length)
    }
    area.focus()
    area.selectionStart = pos
    area.selectionEnd = pos
}

function delNext() {
    let pos
    if (area.selectionStart === area.selectionEnd) {
        pos = area.selectionStart
        area.value = area.value.slice(0, area.selectionStart) + area.value.slice(area.selectionStart + 1, area.value.length)
    } else {
        pos = area.selectionStart
        area.value = area.value.slice(0, area.selectionStart) + area.value.slice(area.selectionEnd, area.value.length)
    }
    area.focus()
    area.selectionStart = pos
    area.selectionEnd = pos
}

backspace.onclick = back

del.onclick = delNext

//////////TAB AND ENTER//////////

function tabulation() {
    let pos = area.selectionStart
    area.value = `${area.value}\t`
    area.focus()
    area.selectionStart = pos + 1
    area.selectionEnd = pos + 1
}

tab.onclick = tabulation

enter.onclick = function () {
    let pos = area.selectionStart
    area.value = `${area.value}\n`
    area.focus()
    area.selectionStart = pos + 1
    area.selectionEnd = pos + 1
}

/////////KEYBOARD INTERACTIVE//////////

body.addEventListener('keydown', function (event) {
    area.focus()
    if (event.code.slice(0, 3) === 'Key') {
        if (wrapper.querySelector(`.${event.code[3]}`) === null) {
            wrapper.querySelector(`.${event.code[3].toLowerCase()}`).style.backgroundColor = 'yellow'
        } else {
            wrapper.querySelector(`.${event.code[3]}`).style.backgroundColor = 'yellow'
        }
    } else if (event.code.slice(0, 3) === 'Dig') {
        wrapper.querySelector(`.n${event.code[5]}`).style.backgroundColor = 'yellow'
    } else if (event.code === 'Backspace') {
        backspace.style.backgroundColor = 'yellow'
    } else if (event.code === 'Tab') {
        tabulation()
        tab.style.backgroundColor = 'yellow'
        event.preventDefault()
    } else if (event.code === 'Delete') {
        del.style.backgroundColor = 'yellow'
    } else if (event.code === 'Enter') {
        enter.style.backgroundColor = 'yellow'
    } else if (event.code === 'CapsLock') {
        if (isCaps === 0) {
            caps_up()
        } else {
            caps_down()
        }
        capslock.style.backgroundColor = 'yellow'
    } else if (event.code === 'ShiftLeft') {
        keys_en_shift()
        shift[0].style.backgroundColor = 'yellow'
    } else if (event.code === 'ShiftRight') {
        keys_en_shift()
        shift[1].style.backgroundColor = 'yellow'
    } else if (event.code === 'ControlLeft') {
        wrapper.childNodes[55].style.backgroundColor = 'yellow'
    } else if (event.code === 'AltLeft') {
        event.preventDefault()
        altL.style.backgroundColor = 'yellow'
    } else if (event.code === 'Space') {
        space.style.backgroundColor = 'yellow'
    } else if (event.code === 'AltRight') {
        event.preventDefault()
        altR.style.backgroundColor = 'yellow'
    } else if (event.code === 'ControlRight') {
        ctrlR.style.backgroundColor = 'yellow'
    } else if (event.code === 'ArrowUp') {
        arrup.style.backgroundColor = 'yellow'
    } else if (event.code === 'ArrowDown') {
        arrdown.style.backgroundColor = 'yellow'
    } else if (event.code === 'ArrowLeft') {
        arrleft.style.backgroundColor = 'yellow'
    } else if (event.code === 'ArrowRight') {
        arrright.style.backgroundColor = 'yellow'
    } else if (event.code === 'Backquote') {
        wrapper.childNodes[0].style.backgroundColor = 'yellow'
    } else if (event.code === 'Minus') {
        wrapper.childNodes[11].style.backgroundColor = 'yellow'
    } else if (event.code === 'Equal') {
        wrapper.childNodes[12].style.backgroundColor = 'yellow'
    } else if (event.code === 'BracketLeft') {
        wrapper.childNodes[25].style.backgroundColor = 'yellow'
    } else if (event.code === 'BracketRight') {
        wrapper.childNodes[26].style.backgroundColor = 'yellow'
    } else if (event.code === 'Backslash') {
        wrapper.childNodes[27].style.backgroundColor = 'yellow'
    } else if (event.code === 'Semicolon') {
        wrapper.childNodes[39].style.backgroundColor = 'yellow'
    } else if (event.code === 'Quote') {
        wrapper.childNodes[40].style.backgroundColor = 'yellow'
    } else if (event.code === 'Comma') {
        wrapper.childNodes[50].style.backgroundColor = 'yellow'
    } else if (event.code === 'Period') {
        wrapper.childNodes[51].style.backgroundColor = 'yellow'
    } else if (event.code === 'Slash') {
        wrapper.childNodes[52].style.backgroundColor = 'yellow'
    }
    console.log(event.code)
})

body.addEventListener('keyup', function (event) {
    area.focus()
    if (event.code.slice(0, 3) === 'Key') {
        if (wrapper.querySelector(`.${event.code[3]}`) === null) {
            wrapper.querySelector(`.${event.code[3].toLowerCase()}`).style.backgroundColor = 'black'
        } else {
            wrapper.querySelector(`.${event.code[3]}`).style.backgroundColor = 'black'
        }
    } else if (event.code.slice(0, 3) === 'Dig') {
        wrapper.querySelector(`.n${event.code[5]}`).style.backgroundColor = 'black'
    } else if (event.code === 'Backspace') {
        backspace.style.backgroundColor = 'black'
    } else if (event.code === 'Tab') {
        tab.style.backgroundColor = 'black'
        event.preventDefault()
    } else if (event.code === 'Delete') {
        del.style.backgroundColor = 'black'
    } else if (event.code === 'Enter') {
        enter.style.backgroundColor = 'black'
    } else if (event.code === 'CapsLock') {
        capslock.style.backgroundColor = 'black'
    } else if (event.code === 'ShiftLeft') {
        keys_en_unshift()
        shift[0].style.backgroundColor = 'black'
    } else if (event.code === 'ShiftRight') {
        keys_en_unshift()
        shift[1].style.backgroundColor = 'black'
    } else if (event.code === 'ControlLeft') {
        wrapper.childNodes[55].style.backgroundColor = 'black'
    } else if (event.code === 'AltLeft') {
        event.preventDefault()
        altL.style.backgroundColor = 'black'
    } else if (event.code === 'Space') {
        space.style.backgroundColor = 'black'
    } else if (event.code === 'AltRight') {
        event.preventDefault()
        altR.style.backgroundColor = 'black'
    } else if (event.code === 'ControlRight') {
        ctrlR.style.backgroundColor = 'black'
    } else if (event.code === 'ArrowUp') {
        arrup.style.backgroundColor = 'black'
    } else if (event.code === 'ArrowDown') {
        arrdown.style.backgroundColor = 'black'
    } else if (event.code === 'ArrowLeft') {
        arrleft.style.backgroundColor = 'black'
    } else if (event.code === 'ArrowRight') {
        arrright.style.backgroundColor = 'black'
    } else if (event.code === 'Backquote') {
        wrapper.childNodes[0].style.backgroundColor = 'black'
    } else if (event.code === 'Minus') {
        wrapper.childNodes[11].style.backgroundColor = 'black'
    } else if (event.code === 'Equal') {
        wrapper.childNodes[12].style.backgroundColor = 'black'
    } else if (event.code === 'BracketLeft') {
        wrapper.childNodes[25].style.backgroundColor = 'black'
    } else if (event.code === 'BracketRight') {
        wrapper.childNodes[26].style.backgroundColor = 'black'
    } else if (event.code === 'Backslash') {
        wrapper.childNodes[27].style.backgroundColor = 'black'
    } else if (event.code === 'Semicolon') {
        wrapper.childNodes[39].style.backgroundColor = 'black'
    } else if (event.code === 'Quote') {
        wrapper.childNodes[40].style.backgroundColor = 'black'
    } else if (event.code === 'Comma') {
        wrapper.childNodes[50].style.backgroundColor = 'black'
    } else if (event.code === 'Period') {
        wrapper.childNodes[51].style.backgroundColor = 'black'
    } else if (event.code === 'Slash') {
        wrapper.childNodes[52].style.backgroundColor = 'black'
    }
    console.log(event.code)
})