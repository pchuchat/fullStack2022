import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import personService from './services/person'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterQuery, setFilterQuery] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus]=useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])


  const handleChange = setValue => e => { setValue(e.target.value) }

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }
    const foundPerson = persons.find(person => person.name === newName)
      

  
  if(foundPerson){
    //console.log('button clicked', event.target)
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
       personService.update(foundPerson.id, newPerson).then(returnedPerson => {
        setPersons(persons.map(person =>
          person.id !== foundPerson.id ? person : returnedPerson 
          )
        )
       })

       .catch(error => {
        setMessageStatus('error')
        setMessage(`Information of ${foundPerson.name} has already been removed from server`)
          
        setTimeout(() => {
          setMessageStatus(null)
          setMessage(null)
        }, 5000)

        setPersons(persons.filter(person => person.id !== foundPerson.id))


       
      })
    }  
    } else {
     
      //console.log('button clicked', event.target)
      personService.create(newPerson).then(addedPerson => {
        setPersons(persons.concat(addedPerson))

        setMessageStatus('success')
        setMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setMessageStatus(null)
          setMessage(null)
        }, 5000)
      
        setNewName('')
        setNewNumber('')


        })
      }  
  }
  const handleRemovePerson = (id, name) => () => {
    //console.log(name, id);
    if (window.confirm(`Delete ${name}?`)) {

      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.name !== name))
      })
    }

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} status={messageStatus}/>
      <Filter query={filterQuery} handleChange={handleChange(setFilterQuery)} />
      <h2>add a new</h2>
      <PersonForm
        addName={newName}
        addNumber={newNumber}
        handleChangeName={handleChange(setNewName)}
        handleChangeNumber={handleChange(setNewNumber)}
        handleAddPerson={addPerson} />

      <h2>Numbers</h2>
      <Persons persons={persons} query={filterQuery}
        handleRemovePerson={handleRemovePerson} />
    </div>
  )

}

export default App 