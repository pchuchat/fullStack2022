
import Person from './Person'

const Persons = ({ persons, query, handleRemovePerson }) => {
    return (
        <div>
            {persons.filter(person => person.name.toLowerCase().includes(query))
                .map(({name,id,number}) => (
                <Person key ={id}
                    name={name} 
                    
                    number={number} 
                    handleRemovePerson={handleRemovePerson(id, name)}
                />))}
        </div>
    )
}

export default Persons