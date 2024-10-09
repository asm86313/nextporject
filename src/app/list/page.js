"use client"

import axios from 'axios';
import { useEffect, useState } from 'react';
import Swiper from '../../components/swiper';

export default function list() {
    const [message, setMessage] = useState('');
    
    useEffect(()=> {
        getList();
    },[]);

const getList = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/list');
        console.log(res);
        setMessage(res.data.message);
    } catch (error) {
        console.error('Error fetching list:', error);
    }

}

  return (
    <>{message}
    <Swiper show={4}/>
    </>
  );
}



