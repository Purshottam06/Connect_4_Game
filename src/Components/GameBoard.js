import React,{useEffect, useState} from 'react';
import GameCircle from './GameCircle';
import '../Game.css';
import Header from './Header';
import Footer from './Footer';
import {isWinner,isDraw,getComputerMove} from '../Helper';
import { GAME_STATE_DRAW,GAME_STATE_PLAYING, GAME_STATE_WIN,NO_PLAYER,PLAYER_1,PLAYER_2 ,NO_Circle} from '../Constants';




const GameBoard=()=>{
    const [gameBoard,setGameBoard] = useState(Array(NO_Circle).fill(NO_PLAYER))
    const[currentPlayer,setCurrentPlayer] = useState(PLAYER_1)
    const[gameState,setGameState] = useState(GAME_STATE_PLAYING)
    const[winPlayer,setWinPlayer] = useState(NO_PLAYER)

    useEffect(()=>{
        initGame()
    },[])

    const initGame=()=>{
        setGameBoard(Array(NO_Circle).fill(NO_PLAYER))
        setCurrentPlayer(PLAYER_1)
        setGameState(GAME_STATE_PLAYING)
    }

    // Helper function
    const initBoard=()=>{
        const circles=[];
        for(let i=0;i<gameBoard.length;i++){
            circles.push(renderCircle(i))
        }
        return circles
    }

    const suggestMove =()=>{
       circleClicked(getComputerMove(gameBoard))
    }

    const circleClicked = (id)=>{
        // const board=[...gameBoard];
        // board[id] =currentPlayer
        // setGameBoard(board);
        if(gameBoard[id]!== NO_PLAYER)return;
        if(gameState!== GAME_STATE_PLAYING)return;

        if(isWinner(gameBoard,id,currentPlayer,winPlayer)){
            setGameState(GAME_STATE_WIN)
            setWinPlayer(currentPlayer)
        }

        if(isDraw(gameBoard,id,currentPlayer,winPlayer)){
            setGameState(GAME_STATE_DRAW)
            setWinPlayer(NO_PLAYER)
        }
        
        setGameBoard(prev=>{
            return prev.map((circle,pos)=>{
                if(pos ===id) return currentPlayer
                return circle
            })

        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 :PLAYER_1)

    }

    // Helper function
    const renderCircle = (id)=>{
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`}onCircleClicked={circleClicked} ></GameCircle>
    }
    
    return (
        <>
            <Header GameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer}/>
            <div className="GameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
        </>
    )
}

export default GameBoard;