import React from 'react'




const Header = ({name}) => {

    return (
        <h2>
            {name}
        </h2>
    )
}

const Content = ({parts}) => {
    return (
        <>
            {parts.map(part =>
                <Part key={part.id} part={part.name} exercises={part.exercises} />
            )}
        </>
    )
}


const Part = ({part, exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )

}
const Total = ({exercises}) => {
const initialValue = 0;    
const sum = exercises.reduce((accumu, currValue) => accumu + currValue.exercises,initialValue);
return (
  <>
    <h4>Total of {sum} exercises </h4>
  </>
)}

const Course = ({ course }) => {
    console.log(course);
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total exercises = {course.parts}/> 
        </>
    )
}




export default Course;