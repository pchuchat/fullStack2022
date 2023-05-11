const mongoose = require('mongoose')

const password = process.argv[2]
const url =
`mongodb+srv://pchuchat:${password}@puhelinluettelo.ssgitiw.mongodb.net/PuhelinAPPi?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name:String,
    number:String
  })

const Person = mongoose.model('Person', personSchema)

mongoose.connect(url)
.then(() =>{
    console.log('database connected')

    
    if (process.argv.length === 3) {
       return Person.find({})
    
    } else if (process. argv.length === 5){
        const newName = process.argv[3]
        const newNumber = process.argv[4]
    
    
        const newPerson = new Person ({
            name: newName,
            number: newNumber
        })
    
       return newPerson.save()
    
    }

}).then(data => {
    if (process.argv.length === 3) {
        console.log('phonebook:')

        data.forEach(person => {
        console.log(`${person.name} ${person.number}`)

        })
        
    } else if(process. argv.length === 5) {
        console.log(
            `added ${data.name} number ${data.number} to phonebook`
            )

    }
    
    mongoose.connection.close()

})


