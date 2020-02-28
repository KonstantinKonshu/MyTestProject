import React, {Component} from "react";

import './style.css';
import { Link } from "react-router-dom";



class Searchbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            term: ""
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        console.log('handleChange');
        this.setState({
            term: e.target.value
        })
    };


    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.handleFormSubmit(this.state.term);
    // }
    handleSubmit = () => {
        console.log('handleSubmit Search');
        this.props.handleFormSubmit(this.state.term);
    };

    render() {
        console.log('--', 'searchbar', this.props.searchStr)
        return(
            <div className='search-bar ui segment'>
                {/*<form onSubmit={er => this.handleSubmit(er)} className=' ui form'>*/}
                <form>
                    <div className='field'>
                        <label htmlFor='search'>Video Search:</label>
                        <input onChange={e => this.handleChange(e)} name='search' type='text'
                               value={this.state.term} placeholder='Enter request'/>
                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button className='btn_search' onClick={this.handleSubmit}>Search</button>
                        </Link>
                        {/*<button onClick={e => this.handleSubmit(e)} className='btn_search'>Search</button>*/}
                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button id='btn-back' className='btn-back' onClick={this.handleSubmit}>Channel exit</button>
                        </Link>
                        {/*<button  id='btn-back' onClick={e => this.handleSubmit(e)} className='btn-back'>Exit the channel</button>*/}
                    </div>
                </form>
            </div>
        )
    }
}

export default Searchbar