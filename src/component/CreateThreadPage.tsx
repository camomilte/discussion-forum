import React, { useState } from 'react'
import { useThread } from '../context/threadContext'
import { dummyUsers } from '../dummy-data/users';
import { useNavigate } from 'react-router-dom';
import type { Thread } from '../types/types';

/* 
type Formdata={
    title:string;
    description:string;
} */
interface FormElements extends HTMLFormControlsCollection {
  TitleInput: HTMLInputElement
}
interface TitleFormElement extends HTMLFormElement {
  readonly elements: FormElements
}


export default function CreateThreadPage() {

    const {actions}=useThread()
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const creator=dummyUsers[1]
    const navigate = useNavigate();
    function handleSubmit(event:React.FormEvent<TitleFormElement>) {
        event.preventDefault()
        const id =Math.floor(Math.random()*9000)
        const creationDate=new Date();
        const category="QNA"
        const _thread:Thread={
          id,
          title,
          description,
          creationDate,
          creator,
          category,
        }
        actions.createThread(_thread)
        settitle("")
        setdescription("")
        console.log("added",{_thread})
        navigate("/")
    }
  
    
  return (
    <div>
        <h1>Skapa tråd</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input 
             type="text"
             value={title}
             onChange={(e)=>{
              settitle(e.target.value)
             }}
             />
            <label htmlFor="description">description</label>
            <input type="text"
             value={description}
             onChange={(e)=>{
              setdescription(e.target.value)
             }}
             />
            <button type="submit">Skapa</button>
        </form>
    </div>
  )
}
