import React from 'react'
import CSS from "./TextWithParagraphs.module.css"

type TextWithParagraphsProps = {
    text:string;
}

export default function TextWithParagraphs({text}: TextWithParagraphsProps) {
    const textWithParagraphs = text.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph == "" ? "\u00a0" : paragraph.replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')}</p>
    ));

    return <div>{textWithParagraphs}</div>;
}