
import React, { useState } from "react"
import './Button.scss';

const styleSpan = {
    transform: 'scale(0)',
    borderRadius: '100%',
    position: 'absolute',
    opacity: '0.55',
    backgroundColor: '#ffffff',
    animation: 'ripple 850ms'
}

const Button = ({ variant, onClick, children, className}) => {
    console.log("Button.jsx -> 15: variant", variant  )
    const [state, setState] = useState({
        showRipple: false,
        combinedSpanStyles: {},
        count: 0
    })

    let bounce = null

    const callCleanUp = (cleanup, delay) => {
        return () => {
            clearTimeout(bounce);
            bounce = setTimeout(() => {
                cleanup();
            }, delay);
        }
    }

    const cleanUp = () => {
        const initialState = {
            showRipple: false,
            combinedSpanStyles: {},
            count: 0
        };
        setState({ ...initialState });
    }

    const renderRippleSpan = () => {
        const { combinedSpanStyles = {} } = state;
        const spanArray = Object.keys(combinedSpanStyles);
        if (spanArray && spanArray.length > 0) {
            return (
                spanArray.map((key, index) => {
                    return <span className="button__ripple__content" key={'spanCount_' + index} style={{ ...combinedSpanStyles[key] }}></span>
                })
            )
        } else {
            return null;
        }
    }
    const showRipple = (e) => {
        const rippleContainer = e.currentTarget;
        const size = rippleContainer.offsetWidth;
        const pos = rippleContainer.getBoundingClientRect();
        const x = e.pageX - pos.x - (size / 2);
        const y = e.pageY - pos.y - (size / 2);

        const styleSizing = { top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
        const combinedSpanStyles = { ...styleSizing};
        const count = state.count + 1;
        setState({
            combinedSpanStyles: { ...state.combinedSpanStyles, [count]: combinedSpanStyles },
            showRipple: { ...state.showRipple, [count]: true },
            count: count
        });
    }

    return (
        <button className={"button button--" + variant + " "+className} onClick={onClick}>{children}
            <div className="button__ripple" onMouseDown={showRipple} onMouseUp={callCleanUp(cleanUp, 2000)}>
                {renderRippleSpan()}
            </div>
        </button>
    )
}

export default Button