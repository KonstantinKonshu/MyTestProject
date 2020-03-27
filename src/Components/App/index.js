import React, {Component, PureComponent} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from "../Searchbar";
import YoutubeAPI from "../YoutubeAPI";
import VideoList from "../VideoList"
import {Route} from "react-router-dom";
import CurrentVideoList from "../CurrentVideoList";
import CurrentChannelList from "../CurrentChannelList";
import "./style.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getRequestSearch, handleSubmitInit, handleClickVideo,getBannerChannels} from "../../Actions";
import {KEY} from "../../Constants";


const qs = require('query-string');

class App extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            checkBtn: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLeafing = this.handleLeafing.bind(this);
    }

    // handleOnClick = e => {
    //     console.log('handleOnClick');
    //     let btn_s = document.getElementById('btn_s');
    //     if (e.target == btn_s || e.target.parentNode == btn_s) {
    //         this.setState({
    //             checkBtn: true
    //         })
    //     }
    // };

    componentDidMount() {
        console.log('componentDidMount_APP');
        const  s = qs.parse(this.props.searchRouting);

        if(s['search']!==undefined)
            this.handleSubmit(s['search']);
        else
            if(s['ChannelId']!==undefined)
                this.handleSubmit(s['ChannelId']);
            else
                if(s['id']!==undefined)
                    this.handleSubmit(s['id']);
                
    }

    clickChannelSelect = (channelID) =>{

        let params = {
            channelId: channelID,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        this.requestGetSearch(params, false);

        params = {
            id: channelID,
            part: 'snippet,brandingSettings',
            key: KEY
        }
        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/channels',{params})
            .then(response =>{
                    const bannerUrl  = response.data.items[0].brandingSettings.image.bannerImageUrl;
                    this.props.getBannerChannels(bannerUrl);
                }
            )
            .catch(error => console.log("ERROR", error));

        document.getElementById('btn-back').style.display = 'initial';
        document.getElementById('next').style.display = 'initial';
    };





    render() {
       return (
            <div>
                <div className="header_jumbotron">
                    <SearchBar/>
                </div>

                <div className="container">
                    <div>
                        <Route path={`/videolist`}>
                            <VideoList />
                        </Route>
                    </div>

                    <div>
                        <Route path='/current-video'>
                            <CurrentVideoList/>
                        </Route>
                    </div>
                </div>

                    <div>
                        <Route path='/current-channel'>
                            <CurrentChannelList/>
                        </Route>
                    </div>

                <div className="container">
                    <div id="div_btn_control">
                        <button id='prev'  style={{display: 'none'}} onClick={() => this.handleLeafing(this.props.prevPageToken, false)}>Previous</button>
                        <button id='next' style={{display: 'none'}} onClick={()=>this.handleLeafing(this.props.nextPageToken, true)}>Next</button>
                    </div>
                </div>



            </div>
        )
    };


    handleSubmit = (termFromSearchBar) => {

        console.log('SUBMIT');
        this.props.handleSubmitInit(termFromSearchBar, null, null);
        let params;

        if(this.props.routeName==="/current-video"){
            console.log('handleSubmitCURRENT-Video');
            params = {
                id: termFromSearchBar,
                key: KEY,
                part: 'snippet,contentDetails,statistics,status'
            }
            YoutubeAPI.get(`https://www.googleapis.com/youtube/v3/videos`, {params})
                .then(response =>{
                    this.props.handleClickVideo(response.data.items[0]);

                    //запрос на нахождение подобных видео по Title
                    this.gettingSimilarVideos(response.data.items[0].snippet.title)
                })
                .catch(error => console.log("ERROR", error));
        }
        else{
            if(this.props.routeName==="/videolist"){
                params = {
                    q: termFromSearchBar,
                    part: 'snippet',
                    key: KEY,
                    maxResults: 10
                };
                this.requestGetSearch(params, false);
            }
            else
                if(this.props.routeName==="/current-channel")
                    this.clickChannelSelect(termFromSearchBar);

        }

        document.getElementById('btn-back').style.display = 'none';
        document.getElementById('prev').style.display = 'none';
        document.getElementById('next').style.display = 'initial';
    };

    gettingSimilarVideos = (termName) => {
        const params = {
            q: termName,
            part: 'snippet',
            key: KEY,
            maxResults: 10
        };
        this.requestGetSearch(params, false);
    };



    handleLeafing = (pgToken, indicator) => {
        console.log('handleLeafing ', pgToken);
        let params = {
            q: this.props.searchName,
            part: 'snippet',
            key: KEY,
            maxResults: 10,
            pageToken: pgToken,
        };
        if (indicator) document.getElementById('prev').style.display = 'initial';

        if (this.props.channelId !== null) {
            params["channelId"] = this.props.channelId;
            params['type'] = "video";
        }
        this.requestGetSearch(params, true);
    };



    requestGetSearch = (params, prevIndic) => {

        YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
            .then(response =>{
                    const receivedData = response.data;
                    this.props.getRequestSearch(receivedData);

                    if(prevIndic && receivedData.prevPageToken === undefined)
                        document.getElementById('prev').style.display = 'none';
                }
            )
            .catch(error => console.log("ERROR", error));
    }
}





const mapStateToProps = state =>({
    searchRouting: state.routing.locationBeforeTransitions.search,
    routeName: state.routing.locationBeforeTransitions.pathname,
    searchName: state.videos.search,
    prevPageToken: state.tokens.prevPageToken,
    nextPageToken: state.tokens.nextPageToken,
    channelId: state.channels.channelId
});
const mapDispatchToProps = dispatch =>({
    handleSubmitInit: bindActionCreators(handleSubmitInit, dispatch),
    getRequestSearch: bindActionCreators(getRequestSearch, dispatch),
    handleClickVideo: bindActionCreators(handleClickVideo, dispatch),
    getBannerChannels:bindActionCreators(getBannerChannels, dispatch),

});




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);