import React, { useRef, useState } from "react";

const DEFAULT_NODE_SIZE = 20;
const DEFAULT_NODE_COLOUR = "#4a90e2";

function Node({
    nodeSize = DEFAULT_NODE_SIZE,
    parentRef,
    nodeColour = DEFAULT_NODE_COLOUR,
    x,
    y,
    onDrag
}: {
    nodeSize?: number;
    parentRef: React.RefObject<HTMLDivElement>;
    nodeColour?: string
    x: number,
    y: number,
    onDrag: (newX: number, newY: number) => void;
}) {

    const nodeRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (event: React.MouseEvent) => {
        setDragging(true);
        setOffset({
            x: event.clientX - x,
            y: event.clientY - y,
        })
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (dragging) {

            const parentRect = parentRef.current.getBoundingClientRect();

            var newX = event.clientX - offset.x;
            var newY = event.clientY - offset.y;

            newX = Math.max(0, Math.min(newX, parentRect.width - nodeSize));
            newY = Math.max(0, Math.min(newY, parentRect.height - nodeSize));

            onDrag(newX, newY);
        }
    };

    React.useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, offset]);

    return (
        <div
            ref={nodeRef}
            className="nodeClick"
            onMouseDown={handleMouseDown}
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: nodeSize,
                height: nodeSize,
                background: nodeColour,
                cursor: "grab",
                borderRadius: "50%",
                border: "2px solid",
                borderColor: "#ffffff",
            }}
        ></div>
    )
}

interface NodeClickAndDragProps {
    nodes: {
        route: number,
        sequenceNumber: number,
        colour: string,
        x: number,
        y: number
    }[];
    setNodes: React.Dispatch<React.SetStateAction<{
        route: number,
        sequenceNumber: number,
        colour: string,
        x: number,
        y: number
    }[]>>
}

function NodeClickAndDrag({ nodes, setNodes }: NodeClickAndDragProps) {
    const parentRef = useRef<HTMLDivElement>(null!);
    const nodeSize = 20;

    const handleNodeDrag = (index: number, newX: number, newY: number) => {
        setNodes(prev =>
            prev.map((node, i) =>
                i === index ? { ...node, x: newX, y: newY } : node
            )
        );
    };
    return (
        <div className="nodeClick" ref={parentRef}>
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none"
                }}
            >
                {nodes.length > 1 &&
                    nodes.slice(1).map((node, i) => (
                        <line
                            key={i}
                            x1={nodes[i].x + nodeSize / 2}
                            y1={nodes[i].y + nodeSize / 2}
                            x2={node.x + nodeSize / 2}
                            y2={node.y + nodeSize / 2}
                            stroke={node.colour}
                            strokeWidth={5}
                        />
                    ))
                }
                {nodes.length > 1 && (
                    <line
                        key="close"
                        x1={nodes[nodes.length - 1].x + nodeSize / 2}
                        y1={nodes[nodes.length - 1].y + nodeSize / 2}
                        x2={nodes[0].x + nodeSize / 2}
                        y2={nodes[0].y + nodeSize / 2}
                        stroke={nodes[0].colour}
                        strokeWidth={5}
                    />
                )}
            </svg>
            {nodes.map((node, i) => (
                <Node
                    key={node.sequenceNumber}
                    parentRef={parentRef}
                    nodeColour={node.colour}
                    nodeSize={nodeSize}
                    x={node.x}
                    y={node.y}
                    onDrag={(newX, newY) => handleNodeDrag(i, newX, newY)}
                />
            ))}
        </div>
    )
}

export default NodeClickAndDrag;