function Header(props){
  return(
    <>
    <h1>Bienvenido al curso {props.name}</h1>
    </>
  )
}

function Part(props){
  return(
    <>
      <p>La parte {props.name} tiene {props.num} ejercicios</p>
    </>
  )
}

function Content(props){
  let arr = props.parts

  return(
    <>
    <h2>Partes del curso</h2>
    <Part name={arr[0].name} num={arr[0].num}/>
    <Part name={arr[1].name} num={arr[1].num}/>
    <Part name={arr[2].name} num={arr[2].num}/>
    </>
  )
}

function Total(props){

  let n = 0
  let parts = props.parts
  parts.map(obj => n = obj.num + n)
  
  return(
    <>
    <h2>Número total de ejercicios</h2>
    <p>El número total de ejercicios para este curso es de {n} ejercicios</p>
    </>
  )
}


function App() {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {name:"Fundamentals of React",num:10},
      {name:"Using props to pass data",num:7},
      {name:"State of a component",num:14}
    ]
  }

  return (
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App
