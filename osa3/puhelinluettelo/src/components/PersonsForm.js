
import React from 'react'

const PersonForm = ({ addName, addNumber, handleChangeName,handleChangeNumber,handleAddPerson}) => {
    return(
    <form onSubmit={handleAddPerson} >
        <div>
            name: <input value={addName}
                onChange={handleChangeName} />
        </div>
        <div>
            number: <input value={addNumber}
                onChange={handleChangeNumber} />
        </div>
        <div>
            <button type="submit" >add</button>
        </div>
    </form>
    )

}
export default PersonForm