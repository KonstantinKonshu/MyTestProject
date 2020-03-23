import React, {Component} from "react";

import './style.css';
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import {handleSubmitInit, getRequestSearch} from "../../Actions";
import {connect} from "react-redux";
import YoutubeAPI from "../YoutubeAPI";
const qs = require('query-string');

const KEY = 'AIzaSyCIg-49NReS9Qk-ufTjsb7m7tZ_HnI0qqQ';

class Searchbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            term: "",
        }
        console.log("SB_props", props);
    }

    handleChange = (e) => {
        // e.preventDefault();
        console.log('handleChange');
        this.setState({
            term: e.target.value
        })
    };



    // handleSubmit = () => {
    //     // e.preventDefault();
    //     console.log('handleSubmit SearchBAR', this.state.term);
    //     this.props.handleFormSubmit(this.state.term);
    //     document.getElementById("div_btn_control").style.display = 'initial';
    // };


    componentDidMount() {
        const st = qs.parse(this.props.searchRouting);
        // this.searchStr = st["search"];
        if(st["search"]!==undefined){
            this.setState({
                term: st["search"]
            })
        }
    }


    render() {
        const tmp =  () => {
            document.getElementById('btn-back').style.display = 'none';
            document.getElementById('prev').style.display = 'none';
            document.getElementById('next').style.display = 'initial';
            console.log('handleSubmitSEARCH');

            this.props.handleSubmitInit(this.state.term, null, false);

            const params = {
                q: this.state.term,
                part: 'snippet',
                key: KEY,
                maxResults: 10
            };
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                .then(response => this.props.getRequestSearch(response)
                )
                .catch(error => console.log("ERROR", error));

        }

        //console.log('--', 'searchbar', this.searchStr)
        return(
            <div className="div_search">
                <form >
                    <div>
                        <img  className="img_search" src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000" />
                        <input  className="input_search" onChange={e => this.handleChange(e)} name='search' type='text'
                               value={this.state.term} placeholder='Enter request'/>
                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button className='btn_search'  id="btn_s" onClick={tmp}>Search</button>
                        {/*</Link>*/}
                        {/*/!*<button onClick={e => this.handleSubmit(e)} className='btn_search'>Search</button>*!/*/}
                        {/*<Link to={`/videolist?search=${this.state.term}`}>*/}
                            <button id='btn-back' className='btn-back' onClick={() => this.props.handleSubmit(this.state.term)}>Channel exit</button>
                        </Link>
                        {/*<button  id='btn-back' onClick={e => this.handleSubmit(e)} className='btn-back'>Exit the channel</button>*/}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    //nameTitle: state.channels.nameTitle,
    searchRouting: state.routing.locationBeforeTransitions.search,
});

const mapDispatchToProps = dispatch =>({
    handleSubmitInit: bindActionCreators(handleSubmitInit, dispatch),
    getRequestSearch: bindActionCreators(getRequestSearch, dispatch),

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Searchbar);