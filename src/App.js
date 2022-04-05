// src/App.js
import "./App.css"
import allContacts from "./contacts.json"
import { useState } from 'react'

const inf = 5
const sup = 10
const contactsArray = allContacts.slice(inf,sup)
const infArray = allContacts.slice(0,inf)
const supArray = allContacts.slice(sup)
const remainingArray = infArray.concat(supArray)


function App() {
  const [contacts, setContacts] = useState(contactsArray)
  const addRandomContact = ()=>{
    const randomIndex = Math.floor(Math.random()*remainingArray.length)
    if(remainingArray.length>0){
      const randomContact = remainingArray[randomIndex]
      remainingArray.splice(randomIndex,1) //remove the random
      const newContactsArray = [...contacts, randomContact]
      setContacts(newContactsArray)
    }
    else{console.log('out of contact!')}
  }

  const sortByName = ()=>{
    const sortedContactsArray = [...contacts]
    sortedContactsArray.sort( (a,b)=>a.name.localeCompare(b.name))
    setContacts(sortedContactsArray)
  }

  const sortByPopularity = ()=>{
    const sortedContactsArray = [...contacts]
    sortedContactsArray.sort( (a,b)=>b.popularity-a.popularity)
    setContacts(sortedContactsArray)
  }

  const deleteContact = index =>{
    const updatedContactsArray = [...contacts]
    updatedContactsArray.splice(index,1)
    //note: we don't add the contact back into remainingArray
    setContacts(updatedContactsArray)
  }

  return <div className="App">
    <h1> IronContacts </h1>
    <button onClick={addRandomContact}>Add Random Contact</button>
    <button onClick={sortByPopularity}>Sort by popularity</button>
    <button onClick={sortByName}>Sort by name</button>
    <table>
    <thead>
        <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {contacts.map((contact,index) =>{
          return (
            <tr key={contact.name}>
              <td><img src={contact.pictureUrl} alt="pas dispo"/></td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar?'🏆':''}</td>
              <td>{contact.wonEmmy?'🏆':''}</td>
              <td><button onClick={(index)=>deleteContact(index)}>Delete</button></td>
            </tr>
        )})}

    </tbody>
</table>

  </div>
}
export default App