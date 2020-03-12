import React, {Component} from "react";

import './style.css';
import { Link } from "react-router-dom";
const qs = require('query-string');



class Searchbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            term: "",
        }
        // console.log("SB", props);
        // const st = qs.parse(props.history.location.search);

        console.log("SB", props);
        // const st = qs.parse(props.history.location.search);
        // // this.searchStr = st["search"];
        // if(st["search"]!==undefined){
        //     this.setState({
        //         term: st["search"]
        //     })
        // }
        // if(props.searchStr=="")
        //     this.setState({
        //        term: st["search"]
        //     });
    }

    handleChange = (e) => {
        // e.preventDefault();
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
        // e.preventDefault();
        console.log('handleSubmit SearchBAR');
        this.props.handleFormSubmit(this.state.term);
        document.getElementById("div_btn_control").style.display = 'initial';
    };


    componentDidMount() {
        const st = qs.parse(this.props.history.location.search);
        // this.searchStr = st["search"];
        if(st["search"]!==undefined){
            this.setState({
                term: st["search"]
            })
        }
    }

    // handleExitChannel = () => {
    //     console.log('handle exit channel');
    //     this.props.handleFormSubmit(this.state.term);
    //     document.getElementById("div_btn_control").style.display = 'initial';
    // };

    render() {
        console.log('--', 'searchbar', this.searchStr)
        return(
            <div /*className='search-bar ui segment'*/className="div_search">
                {/*<form onSubmit={er => this.handleSubmit(er)} className=' ui form'>*/}
                <form >
                    <div /*className='field'*/ >
                        <img  className="img_search" src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000" />
                        <input  className="input_search" onChange={e => this.handleChange(e)} name='search' type='text'
                               value={this.state.term} placeholder='Enter request'/>
                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button className='btn_search'  id="btn_s" onClick={this.handleSubmit}>Search</button>
                        {/*</Link>*/}
                        {/*/!*<button onClick={e => this.handleSubmit(e)} className='btn_search'>Search</button>*!/*/}
                        {/*<Link to={`/videolist?search=${this.state.term}`}>*/}
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