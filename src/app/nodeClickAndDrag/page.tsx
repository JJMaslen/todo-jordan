"use client"

import React, { useState } from "react";
import Link from 'next/link';
import '../globals.css';
import './pageCSS.css';

import NodeClickAndDrag from '@/nodeComponents/nodeClickAndDrag';
import SideBar from '@/nodeComponents/SideBar';

export default function nodeClickAndDrag() {
    const [nodes, setNodes] = useState<{route: number, 
        sequenceNumber: number, 
        x: number, 
        y: number, 
        colour: string
    }[]>([]);

    const handleCreateNode = () => {
        setNodes(prev => [
            ...prev,
            { route: 1, colour: "#ff0000", sequenceNumber: prev.length + 1, x:500, y:270 }
        ])
    }

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
            <div className="main">
                <NodeClickAndDrag nodes={nodes} setNodes={setNodes} />
                <SideBar onCreateNode={handleCreateNode}/>
            </div>
        </div>
    );
}