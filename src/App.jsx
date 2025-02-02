import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PersonProfile from './pages/PersonProfile';

export default function App() {
  const [hiredPeople, setHiredPeople] = useState([])
  const [people, setPeople] = useState([])

  const baseURL = "https://randomuser.me/api/?results=50"

  function addHiredPeople(newPerson, wage) {
    const alreadyHired = hiredPeople.some(person => person.id.value === newPerson.id.value)
    
    if(!alreadyHired) {
      setHiredPeople([...hiredPeople, {...newPerson, wage: wage}])
      setPeople(p => p.filter(person => person.id.value !== newPerson.id.value))
    }else {
      const existingPerson = hiredPeople.findIndex(person => person.id.value === newPerson.id.value)
      if (existingPerson !== -1) {
        const updatedHiredPeople = [...hiredPeople]
        updatedHiredPeople[existingPerson].wage = wage;
        setHiredPeople(updatedHiredPeople)
      }
    }

  }

  useEffect(() => {
    fetch(baseURL)
    .then(res => res.json())
    .then(data => setPeople(data.results))
  },[])

  return (
    <>
      <header>
        <h1>Hire Your Team</h1>
        <nav>
          <ul>
            <Link to="/">Dashboard</Link>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route
          path="/"
          element={<Dashboard hiredPeople={hiredPeople} people={people} />}
        />
        <Route
          path='/view/:id'
          element={<PersonProfile people={people} hiredPeople={hiredPeople} addHired={addHiredPeople}/>}
        />
      </Routes>
    </>
  )
}
