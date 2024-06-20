import React from 'react'
import '../Game.css';



function GameCircle({id,children,className,onCircleClicked}) {

    return (
        // dynamic styling : style={id % 2 === 0 ?{backgroundColor:'red'}:{backgroundColor:'blue'}} 
        // dynamic classes : className={`GameCircle ${id % 2 === 0 ? "odd" : "even"}`}

        <div className={`GameCircle ${className}`}  onClick={()=>onCircleClicked(id)}>
            {children}
        </div>
    )
}

export default GameCircle
