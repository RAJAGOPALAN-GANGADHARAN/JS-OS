import "react-minesweeper/lib/minesweeper.css";
import Minesweeper from "react-minesweeper";
import React from 'react';

export default class MinesweeperGame extends React.Component
{
    render()
    {
        return(<Minesweeper
            onWin={() => console.log("GAME WON")}
            onLose={() => console.log("GAME LOST")}
            bombChance={0.15} // 15% chance that a field will contain a bomb
            width={10} // amount of fields horizontally
            height={10} // amount of fields vertically
        />);
    }
}