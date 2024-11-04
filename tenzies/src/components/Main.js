import React, { useEffect, useState } from 'react'
import Dice from './Dice'
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
export default function Main() {
    const [numbers,setNumbers]=useState(allNewDice());
    const [tenzies,setTenzies]=useState(false);
    useEffect(()=>{
        const heldDice=numbers.every(die=>die.isHeld);
        const firstValue=numbers[0].value;
        const allSameValue=numbers.every(die=> die.value === firstValue);
        if(heldDice && allSameValue){
            setTenzies(true);
        }
    },[numbers])

    function allNewDice(){
        const arr=[];
        for(let i=0;i<10;i++){
            arr.push(generateNewDice());
        }
        return arr;
        
    }
    function generateNewDice(){
        return {
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
        }
    }

    function rollDice(){
        setNumbers(oldDice=>oldDice.map(prev=>{
            return prev.isHeld ?
            prev : generateNewDice()
        }));
    }
    function rollDice2(){
        setTenzies(false);
        setNumbers(allNewDice());
    }

    function holdDice(id){
        setNumbers(oldDice=>oldDice.map(prev=>{
            return prev.id === id ?
            {...prev,isHeld:!prev.isHeld} : prev
        }))
    }
    
    const dicearray=numbers.map((val)=>{
        return(
        <Dice value={val.value} isHeld={val.isHeld} id={val.id} holdDice={()=>{holdDice(val.id)}}/>
        )
    })


  return (
    <div className='main'>
         {tenzies && <Confetti />}
        <div className="dicediv">
       {dicearray}
        </div>
        {tenzies === false && <button className='roll' onClick={rollDice}>Roll</button>}
        {tenzies && <button className='roll'  onClick={rollDice2}>New Game</button>}
     
    </div>
  )
}
