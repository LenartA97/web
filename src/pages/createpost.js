import { useState } from "react";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    async function createNewPost (ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,

        });
        await response.json();
    }
    return(
        <form onSubmit={createNewPost}>
            <input type= "Cím" placeholder={"Játék címe"} value = {title} onChange={ev => setTitle(ev.target.value)}/>
            <input type="Leírás" placeholder = {"Játék leírása"} value={summary} onChange = {ev => setSummary(ev.target.value)}/>
            <input type="file" value = {files} onChange={ev => setFiles(ev.target.files)}/>
            <ReactQuill value = {content} onChange={newValues => setContent(newValue)} module={modules} formats = {formats}/>
            <button style ={{marginTop: '15px'}}> Feltöltés</button>

        </form>
    );
}
    