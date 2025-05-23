const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='From javaScript'

weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location=search.value
    message1.textContent='Loading ...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response) => { 
        response.json().then((data)=>{
          if(data.error){
            message1.textContent=data.error
          }
          else{
            message1.textContent=data.address
            messageTwo.textContent=data.currentweather 
          }
        })
    })
})