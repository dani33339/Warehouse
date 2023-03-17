import React, {useEffect,useState} from 'react'
import './admin.css'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {HiClipboardList} from 'react-icons/hi'
import Aos from 'aos'
import 'aos/dist/aos.css'
import {GrFormAdd} from 'react-icons/gr'
import { db, storage} from "../../firebase-config";
import {collection, deleteDoc, doc,getDocs,setDoc} from "firebase/firestore";
import {uid} from "uid";
import {ref,uploadBytes, getDownloadURL} from "firebase/storage";

const Admin = () => {
    useEffect(()=>{
      Aos.init({duration: 4000})
   }, [])

   const [ImgSrc, setImgSrc] = useState(null);
   const [ItemType,setItemType] = useState("");
   const [Location, setLocation] = useState("");
   const [Serial, setSerial] = useState("");
   const [Description, setDescription] = useState("");
   const [Reservations, setReservations] = useState([]);


   const [Items,setItems] = useState([]);
   const ItemsRef = collection(db,"items")
  
   const [Currentitem, setCurrentitem] = useState(null)  

   //uploadImage

   const handleImageChange = (e) => {
    if(e.target.files[0]){
      setImgSrc(e.target.files[0]);
    }
   }


   const onChange = (event) => {
    setItemType(event.target.value);
  };

   const handleSubmit = () => {
    const imageRef = ref(storage, `image/${ImgSrc.name}`);
    uploadBytes(imageRef, ImgSrc)
      .then(() => {
        getDownloadURL(imageRef)
          .then(async (url) =>{
            var uuid;
            if (Currentitem)
            {
              uuid = Currentitem.uuid;
            }
            else{
              uuid = uid();
            }
              await setDoc(doc(db,"items",uuid),{
              uuid,
              ImageUrl: url,
              ItemType: ItemType,
              Serial: Serial,
              Location: Location,
              Description: Description,
              reservations : Reservations,  
            });
            console.log("item added successfully")
            alert("item added successfully"); 
            window.location.reload(false);
         })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
      })
      .catch((error) => {
        alert("Error somthing went wrong please try again"); 
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems=async()=>{
      const data = await getDocs(ItemsRef) 
      setItems(data.docs.map((doc) => (doc.data())));
  }
  
  // field clean
  const clearinput = () =>{
    setImgSrc('');
    setSerial('');
    setLocation('');
    setDescription('');
    setReservations([]);
    setCurrentitem(null)
  }

   
  //delete
   const Deleteitems = async (uuid) => {
    await deleteDoc(doc(db, "items", uuid));
    window.location.reload(false);
   }

   const [active, setActive] = useState('addBar')

    //function to toggle addbar
    const showadd = (item=null) => {
      if (item.uuid)
      {
        setCurrentitem(item)
        setItemType(item.TripType);
        setImgSrc(item.ImageUrl);
        setLocation(item.Location);
        setSerial(item.Serial);
        setDescription(item.Description);
        setReservations(item.reservations);
      }
        setActive('addBar activeaddbar')
    }
    //function to remove addbar
    const removeaddbar = () => {
        clearinput();
        setActive('addBar')
    }

    return (
      <section id='main' className='main section container'>
        
        <div className="secTitle">
          <h1 className="title">
            items additing
          </h1>
        </div>

        
      <button id='addbtn' className='btn flex'  onClick={showadd}>ADD <GrFormAdd className="icon"/> </button>
      <h1>{}</h1>
      {/* menu for adding flights*/}
      <header className="header flex">
        <div className={active}>
            {/* <ul  lassName="addLists flex"> */}

            <div className="addItem">
                <label htmlFor="ticketsAmount">choose item type:</label>
                  <div className="input flex">
                  <select onChange={onChange}>
                  <option value="1">camera</option>
                  <option value="2">recording studio</option>
                  <option value="3">projector</option>
                  </select>
                  </div>
              </div>  


              <div className="addItem">
                <label htmlFor="imgSrc">Choose image:</label>
                  <div className="input flex">
                    <input type="file" onChange={handleImageChange}/>
                </div>
              </div>   

              
              <div className="addItem">
                <label htmlFor="Serial">Enter item Serial number:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter Serial here...' value={Serial} onChange={(event) => {
                    setSerial(event.target.value);
                  }}/>
                </div>
              </div> 
              
               <div className="addItem">
                <label htmlFor="location">Enter item location:</label>
                  <div className="input flex">
                    <input type="text"  placeholder='Enter location here...' value={Location} onChange={(event) => {
                    setLocation(event.target.value);
                  }}/>
                </div>
              </div> 
        

              <div className="addItem">
                <label htmlFor="description">Enter your description:</label>
                  <div className="input flex">
                    <input type="textarea"   placeholder='Enter description here...'  value={Description} onChange={(event) => {
                    setDescription(event.target.value);
                  }}/>
                </div>
              </div>


              <button  className="btn">
                <a onClick={ () => {
                 
                  clearinput()
                  removeaddbar()
                  handleSubmit()
                  }}>Submit</a>
               </button>
            {/* </ul> */}

            <div onClick={removeaddbar} className="closeaddbar">
                <AiFillCloseCircle className="icon" />
            </div>

        </div>
      </header>


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

                    <div id='card_btn'>
                      <button className='btn flex' onClick={() => showadd(item)}>EDIT <HiClipboardList className="icon" /> </button>
                      <button className='btn flex' onClick={() => Deleteitems(item.uuid)}>DELETE <HiClipboardList className="icon" /> </button>
                    </div>
                  </div>
                </div>
        
              )
            }) 
          }
        </div>
       
      </section>
    )
  }
  
  export default Admin