
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (request,_response) => request.method === 'POST' ? JSON.stringify(request.body): ' ')
app.use(
    morgan(( tokens, request ,response) =>[
    tokens.method(request,response),
    tokens.url(request,response),
    tokens.status(request,response),
    tokens.res(request,response ,  'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.body(request,response),
].join(' ')
)
)


let persons = [
{
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
},
{
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
},
{
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
},
{
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
}

]

const generateId = () => Math.floor((Math.random()*1000000)+1)

app.get('/api/persons',(_request,response) =>{
    response.json(persons)
  })

app.get('/info',(request,response) => {
const responseText = `<p>Phonebook has info for ${persons.length} people </p>
<p>${new Date()}</p>`

response.send(responseText)


})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => id ===person.id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
  app.post('/api/persons', (request, response) => {
    const id = generateId()

    if (!request.body.number || !request.body.name) {
        return response.status(400).json({ 
          error: 'name or number is missing.',
        })
    }

    const foundPerson = persons.find(person => person.name === request.body.name)
    
    if(foundPerson){
        return response.status(400).json({ 
            error: 'name must be unique',
          })
    }


    const person = {id, name: request.body.name, number: request.body.number }
    persons = persons.concat(person)

    response.json(person)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()

})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})