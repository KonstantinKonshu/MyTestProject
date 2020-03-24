import React, {Component} from "react";
import './style.css';
import {animateScroll as scroll} from "react-scroll";
import {connect, useDispatch} from "react-redux";
import {handleSelectVideo, handleClickChannel, getRequestSearch, getRequestChannels} from "../../Actions";
import YoutubeAPI from "../YoutubeAPI";
import {KEY} from "../../Constants";


const VideoItem = ({video/*, handleSelectVideo*/}) => {

    const dispatch = useDispatch();

    const clickItem = (video) =>{
        scroll.scrollToTop();

        //dispatch(handleSelectVideo(video));

        if(video.id.kind==="youtube#video")
            dispatch(handleSelectVideo(video));

        if(video.id.kind==="youtube#channel"){
            dispatch(handleClickChannel(video.snippet.channelId, true));
            dispatch(handleSelectVideo(video));

            let params = {
                channelId: video.id.channelId,
                part: 'snippet',
                key: KEY,
                maxResults: 10
            };
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                .then(response =>
                        dispatch(getRequestSearch(response))
                    // this.setState({
                    //     videos: response.data.items,
                    //     nextPageToken: response.data.nextPageToken,
                    //     prevPageToken: response.data.prevPageToken
                    // })
                )
                .catch(error => console.log("ERROR", error));

            params ={
                id: video.id.channelId,
                part: 'snippet,brandingSettings',
                key: KEY
            }
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/channels',{params})
                .then(response =>{
                    dispatch(getRequestChannels(response.data.items[0].brandingSettings.image.bannerImageUrl, true))

                    // this.setState({
                    //     bannerChannel: response.data.items[0].brandingSettings.image.bannerImageUrl,
                    //     isOpenChannel: true,
                    //     checkBtn: false
                    // });
                    console.log('banner', this.state.bannerChannel);
                })
                .catch(error => console.log("ERROR", error));

            document.getElementById('btn-back').style.display = 'initial';
            document.getElementById('next').style.display = 'initial';

            document.getElementById('btn-back').style.display = 'initial';
        }


    }
    return(
        <div onClick={()=>clickItem(video)} className='video-item item'>

            <div className={video.id.kind==="youtube#video" && 'itemsContainer'}>
                <img className='ui-image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <div className="play"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></div>
            </div>
            <h6 className="content">
                {video.snippet.title}
            </h6>
        </div>
    )
};

export default VideoItem