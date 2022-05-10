import keys_en from '../keys.js';

/////////adding html structure//////////

const body = document.querySelector('body')

body.insertAdjacentHTML('beforeend', `<header>Virtual Keyboard</header>`)
body.insertAdjacentHTML('beforeend', `<textarea name="field" id="field" cols="50" rows="7"></textarea>`)
body.insertAdjacentHTML('beforeend', `<div class="wrapper"></div>`)
body.insertAdjacentHTML('beforeend', `<footer>
<a href="https://github.com/PaHaNchickT" target="blank">GitHub</a>
<div>
    <p>Press Ctrl+Alt for swap language</p>
    <p>Made on Windows</p>
</div>
<a href="https://rs.school/index.html" target="blank">RSSchool 2022</a>
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
            wrapper.insertAdjacentHTML('beforeend', `<div class='key ${ks[1]}'>${ks[1]}</div>`)
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

tab.onclick = function () {
    let pos = area.selectionStart
    area.value = `${area.value}\t`
    area.focus()
    area.selectionStart = pos + 1
    area.selectionEnd = pos + 1
}

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
        // wrapper.querySelector(`.${event.code[5].toString()}`).style.backgroundColor = 'yellow'
        console.log(wrapper.querySelector('.1'))
    }
    if (event.code === 'Backspace') {
        backspace.style.backgroundColor = 'yellow'

    }
    console.log(event.code)
})

// body.addEventListener('keyup', function (event) {
//     if (event.code === 'Backspace') {
//         backspace.style.backgroundColor = 'black'
//     }
//     console.log(event.code)
// })