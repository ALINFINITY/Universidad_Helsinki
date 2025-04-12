import './App.css'
import { Course } from './components/course/Course'
import { courses } from './data/datastatic'

export const App = () => {
  const title = 'Web Development Curriculum'
  
  return(
    <>
      <Course title={title} courses={courses}/>
    </>
  )
}

