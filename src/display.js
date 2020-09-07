import React from 'react';
import './index.css';

const Display = (props) => {   
    const urlParams = new URLSearchParams(window.location.search);
    const renderList = ({disData}) =>{
        if(disData)
        {
            if( urlParams.has('launchyear')){
                disData = disData.filter((item) => (item.launch_year === urlParams.get('launchyear')));     
            }
            if(urlParams.has('successfullaunch')){
                disData = disData.filter((item) => (item.launch_success.toString() === urlParams.get('successfullaunch')));     
            }
            if(urlParams.has('successfullanding')){
                disData = disData.filter((item) => (
                          item.rocket.first_stage.cores[0].landing_intent.toString() ===  urlParams.get('successfullanding')));  
            }
            return disData.map((data) => {    
                return(
                    <div class="card crd-1 rmrg">
                        <div class="logo">
                            <img src={data.links.mission_patch} class="center img-h" alt="not found"/>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title info2">{data.mission_name}#{data.flight_number}</h6>
                            <label class="info1">Mission Ids : </label><lable class="info2">{data.mission_id}</lable><br/>
                            <label class="info1">Launch Year : </label><lable class="info2">{data.launch_year}</lable><br/>
                            <label class="info1">successful Launch : </label ><lable class="info2">{data.launch_success ? "true": "false"}</lable><br/>
                            <label class="info1">successful Landing : </label><lable class="info2">{data.rocket.first_stage.cores[0].landing_intent ? "true" : "false"}</lable>
                        </div>
                    </div>
                )
            })
        }     
    }
    return(
        <div class="column right rpd">
            {renderList(props)}  
        </div>    
    )
}

export default Display;