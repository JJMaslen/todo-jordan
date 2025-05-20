"use client"

import React from "react";
import Link from 'next/link';
import '../globals.css';
import './pageCSS.css';

import NodeClickAndDrag from '@/nodeComponents/nodeClickAndDrag';
import SideBar from '@/nodeComponents/SideBar';

export default function nodeClickAndDrag() {
    return (
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
            <div className="nodeClickAndDrag">
                <NodeClickAndDrag />
                <SideBar />
            </div>
        </div>
    );
}