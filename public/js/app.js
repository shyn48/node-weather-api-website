console.log('Client side javascript file is loaded!')

const weaetherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('.msg1')
const msgTwo = document.querySelector('.msg2')

weaetherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = ''
    msgTwo.textContent = ''

    const loaction = search.value
    msgOne.textContent = 'Fetching weather data'
    fetch(`/weather?address=${loaction}`).then((res) => {
        res.json().then((data) => {
            if(data.error){
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.loaction
                msgTwo.textContent = data.data
            }
        })
    })
})