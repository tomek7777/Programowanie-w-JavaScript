const liczba1 = document.querySelector('#liczba1')
console.btnPrzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')

brnPrzelicz.addEventListener('click', () => {
    wynikiPojemnik.innerHTML = liczba1.value
    console.dir(liczba1.value)
})