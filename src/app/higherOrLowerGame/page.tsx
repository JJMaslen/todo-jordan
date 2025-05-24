"use client"

import React from 'react';
import Link from 'next/link';
import '../globals.css';
import './pageCSS.css';

import HowGame from '@/gameComponents/HigherOrLower';

export default function HigherOrLowerGame() {
    const [guesses, setGuesses] = React.useState<number[]>([]);

    return(
        <div className="wrapper">
                <header>
                    <nav>
                        <ul>
                            <li><Link href="/">Todo List</Link></li>
                            <li><Link href="/higherOrLowerGame">Higher or lower game</Link></li>
                            <li><Link href="/nodeClickAndDrag">Bus Route Creator</Link></li>
                        </ul>
                    </nav>
                </header>
            <h1>Higher or lower!</h1>
            <p>Lets play a game of higher or lower</p>
            <div className="higherOrLowerGame">
                <HowGame />
            </div>
        </div>

    );
}