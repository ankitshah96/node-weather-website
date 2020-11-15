//import axios from 'axios';
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
   // console.log("Location "+location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
   
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

   /* AXIOS based API Call
   
   let params = {
        address: location
    }
    let url='http://localhost:3001/weather';
    axios.get(url,{params})
    .then( response => {
        responseData=response.data;
        console.log(JSON.stringify(response));
        console.log("Error "+JSON.stringify(response.error));
        if (responseData.error) {
            messageOne.textContent = responseData.error
        } else {
            messageOne.textContent = responseData.location
            messageTwo.textContent = responseData.forecast
        }        
    })*/
})