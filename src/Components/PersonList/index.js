import React, {Component, PureComponent} from "react";
import axios from "axios";
//import Article from "../Article";
//import './style.css'


class PersonList extends Component{
    state={
        persons: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then( res =>{
                    console.log('res')
                    // const persons = res.data
                    this.setState({
                        persons: res.data
                    })
                }
            )
    }


    render() {
        return (
            <ul>
                { this.state.persons.map(
                   person => <li key={person.id}>{ person.name}</li>
                )}
            </ul>
        );
    }
    // render() {
    //     return (
    //         <h2>personList</h2>
    //     );
    }


    // state={
    //     persons: []
    // }
    //
    // componentDidMount() {
    //     axios.get('https://jsonplaceholder.typicode.com/users')
    //         .then( res =>{
    //                 console.log('res')
    //                 // const persons = res.data
    //                 this.setState({
    //                     persons: res.data
    //                 })
    //             }
    //         )
    // }
    //
    //
    // render() {
    //     return (
    //         <ul>
    //             { this.state.person.map(
    //                 <li>
    //                     {person.name}
    //                 </li>
    //             )}
    //         </ul>
    //     );
    // }

//}

export default PersonList