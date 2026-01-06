
import React, { useState,useEffect } from 'react'

import{getLostItemById} from '../../Services/LostItemService'
import{getFoundItemByLostItem} from '../../Services/FoundItemService'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { saveMatchItem } from '../../Services/MatchItemService'


const MatchItemSearch = () => {
   
    let navigate = useNavigate();
    const param  = useParams();

    const [lostItem,setLostItem] = useState({

        lostItemId:"",
        lostItemName:"",
        color:"",
        brand:"",
        category:"",
        location:"",
        username:"",
        lostDate:"",
        status:false,

    });

    const [foundItemDTOList,setfoundItemDTOList] = useState([]);

    const showFoundItems=()=>{
        getLostItemById(param.pid).then((response)=>{
            setLostItem(response.data);
        });
        getFoundItemByLostItem(param.pid).then((response)=>{
            setfoundItemDTOList(response.data);
        });
    }

    useEffect(()=>{
        showFoundItems();
    },[]);

    const returnBack=()=>{
        navigate('/lost-report')
    }

 

  return (

    <div>
        MatchItemSearch

    </div>
  )
}

export default MatchItemSearch