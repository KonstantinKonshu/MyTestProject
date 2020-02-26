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
        console.log('2');
        this.setState({
            term: e.target.value
        })
    };


    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.handleFormSubmit(this.state.term);
    // }
    handleSubmit = () => {
        console.log('1');
        this.props.handleFormSubmit(this.state.term);
    };

    // renderingSearchStr = () => {
    //     let qws="";
    //     if(this.state.term!==this.props.searchStr)
    //         qws = this.props.searchStr;
    //         //this.setState({term:this.props.searchStr});
    //     // if(this.state.term!==this.props.searchStr)
    //     //     qws =this.props.searchStr;
    //     // else qws =this.state.term;
    //     return qws;
    // };

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
                            <button id='btn-back' className='btn-back' onClick={this.handleSubmit}>Search</button>
                        </Link>
                        {/*<button  id='btn-back' onClick={e => this.handleSubmit(e)} className='btn-back'>Exit the channel</button>*/}
                    </div>
                </form>

            </div>

        )
    }


}

export default Searchbar