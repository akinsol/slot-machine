import './App.css';
import React from 'react';
import {BsNewspaper} from "react-icons/bs";
import {GiPodium} from "react-icons/gi";
import Slots from './Slots.js';
import Leaderboard from './Leaderboard.js';


function App(props){

    return(
        <div id="main-page">
            <div id="game">
                <Slots player={props.player} />
            </div>
            <div id="instructions">
                <h2><BsNewspaper/> Instructions</h2>
                <p>You start with a balance of $100. Each spin costs $25. Your balance can increase or decrease depending on
                    the result of your spin. You can continue to spin as long as your balance is above $25. </p>
                <p>Payout Rules: </p>
                <ul>
                    <li>X: Nothing (3 X's: Lose $10)</li>
                    <li>Bomb: Lose $10 (3 Bombs: Lose $50)</li>
                    <li>Cherries: Gain $10 (3 Cherries: Gain $50)</li>
                    <li>Grapes: Gain $10 (3 Grapes: Gain $50)</li>
                    <li>Bell: Gain $15 (3 Bells: Gain $75)</li>
                    <li>Seven: Gain $20 (3 Sevens: $100)</li>
                </ul>
            </div>
            <div id="leaderboard">
                <h2><GiPodium/>Leaderboard</h2>
                <Leaderboard />
            </div>
        </div>
    )
}

export default App;
