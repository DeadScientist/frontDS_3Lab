import React from 'react';
import { getAllStringsDS, createStringDS, deleteStringDS } from '../scripts/DSStringsModel';
import { TextField, Button } from '@material-ui/core';
import { logoutUser } from '../scripts/Models/AuthorizationModel';

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
        getAllStringsDS().then(data => this.setState({dsStrings: data}));
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
                <Button
                    variant="contained"
                    onClick={() => {logoutUser()}}
                >
                    
                    Выйти
                </Button>
                <div>
                    <table>
                        <caption>Люди</caption>
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Возраст</th>
                            <th>Действие</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
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
                                    <td>{man.first_name}</td>
                                    <td>{man.last_name}</td>
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
