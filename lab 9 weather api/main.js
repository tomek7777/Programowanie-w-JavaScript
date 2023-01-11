const form = document.querySelector('.section-head form'),
  input = document.querySelector('.section-head input'),
  msg = document.querySelector('.section-head .msg'),
  list = document.querySelector('.city-array .cities'),
  apiKey = '4d8fb5b93d4af21d66a2948710284366'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputValue = input.value

  
  const listItems = list.querySelectorAll('.city-array .city')
  const listItemsArray = Array.from(listItems)

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = ''
      if (inputValue.includes(',')) {
        if (inputValue.split(',')[1].length > 2) {
          inputValue = inputValue.split(',')[0]
          content = el
            .querySelector('.city-name span')
            .textContent.toLowerCase()
        } else {
          content = el.querySelector('.city-name').dataset.name.toLowerCase()
        }
      } else {
        content = el.querySelector('.city-name span').textContent.toLowerCase()
      }
      return content == inputValue.toLowerCase()
    })

    if (filteredArray.length > 0) {
      msg.textContent = `${
        filteredArray[0].querySelector('.city-name span').textContent
      } Weather information Already Added`
      input.focus()
      return
    }
  }

  // getting weather data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const { main, name, sys, weather } = data
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`

      const li = document.createElement('li')
      li.classList.add('city')
      const innerMarkupResponse = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <div>
            <p>minimum and max temp</p>
            <span>${main.temp_min}<sup>°C</sup></span> || <span>${
        main.temp_max
      }<sup>°C</sup></span>
        </div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]['description']
      }">
          <figcaption>${weather[0]['description']}</figcaption>
        </figure>
      `
      li.innerHTML = innerMarkupResponse
      list.appendChild(li)
    })
    .catch(() => {
      msg.textContent = 'Wprowadź poprawną nazwę miasta'
    })

  msg.textContent = ''
  form.reset()
  input.focus()
})