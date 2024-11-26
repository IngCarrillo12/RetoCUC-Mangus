import React, {useRef, useEffect} from "react";
export const TitleTyping = ({ text }) => {
    const textRef = useRef(null);
  useEffect(() => {
    const element = textRef.current;
    const textWidth = element.scrollWidth; // Obtén el ancho del texto
    const animationDuration = `${text.length / 10}s`; // Calcula la duración basada en el texto
  
    element.style.animation = `typing ${animationDuration} steps(${text.length}, end) forwards, blink 0.75s step-end infinite`;
    element.style.setProperty('--text-width', `${textWidth}px`);
  }, [text]);
  return <h1 className="title-typing" ref={textRef}>{text}</h1>;
  };