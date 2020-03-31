import React, {Component} from "react";
import "./error_handle.scss";


const ErrorHandle = () => {

    return(
        <div className="error-content">
            <img  className="img_search" src="https://icongr.am/clarity/error-standard.svg?size=48&color=8B0000" />
            <h3>Oops...</h3>
        </div>
    )
};

export default ErrorHandle