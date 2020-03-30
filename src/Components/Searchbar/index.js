import React, {Component} from "react";

import './style.css';
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import {handleSubmitInit, getRequestSearch} from "../../Actions";
import {connect} from "react-redux";
import YoutubeAPI from "../YoutubeAPI";
import {KEY} from "../../Constants";

const qs = require('query-string');

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

    componentDidMount() {
        console.log('componentDidMount_SB');
        const st = qs.parse(this.props.searchRouting);

        if(st["search"]!==undefined){
            this.setState({
                term: st["search"]
            })
        }
    }


    render() {
        const clickSubmit =  () => {
            this.props.handleSubmitInit(this.state.term, null, null);

            const params = {
                q: this.state.term,
                part: 'snippet',
                key: KEY,
                maxResults: 10
            };
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                .then(response => {
                        const receivedData = response.data;
                        this.props.getRequestSearch(receivedData);
                    }
                )
                .catch(error => console.log("ERROR", error));

            document.getElementById('btn-back').style.display = 'none';
            document.getElementById('prev').style.display = 'none';
            document.getElementById('next').style.display = 'initial';
        }

        return(
            <div className="div_search">
                <form >
                    <div>
                        <img  className="img_search" src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000" />
                        <input  className="input_search" onChange={e => this.handleChange(e)} name='search' type='text'
                               value={this.state.term} placeholder='Enter request'/>
                        <Link to={`/videolist?search=${this.state.term}`}>
                            <button className='btn_search' onClick={clickSubmit}>Search</button>
                        {/*</Link>*/}
                        {/*/!*<button onClick={e => this.handleSubmit(e)} className='btn_search'>Search</button>*!/*/}
                        {/*<Link to={`/videolist?search=${this.state.term}`}>*/}
                            <button id='btn-back' className='btn-back' onClick={clickSubmit}>Channel exit</button>
                        </Link>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>({
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