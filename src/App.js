import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Input, Button } from "semantic-ui-react"
function App() {
    const [email, setEmail] = useState("")
    const [fileName, setFileName] = useState("")
    const [reader_writer, setReaderWriter] = useState("")
    //const [writer, setWriter] = useState("")
    return (
    <div className = "App" >
        <Form>
            <Form.Field>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <input
                    placeholder="File/Folder Name"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                />
            </Form.Field>
            <div class="regular-field">
                <h1>Permission Role</h1>
                <input type="radio" id="radio-six" name="notaswitch-one" value="reader" onChange={e => setReaderWriter(e.target.value)}
                checked = {reader_writer === 'reader'}
                />
                <label for="radio-six">Reader</label>
                <input
                     type="radio" id="radio-seven" name="notaswitch-one"
                     value="writer"
                     checked = {reader_writer === 'writer'}
                     onChange={e => setReaderWriter(e.target.value)}
                 />
                <label for="radio-seven">Writer</label>
            </div>
            <Form.Field>
                <Button
                    onClick={async()=>{
                        const fileEmail = {email,fileName,reader_writer};
                        const response = await fetch("/api/create",{
                            method: "POST",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(fileEmail)
                        });

                        if (response.ok){
                            console.log("Response Worked");
                        }
                    }}
                >
                Create
                </Button>
                <Button
                    onClick={async()=>{
                        const fileEmail = {email,fileName,reader_writer};
                        const response = await fetch("/api/delete",{
                            method: "POST",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(fileEmail)
                        });

                        if (response.ok){
                            console.log("Response Worked");
                        }
                    }}
                >
                Revoke
                </Button>
            </Form.Field>
        </Form>
    </div>
    );
}

export default App;