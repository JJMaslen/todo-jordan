"use client"

import React from 'react';
import Link from 'next/link';
import '../globals.css';

export default function higherOrLowerGame() {
    return(
        <div className="wrapper">
                <header>
                    <nav>
                        <ul>
                            <li><Link href="/">Todo List</Link></li>
                            <li><Link href="/higherOrLowerGame">Higher or lower game</Link></li>
                        </ul>
                    </nav>
                </header>
            <h1>Higher or lower!</h1>
            <p>Lets play a game of higher or lower</p>
        </div>
    );
}