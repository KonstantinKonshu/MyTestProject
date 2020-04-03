import React, {Component} from "react";
import './video_item.scss';
import {animateScroll as scroll} from "react-scroll";
import {connect, useDispatch} from "react-redux";
import {handleClickVideo, handleClickChannel, getRequestSearch, getBannerChannels, setError} from "../../actions";
import YoutubeAPI from "../youtubeAPI/youtubeAPI";
import {KEY} from "../../constants";


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

            document.getElementsByClassName("yb-app-block_btn_control-next_btn")[0].style.display = 'initial';
            document.getElementsByClassName("yb-sb-main_container-btn_back")[0].style.display = "initial";
        }

    }

    return(
        <div onClick={()=>clickItem(video)} className='yb-vi-main_container'>
            <div className={video.id.kind==="youtube#video" ? 'yb-vi-video_container' : 'yb-vi-channel_container'}>
                <img className={video.id.kind==="youtube#channel" ?
                    'yb-vi-main_container_item-img_channel yb-vi-main_container-img' :
                    'yb-vi-main_container_item-img_video yb-vi-main_container-img'}
                     src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
                <div className="yb-vi-main_container_item-icon_play"><img src="https://img.icons8.com/color/48/000000/youtube-play.png"/></div>
            </div>
            <div className="yb-vi-main_container-title ">
                {video.snippet.title}
            </div>
        </div>
    )
};

export default VideoItem