import Ticket from "../Ticket/Ticket"
import "./Lottery.css";
import { useState , useEffect } from "react";
import {genTicket,sum} from "../helper"
import Button from "../Button/Button";
import Confetti from 'react-confetti';
import { Howl } from 'howler';

export default function Lottery({n,winningSum}) {
    let [ticket,setTicket] = useState(genTicket(n));
    let isWinning = sum(ticket) === winningSum;
    const winSound = "/win-sound.mp3"

    let buyTicket = () => {
        setTicket(genTicket(n));
    }

    let playWinSound = () => {
      const sound = new Howl({
          src: [winSound],
          volume: 0.5,
      });
      sound.play();
    };

    useEffect(() => {
      if (isWinning) {
        playWinSound();
      }
    }, [isWinning]);

    return (
      <div className="lottery-container">
          {isWinning && <Confetti />}
          <h1>Lottery Game</h1>
          <Ticket ticket={ticket} />
          <br />
          {isWinning && <h2 style={{ color: "green" }}>Congratulations, You Won!</h2>}
          <Button onClick={buyTicket}>Buy New Ticket</Button>
      </div>
  );
}