import React, {useEffect} from 'react'
import './home.css'
import video from "../../Assets/video3.mp4";
import {GrLocation, GrPowerReset} from 'react-icons/gr'
import {AiOutlineSearch} from 'react-icons/ai'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useState } from 'react';
import Main from '../Main/Main';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Home = () => {

  const [TripType,setTripType] = useState("Roudtrip");
  const [Location, setLocation] = useState("");
  const [Destination, setDestination] = useState("");
  const [DepartureDate, setDepartureDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("");
  const [Filters,setFilters] = useState(null);


  const [ItemType,setItemType] = useState(null);


  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])


  const onChange = (event) => {
    setItemType(event.target.value);
  };
  
  const SetSearch = () => {
    setFilters(null); //reset old filters
    setFilters({TripType,Location,Destination,DepartureDate,ReturnDate})
  };
  

  const ResetSetSearch = () => {
    setFilters(null); //reset old filters
    setTripType("Roudtrip");
    setLocation("");
    setDestination("");
    setDepartureDate("");
    setReturnDate("");
  };

  return (
    
    <><section id='home' className='home'>
      <div className="overlay"></div>
      <video src={video} autoPlay loop muted type="video/mp4"></video>

      <div data-aos="fade-down" className="homeContent container">
        <div className="textDiv">
          <span className="smallText">
            Our Warehouse
          </span>
          <h1 data-aos="fade-down" className="homeTitle">
            Search your item
          </h1>
        </div>

        <div data-aos="fade-down" className="cardDiv grid">

          <div className="FromInput">
                <label htmlFor="ticketsAmount">choose item type:</label>
                  <div className="input flex">
                  <select onChange={onChange}>
                  <option value="1">camera</option>
                  <option value="2">recording studio</option>
                  <option value="3">projector</option>
                  </select>
                  </div>
              </div>  


          <div className="DepartInput">
            <label htmlFor="date">From:</label>
            <div className="input flex">
              <input type="date" value={DepartureDate} onChange={(event) => { setDepartureDate(event.target.value); } } />
            </div>
          </div>

          {TripType === "Roudtrip" &&
            <div className="ReturnInput">
              <label htmlFor="date">Return:</label>
              <div className="input flex">
                <input type="date" value={ReturnDate} onChange={(event) => { setReturnDate(event.target.value); } } />
              </div>
            </div>}
            
            <div className="searchOptions flex" onClick={SetSearch}>
              <span>Search</span>
              <AiOutlineSearch className="icon" />
            </div>

            <div className="ResetsearchOptions flex"  onClick={ResetSetSearch}>
              <span >Reset Search</span>
              <GrPowerReset className="icon" />
            </div>
          
        </div>
        
      </div>

      
    </section><Main Filters = {Filters}/></> 
    
  )
  
}

export default Home