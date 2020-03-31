import React, {Component, PureComponent} from "react";
import SearchBar from "../searchbar/searchbar";
import YoutubeAPI from "../youtubeAPI/youtubeAPI";
import VideoList from "../video_list/video_list"
import {Route} from "react-router-dom";
import CurrentVideoList from "../current_video_list/current_video_list";
import CurrentChannelList from "../current_channel_list/current_channel_list";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getRequestSearch, handleSubmitInit, handleClickVideo,getBannerChannels, setError} from "../../actions";
import {KEY} from "../../constants";
import "./app.scss";

import 'bootstrap/dist/css/bootstrap.css';

const qs = require('query-string');

class App extends PureComponent{
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLeafing = this.handleLeafing.bind(this);
    }


    componentDidMount() {
        console.log('componentDidMount_APP');
        const  s = qs.parse(this.props.searchRouting);

        if(s['search'])
            this.handleSubmit(s['search']);
        else
            if(s['ChannelId'])
                this.handleSubmit(s['ChannelId']);
            else
                if(s['id'])
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
            .catch(error => {
                console.log("ERROR", error);
                this.props.setError(true);
            });

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
                   <div className="div_btn_control">
                        <button id='prev' onClick={() => this.handleLeafing(this.props.prevPageToken, false)}>
                            <img src="https://icongr.am/fontawesome/angle-double-left.svg?size=28&color=000000"/>
                            <h6>Previous</h6>
                        </button>
                        <button id='next' onClick={()=>this.handleLeafing(this.props.nextPageToken, true)}>
                            <h6>Next</h6>
                            <img src="https://icongr.am/fontawesome/angle-double-right.svg?size=28&color=000000"/>
                        </button>
                    </div>
            </div>
        )
    };


    handleSubmit = (termFromSearchBar) => {

        this.props.handleSubmitInit(termFromSearchBar, null);
        let params;

        if(this.props.routeName==="/current-video"){
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
                .catch(error => {
                    console.log("ERROR", error);
                    this.props.setError(true);
                });
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

                    if(prevIndic && !receivedData.prevPageToken)
                        document.getElementById('prev').style.display = 'none';
                }
            )
            .catch(error => {
                console.log("ERROR", error);
                this.props.setError(true);
            });
    }
}





const mapStateToProps = state =>({
    searchRouting: state.routing.locationBeforeTransitions.search,
    routeName: state.routing.locationBeforeTransitions.pathname,
    searchName: state.videosReducer.search,
    prevPageToken: state.tokensReducer.prevPageToken,
    nextPageToken: state.tokensReducer.nextPageToken,
    channelId: state.channelsReducer.channelId
});
const mapDispatchToProps = dispatch =>({
    handleSubmitInit: bindActionCreators(handleSubmitInit, dispatch),
    getRequestSearch: bindActionCreators(getRequestSearch, dispatch),
    handleClickVideo: bindActionCreators(handleClickVideo, dispatch),
    getBannerChannels:bindActionCreators(getBannerChannels, dispatch),
    setError: bindActionCreators(setError, dispatch)


});




export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);