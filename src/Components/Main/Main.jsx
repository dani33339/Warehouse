import React, {useEffect,useState} from 'react'
import './main.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { useNavigate } from 'react-router-dom'

const Main = (props) => {
  const ItemsRef = collection(db,"items")
  const [Items,setItems] = useState([]);

  let navigate = useNavigate();
  
  useEffect(() => {
    fetchFlights();
    Aos.init({duration: 4000})
  }, [props.Filters])

  async function fetchFlights(){

    const data = await getDocs(ItemsRef) 
    setItems(data.docs.map((doc) => (doc.data())));
  }


  const Order = async (des) => {
    navigate("Order", { state: des });
  };


  return (
    <section id='main' className='main section container'>
      <div className="secTitle">
        <h3 className="title">
          Available items
        </h3>
      </div>

      <div className="secContent grid">
        {
          Items.map((item,index) => {
            return (
              
              <div key={index} data-aos="fade-up" className="singleDestination">
        
              <div className="imageDiv">
              <img src={item.ImageUrl} alt="" />
              </div>
   
             <div className="cardInfo">
              <span className="continent flex">
                 <HiOutlineLocationMarker className="icon"/>
                 <span className="name">location: {item.Location}</span>
              </span>
   
              <div className="fees flex">
                 <div className="grade ">
    
                   <span  className="textD ">Serial </span>
                   <span>{item.Serial} </span>
                 </div>  
                  
              </div>
                
                <div className="desc">
               <p>Description: {item.Description}</p>
              </div>
                 <button className='btn flex'  onClick={() => Order(item)}>Order <HiClipboardList className="icon"/> </button>
                </div>
              </div>
      
            )
          }) 
        }
      </div>
     
    </section>
  )
}

export default Main