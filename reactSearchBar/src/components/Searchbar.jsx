import { Box, Button, Text, Heading, Input, background } from '@chakra-ui/react'
import React from 'react'
import { Search2Icon } from "@chakra-ui/icons"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";

export const Searchbar = () => {

    const [item,SetItem] = useState([]);
    const [finalFilter, setFinalFilter] = useState([]);

    const getItem =async ()=>{
        const data =await axios.get("http://localhost:8080/countries")
        .then((data)=>data.data);
        console.log(data);
        SetItem(data);

    }

    useEffect(()=>{
        getItem();
    },[]);

    const handleSearch = (value)=>{
        const filterdata = item.filter((val)=>{
            return val.country.toLowerCase().includes(value.toLowerCase());
        });
        if(value == ""){
            setFinalFilter([]);
        }else{
            setFinalFilter(filterdata.slice(0,10));
        }
        
    }

  return (
    <Box id="main">
        <Heading mt="5rem" textAlign="center">Search Country by Name</Heading>
        <Box w="50%" margin="auto" >
            <Box display="flex" p={2} borderBottom="1px solid black">
                <Input border="none" placeholder="enter country name" onChange={(e)=>handleSearch(e.target.value)}></Input>
                <Button ml={2} leftIcon={<Search2Icon />} > Search</Button>
            </Box>
            {   finalFilter.length !== 0 && (
                <Box mt={1} p={2} border="1px solid black" height="400px" overflow="hidden" overflowY="auto"  css={{ '&::-webkit-scrollbar': {display:"none"},}}>
                    {finalFilter.map((itm)=>{
                        return (
                            <Box key ={itm.city} cursor="pointer" borderBottom="1px solid black" pl={1} p={2} _hover={{backgroundColor:"whiteSmoke"}} >
                                <Text fontSize="sm" fontWeight="bold">{itm.country}</Text>
                                <Text fontSize="lg" >{itm.city}</Text>
                            </Box>
                        )
                    })}
                </Box>
                )
            }
            <Heading textAlign="center" mt={3}>Thank You !..........</Heading>
        </Box>

    </Box>
  )
}
