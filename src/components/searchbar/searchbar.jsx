import React, {Component} from "react";

import './searchbar.scss';
import { Link } from "react-router-dom";
import {bindActionCreators} from "redux";
import {handleSubmitInit, getRequestSearch, setError} from "../../actions";
import {connect} from "react-redux";
import YoutubeAPI from "../youtubeAPI/youtubeAPI";
import {KEY} from "../../constants";

const qs = require('query-string');

class Searchbar extends Component{

    constructor(props) {
        super(props);
        this.state = {
            term: "",
        }
    }

    handleChange = (e) => {
        // e.preventDefault();
        // console.log('handleChange');
        this.setState({
            term: e.target.value
        })
    };

    componentDidMount() {
        console.log('componentDidMount_SB');
        const st = qs.parse(this.props.searchRouting);

        if(st["search"]){
            this.setState({
                term: st["search"]
            })
        }
    }


    render() {
        const clickSubmit =  () => {
            this.props.handleSubmitInit(this.state.term, null);

            const params = {
                q: this.state.term,
                part: 'snippet',
                key: KEY,
                maxResults: 20
            };
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                .then(response => {
                        const receivedData = response.data;
                        this.props.getRequestSearch(receivedData);
                    }
                )
                .catch(error => {
                    console.log("ERROR", error);
                    this.props.setError(true);
                });
            document.getElementsByClassName("yb-sb-main_container-btn_back")[0].style.display = 'none';
            document.getElementsByClassName("yb-app-block_btn_control-prev_btn")[0].style.display = 'none';
            document.getElementsByClassName("yb-app-block_btn_control-next_btn")[0].style.display = 'initial';
        }

        return(
            <div className="yb-sb-main_container">
                <img  className="yb-sb-main_container-img_search" src="https://icongr.am/clarity/video-gallery.svg?size=30&color=CD0000" />
                <input  className="yb-sb-main_container-input_search yb-general_text_font" onChange={e => this.handleChange(e)} name='search' type='text'
                       value={this.state.term} placeholder='Enter request'/>
                <Link to={`/videolist?search=${this.state.term}`}>
                    <button className='yb-sb-main_container-btn_search yb-general_text_font' onClick={clickSubmit}>{'Search'}</button>
                </Link>
                <Link to={`/videolist?search=${this.state.term}`}>
                    <button className='yb-sb-main_container-btn_back yb-general_text_font' onClick={clickSubmit}>{'Channel exit'}</button>
                </Link>
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
    setError: bindActionCreators(setError, dispatch)

});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Searchbar);