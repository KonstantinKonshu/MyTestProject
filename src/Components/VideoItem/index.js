import React, {Component} from "react";
import './style.css';
import {animateScroll as scroll} from "react-scroll";
import {connect, useDispatch} from "react-redux";
import {handleClickVideo, handleClickChannel, getRequestSearch, getBannerChannels, setError} from "../../Actions";
import YoutubeAPI from "../YoutubeAPI";
import {KEY} from "../../Constants";


const VideoItem = ({video}) => {

    const dispatch = useDispatch();

    const clickItem = (video) =>{
        scroll.scrollToTop();

        if(video.id.kind==="youtube#video")
            dispatch(handleClickVideo(video));

        if(video.id.kind==="youtube#channel"){
            dispatch(handleClickChannel(video));

            let params = {
                channelId: video.id.channelId,
                part: 'snippet',
                key: KEY,
                maxResults: 10
            };
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/search', {params})
                .then(response =>{
                        const receivedData = response.data;
                        dispatch(getRequestSearch(receivedData));
                    }
                )
                .catch(error => {
                    console.log("ERROR", error);
                    dispatch(setError(true));
                });

            params ={
                id: video.id.channelId,
                part: 'snippet,brandingSettings',
                key: KEY
            }
            YoutubeAPI.get('https://www.googleapis.com/youtube/v3/channels',{params})
                .then(response =>{
                    const bannerUrl  = response.data.items[0].brandingSettings.image.bannerImageUrl;
                    dispatch(getBannerChannels(bannerUrl));
                })
                .catch(error => {
                    console.log("ERROR", error);
                    dispatch(setError(true));
                });

            document.getElementById('next').style.display = 'initial';
            document.getElementById('btn-back').style.display = 'initial';
        }

    }

    return(
        <div onClick={()=>clickItem(video)} className='video-item item'>

            <div className={video.id.kind==="youtube#video" && 'itemsContainer'}>
                <img className={video.id.kind==="youtube#channel" ? 'ui-imageRadius' : 'ui-image'} src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <div className="play"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></div>
            </div>
            <h6 className="content">
                {video.snippet.title}
            </h6>
        </div>
    )
};

export default VideoItem