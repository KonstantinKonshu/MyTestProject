import React, {Component} from "react";

import './style.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";



class Searchbar extends Component{


    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (e) => {
        this.setState({
            term: e.target.value
        })
        //console.log(e.target.value, '---', this.state.term);
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.handleFormSubmit(this.state.term);
    // }
    handleSubmit = () => {
        this.props.handleFormSubmit(this.state.term);
    }

    render() {
        // console.log('--', 'searchbar')
        return(
            <div className='search-bar ui segment'>
                {/*<form onSubmit={er => this.handleSubmit(er)} className=' ui form'>*/}
                <form>
                    <div className='field'>
                        <label htmlFor='video-search'>Video Search:</label>
                        <input onChange={e => this.handleChange(e)} name='video-search' type='text'
                               value={this.state.term} placeholder='Enter request'/>

                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button className='btn_search' onClick={this.handleSubmit}>Search</button>
                        </Link>
                        {/*<button onClick={e => this.handleSubmit(e)} className='btn_search'>Search</button>*/}
                        <button  id='btn-back' onClick={e => this.handleSubmit(e)} className='btn-back'>Exit the channel</button>
                    </div>
                </form>

            </div>

        )
    }


}

export default Searchbar