import ButtonContext from './ButtonContext';
import { useRef } from 'react';

const ButtonRef = (props) => {
    const loginRef = useRef(null)
    const signupRef = useRef(null)
    const chandePWDRef = useRef(null)
    const confirmOrderRef = useRef(null)
    
    return (
        <ButtonContext.Provider value={{ loginRef, signupRef, chandePWDRef, confirmOrderRef }}>
            {props.children}
        </ButtonContext.Provider>
    )
}

export default ButtonRef;