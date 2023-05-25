import {useEffect, useState} from 'react';
import './App.css'
import NavBar from './components/NavBar.tsx';
import PasswordGenerator from './utils/PasswordGenerator.ts';
import {GeneratePasswordDto} from "./types/GeneratePasswordDto.ts";
import { ToastContainer, toast } from 'react-toastify';

function App() {
    const passwordGenerator = new PasswordGenerator();
    const generatePasswordDto = new GeneratePasswordDto();

    const [password, setPassword] = useState<string>("123456");

    const [savedPasswords, setSavedPasswords] = useState<string[]>([]);

    const [passwordLength, setPasswordLength] = useState<number>(12);

    const myStyles = {
        iconStyles:{
            cursor:"pointer"
        }
    };

    useEffect(() => {

        handleGenerate();

    },[]);

    const handleGenerate = () : void => {

        generatePasswordDto.Length = passwordLength + 1;
        generatePasswordDto.IncludeNumbers = true;
        generatePasswordDto.IncludeLowercaseCharacters = true;
        generatePasswordDto.IncludeUppercaseCharacters = true;
        generatePasswordDto.IncludeSpecialCharacters = true;

        const newPass = passwordGenerator.Generate(generatePasswordDto);

        console.log(newPass);

        setPassword(newPass);

    }

    const handleSavePassword = () => {

        const samePassword = savedPasswords.find(x=>x===password);

        // 1 == "1"
        // 1 === "1"

        if(!samePassword)
            setSavedPasswords([...savedPasswords,password]);

    }

    const handleSavedPasswordDelete = (selectedPass:string) => {

        const newSavedPasswords = savedPasswords.filter((pass) => pass !== selectedPass);

        setSavedPasswords(newSavedPasswords);

    }

    const handleChange = (value:string) => {

        setPasswordLength(Number(value));

        handleGenerate();
    }

    const handleCopyToClipBoard = () => {

        navigator.clipboard.writeText(password);
        toast("The selected password copied to the clipboard.");

    }

    return (
        <>
            <ToastContainer/>
            <NavBar />
            <div className="container App">
                <div className="card-header is-justify-content-center">
                    <h3 className="has-text-success is-size-2">Secure Password Generator</h3>
                </div>
                <div className="card" style={{backgroundColor:"#ECF8F9"}}>

                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <p className="is-size-3">{password}</p>
                            </div>
                            <div className="media-right">
                                <span className="is-size-3" style={myStyles.iconStyles} onClick={handleSavePassword}>📁</span>
                                <span className="is-size-3" style={myStyles.iconStyles} onClick={handleCopyToClipBoard}>📋</span>
                                <span className="is-size-3" style={myStyles.iconStyles} onClick={handleGenerate}>♻️</span>
                            </div>
                        </div>

                        <div className="content has-text-centered">
                            <div className="field">
                                <input id="passwordLengthSelector" type="range"  step={1} min={6} max={40}
                                       value={passwordLength} onChange={(event) => handleChange(event.currentTarget.value)}/>
                                    <label htmlFor="passwordLengthSelector" style={{ fontSize: '24px', fontWeight:"bold" }}>{passwordLength}</label>

                            </div>

                            <ol className="list is-hoverable">
                                {savedPasswords.map((pass,index) => (
                                    <li className="list-item has-text-weight-bold" key={index}>
                                        {pass}
                                        <span style={myStyles.iconStyles} onClick={() => handleSavedPasswordDelete(pass)}>🗑️</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
