import React, { useState, useEffect } from 'react';
import './index.css';
import axios from 'axios';
import Display from './display';

function App() {

  const [all, setAll] = useState(false);
  const [lyear, setYear] = useState("");
  const [launch, setLaunch] = useState("");
  const [landing, setLanding] = useState("");

  let url = new URL( window.location.href);
  const seturl = (name, value) =>{
    url.searchParams.set(name, value);
    window.history.replaceState({},null,url);
  }

  const handelchange = (e) =>{
    setYear(e.target.value);
    seturl(e.target.name, e.target.value);
  }

  const handellaunch = (ev) =>{
    setLaunch(ev.target.value);
    seturl(ev.target.name, ev.target.value);
  }

  const handellanding = (event) =>{
    setLanding(event.target.value);
    seturl(event.target.name, event.target.value);
  }

  const buttons = () =>{
    var btn= [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    return btn.map((btn, i) => {
      return(
          <label class={i%2 === 0 ? "btn btn-success btn-l" : "btn btn-success btn-l btn-r" }>   
             <input type="radio" name="launchyear" id={`options${i}`}  value={btn} onClick={handelchange} /> {btn}
          </label>
        )
      })  
    }

  const fetchData = () =>{
    axios.get("https://api.spaceXdata.com/v3/launches?limit=50").then(res => res.data)
        .then(data =>{
          console.log(data);
          setAll(data)
    });
  }

  useEffect(() => {
    fetchData()   
  }, []);

  return (
      <div class="container-fluid">
        <header>
          <h4>SpaceX Launch Programs</h4>
        </header>
        <section>
          <div class="row rw">
            <div class="column left col1" >
              <h6>Filter</h6>
              <div class="btn-group btn-group-toggle btn-g" data-toggle="buttons">
                  <label class="lbl">Launch Year</label>
                  {buttons()}
              </div>
              <div class="btn-group btn-group-toggle btn-g" data-toggle="buttons">
                  <label class="lbl">Successful Launch</label> 
                  <label class="btn btn-success btn-l">
                      <input type="radio" name="successfullaunch" id="sln0"  value="true"  onClick={handellaunch}/> True
                  </label>
                  <label class="btn btn-success btn-l btn-r" >
                    <input type="radio" name="successfullaunch" id="sln1"  value="false"  onClick={handellaunch} /> False
                  </label> 
              </div>
              <div class="btn-group btn-group-toggle btn-g" data-toggle="buttons">
                  <label class="lbl" style={{width:140}}>Successful Landing</label>    
                  <label class="btn btn-success btn-l" >
                    <input type="radio" name="successfullanding" id="slan0"  value="true"  onClick={handellanding}/> True
                  </label>
                  <label class="btn btn-success btn-l btn-r" >
                  <input type="radio" name="successfullanding" id="slan1"  value="false" onClick={handellanding}/> False
                  </label>
              </div> 
            </div>
            <Display disData = {all} disyear={lyear} dislaunch={launch} dislanding = {landing}/>
          </div>  
        </section>
        <footer class="footer">
          <p>Developed By Padma Mishra</p>
        </footer> 
      </div>
  );
}

export default App;
