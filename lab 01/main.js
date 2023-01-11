const liczba1 = document.querySelector('liczba1')
const btnprzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')



btnprzelicz.addEventListener('click',() =>{
    wynikiPojemnik.innerHTML = liczba1.value
    console.dir(liczba1.value)
})