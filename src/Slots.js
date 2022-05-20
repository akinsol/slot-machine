import React, { useState, useEffect } from "react";
import blank from "./Files/blank.png";
import bomb from "./Files/bomb.png";
import cherries from "./Files/cherries.png";
import grapes from "./Files/grapes.png";
import bell from "./Files/bell.png";
import seven from "./Files/seven.png";
import x from "./Files/x.png";
import ReactDOM from "react-dom";
import Welcome from './index.js'

const request = new XMLHttpRequest();

function Slots(props) {

    const [slot1, setSlot1] = useState(blank);
    const [slot2, setSlot2] = useState(blank);
    const [slot3, setSlot3] = useState(blank);
    const [prize, setPrize] = useState(100);

    let session = {
        id: 0,
        player: props.player,
        day: new Date().toDateString(),
        earnings: 0,
    };

    useEffect(() => {
        if (prize < 25) {
            alert("You don't have enough money left to play. You've been kicked out!");
            window.location.reload();
        }
    });

    const reload = () => {
        ReactDOM.render(
            <React.StrictMode>
                <Welcome />
            </React.StrictMode>,
            document.getElementById('root')
        )
    }

    const endGame = () => {
        session.earnings = prize;
        request.open("POST", "http://127.0.0.1:8000/add_record/",true);
        request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(JSON.stringify(session));
        alert("Thanks for playing!");
        reload();
    }

    const spinResult = (slot) => {
        switch (Number(slot)) {
            case 0:
                return x;
            case 1:
                return bomb;
            case 2:
                return cherries;
            case 3:
                return grapes;
            case 4:
                return bell;
            case 5:
                return seven;
        }
    }

    const calculateJackpot = (slot) => {
        switch (Number(slot)) {
            case 0:
                setPrize((prevPrize) => prevPrize - 10);
                break;
            case 1:
                setPrize((prevPrize) => prevPrize - 50);
                break;
            case 2:
                setPrize((prevPrize) => prevPrize + 50);
                break;
            case 3:
                setPrize((prevPrize) => prevPrize + 50);
                break;
            case 4:
                setPrize((prevPrize) => prevPrize + 75);
                break;
            case 5:
                setPrize((prevPrize) => prevPrize + 100);
                break;
        }
    }

    const calculateSlots = (slot) => {
        switch (Number(slot)) {
            case 0:
                break;
            case 1:
                setPrize((prevPrize) => prevPrize - 10);
                break;
            case 2:
                setPrize((prevPrize) => prevPrize + 10);
                break;
            case 3:
                setPrize((prevPrize) => prevPrize + 10);
                break;
            case 4:
                setPrize((prevPrize) => prevPrize + 15);
                break;
            case 5:
                setPrize((prevPrize) => prevPrize + 20);
                break;
        }
    }

    const prizeResult = (slot1, slot2, slot3) => {
        if (slot1 == slot2 && slot1 == slot3) {
            calculateJackpot(slot1);
        }
        else {
            let slots = [slot1, slot2, slot3]
            for (const slot of slots) {
                calculateSlots(slot)
            }
        }
    }

    const handleClick = () => {
        setPrize(prevPrize => prevPrize - 25);
        let slot1, slot2, slot3;
        slot1 = Math.floor(Math.random() * 6);
        slot2 = Math.floor(Math.random() * 6);
        slot3 = Math.floor(Math.random() * 6);
        setSlot1(spinResult(slot1));
        setSlot2(spinResult(slot2));
        setSlot3(spinResult(slot3));
        prizeResult(slot1, slot2, slot3);
    }

    return (
        <div id="game-section">
            <div id="slot-box">
                <div id="info-section">
                    <p>Name: {props.player}</p>
                    <p>Current Balance: ${prize}</p>
                </div>
                <div className="slots" id="slot1"><img src={slot1} height={145} width={145}  alt="slot1"/></div>
                <div className="slots" id="slot2"><img src={slot2} height={145} width={145}  alt="slot2"/></div>
                <div className="slots" id="slot3"><img src={slot3} height={145} width={145}  alt="slot3"/></div>
                <button id="lever" type="button" onClick={handleClick}>SPIN</button>
            </div>
            <button id="end-game" onClick={endGame}>Walk Away</button>
        </div>
    )
}
export default Slots;