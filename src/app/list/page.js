"use client"

import axios from 'axios';
import { useEffect, useState, useCallback  } from 'react';
import Swiper from '../../components/swiper';

export default function List() {
    const [message, setMessage] = useState('');
    const [code, setCode] = useState([]);
    
    useEffect(()=> {
        getList();
    }, []);

const getList = useCallback (async () => {
    
    try {
        const res = await axios.get('http://localhost:3000/api/list');
        setMessage(res.data.message);
        setCode(res.data.code)

    } catch (error) {
        console.error('Error fetching list:', error);
    }

})

  return (
    <>
        {message && message}
        {code.length > 0 && <Swiper show={4} code={code} speed={1500}/>}
    </>
  );
}



