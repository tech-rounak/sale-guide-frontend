import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DetailsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 80%;
`;

const Header = styled.h1`
  margin: 0;
  color: #262fec;
  font-weight: 700;
  font-size: 45px;
`;

const SubHeader = styled.h3`
  margin-top: 0px;
  color: #000;
  font-weight: 700;
  font-size: 24px;
`;

const Text = styled.p`
  color: #000;
  font-weight: 500;
  font-size: 15px;
  margin-top:-2px;
`;

const FormGroup = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 140px;
  margin-top: 1em;
`;

const Input = styled.input`
  outline: none;
  border: none;
  background-color: #fff;
  padding-left: 1.5em;
  padding-right: 3em;
  border-radius: 5px;
  font-size: 14px;
  margin-top:12px;
  color: #000;
  height: 100%;

  &::placeholder {
    color: #272727;
  }
`;

const SubscribeButton = styled.button`
  position: absolute;
  right: 0%;
  top: 150px;
  height: 35px;
  width: 100%;
  border: none;
  outline: none;
  color: #fff;
  background-color: #262fec;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  border-radius: 5px;
  padding: 0 10px;

  &:hover {
    background-color: #1820bb;
  }
`;

export function Details(props) {
  const [email,setEmail] = useState('');
  const [productLink, setProductLink] = useState('');
  const [price, setPrice] = useState('');
  console.log(email)


  const SubscribeHandler = async() => {
  
    try{
      const payload = {email,productLink,price};
      // console.log(payload);
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
       const resp = await axios.post('https://sale-guide-backend.onrender.com/subscribe',payload,config)
      //  if(resp.d)
      // console.log(resp);
      toast.success(resp?.data?.msg,{
        position: toast.POSITION.TOP_CENTER
      });
      
    }catch(err){
       console.log(err?.response?.data?.msg);
       toast.error(err?.response?.data?.msg,{
        position: toast.POSITION.TOP_CENTER
       });
    }
  }
  return (
    <DetailsContainer>
      <InnerContainer>
        <Header>Sales Guide</Header>
        <SubHeader>Don't miss the best deals !!</SubHeader>
        <Text>
          Get notified about the flipkart products at your desired price.<br />
          All you need to do is to add the product link of the desired product and its price.<br/>
          And we will notify you through email when the price gets triggered.
        </Text>
        <FormGroup>
          <Input type="text" placeholder="example@email.com" onChange = {(e)=>setEmail(e.target.value)} />
          <Input type="text" placeholder="Flipkart Product Link" onChange = {(e)=>setProductLink(e.target.value)}/>
          <Input type="number" placeholder="Price" onChange = {(e)=>setPrice(e.target.value)}/>
          <SubscribeButton onClick = {SubscribeHandler}>Subscribe</SubscribeButton>
          <ToastContainer />
        </FormGroup>
        
      </InnerContainer>
    </DetailsContainer>
  );
}
