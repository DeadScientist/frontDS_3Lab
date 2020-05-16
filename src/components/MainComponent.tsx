import React from 'react';
import { getAllStringsDS, createStringDS, deleteStringDS } from '../scripts/DSStringsModel';
import { TextField, Button } from '@material-ui/core';
import { logoutUser } from '../scripts/Models/AuthorizationModel';
import { KEY_LOCAL_STORAGE_USER_NAME } from '../constants/LocalStorageConstants';

export default class MainComponent extends React.Component<any, any>
{
    constructor(props: any)
    {
        super(props);
        this.state = {
            dsStrings: [],
            firstName: "",
            lastName: "",
            age: 0
        };
        this.getAllStandard();
    }

    getAllStandard(): void
    {
        let increated_users_inj = localStorage.getItem(KEY_LOCAL_STORAGE_USER_NAME);
        if (increated_users_inj !== null) {
            getAllStringsDS(increated_users_inj)
                .then((response:any) => this.setState({dsStrings: response}));
        }
    }

    getAllEjection(): void
    {
        getAllStringsDS("%%")
            .then((response:any) => this.setState({dsStrings: response}));
    }

    resetState()
    {
        this.setState({
            firstName: "",
            lastName: "",
            age: 0
        });
    }

    create()
    {
        const {
            firstName,
            lastName,
            age,
            dsStrings
        } = this.state;
        createStringDS(
            firstName,
            lastName,
            age
        )
            .then(data => {
                this.resetState();
                let tempArray = dsStrings;
                tempArray.push(data);
                this.setState({dsStrings: tempArray});
            });
    }

    delete(inID: number)
    {
        const {
            dsStrings
        } = this.state;
        deleteStringDS(inID)
            .then(() => {
                this.setState({dsStrings: dsStrings.filter((man: any) => man.id !== inID)});
            });
    }

    render()
    {
        const {
            dsStrings,
            firstName,
            lastName,
            age
        } = this.state;
        return (
            <div>
                <div
                    style={{display: "flex",flexDirection: "row", width: "100%", margin: "30px", justifyContent: "space-around"}}
                >
                    <Button
                        variant="contained"
                        onClick={() => {this.setState({
                            firstName: "<div onClick=\"alert('тебя взломали!')\">неприметный текст</div>",
                            lastName: "<div onMouseMove=\"alert('haha')\">неприметный текст</div>"
                        })}}
                    >
                        инъекция жс 1
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.setState({
                            firstName: "<b style='color: red; font-size: 32px; font-weight: bold; background: blue'>оп, что за?</b>",
                            lastName: "<b style='color: white; font-size: 62px; font-weight: bold; background: green'>ыыыы</b>"
                        })}}
                    >
                        инъекция жс 2
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.getAllStandard()}}
                    >
                        обычная загрузка
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => {this.getAllEjection()}}
                    >
                        инъекция
                    </Button>
                    <Button
                    variant="contained"
                    onClick={() => {logoutUser()}}
                >
                    
                    Выйти
                 </Button>
                </div>
               
                <div>
                    <table>
                        <caption>Люди</caption>
                        <thead>
                        <tr>
                            <th>Создатель</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Возраст</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>
                                </td>
                                <td>
                                    <TextField
                                        variant="outlined"
                                        label="Имя"
                                        type="text"
                                        value={firstName}
                                        onChange={(event: any) => {this.setState({firstName: event.target.value});}}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        variant="outlined"
                                        label="фамилия"
                                        type="text"
                                        value={lastName}
                                        onChange={(event: any) => {this.setState({lastName: event.target.value});}}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        variant="outlined"
                                        label="возраст"
                                        type="text"
                                        value={age}
                                        onChange={(event: any) => {this.setState({age: parseInt(event.target.value)});}}
                                    />
                                </td>
                                <td>
                                    <Button
                                        variant="contained"
                                        onClick={() => {this.create()}}
                                    >
                                        
                                        Создать
                                    </Button>
                                </td>
                            </tr>
                            {dsStrings.map((man: any) => (
                                <tr key={"KEY_ITEM_" + man.id}>
                                    <td>{man.created_users_inj}</td>
                                    <td 
                                        id={"stringFirstName" + man.id}
                                        ref={() => {
                                            let id = "stringFirstName" + man.id;
                                            let object = document.getElementById(id);
                                            if (object) {
                                                object.innerHTML = man.first_name;
                                            }
                                        }}
                                    />
                                    <td
                                        id={"stringLastName" + man.id}
                                        ref={() => {
                                            let id = "stringLastName" + man.id;
                                            let object = document.getElementById(id);
                                            if (object) {
                                                object.innerHTML = man.last_name;
                                            }
                                        }}
                                    />
                                    <td>{man.age}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            onClick={() => {this.delete(man.id)}}
                                        >
                                            
                                            Удалить
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
