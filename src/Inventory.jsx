import React, { useRef, useState, useEffect } from "react";
import "./Inventory.css";

const STICKER_WIDTH = 200;

export default function Inventory() {
    const [scrollPos, setScrollPos] = useState(0);
    const containerRef = useRef();
    const leftBtnRef = useRef();
    const rightBtnRef = useRef();
    const numbers = Array.from({ length: 14 }, (_, i) => i);

    function mapNumberToUrl(number) {
        return `c${number}.png`;
    }

    const renderStickers = () => numbers.map((number, index) => (
        <div key={index}>
            <img
                src={`images/c${number}.png`}
                className="sticker"
            />
        </div>
    ));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.scrollLeft = scrollPos;
    }, [scrollPos]);

    const handleScroll = (scrollAmount) => {
        const max = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        //calculate new scroll pos        
        setScrollPos(prev => {
            const newPos = prev + scrollAmount;
            if (newPos > max) {
                return max;
            }
            else if (newPos < 0) {
                return 0;
            }
            else {
                return newPos;
            }
        });
    };

    return (
        <div className="container">
            <div
                ref={containerRef}
                style={{
                    width: "900px",
                    overflowX: "hidden",
                    scrollBehavior: "smooth"
                }}
            >
                <div className="inventory-shelf">
                    {renderStickers()}
                </div>
            </div>

            <div className="nav-btns">
                <button
                    ref={leftBtnRef}
                    onClick={() => { handleScroll(-STICKER_WIDTH) }}
                >Scroll Left</button>
                <button
                    ref={rightBtnRef}
                    onClick={() => { handleScroll(STICKER_WIDTH) }}
                >Scroll Right</button>
            </div>
        </div>
    )
}