import React from "react";

export const LinkCard = (props) => {

    return (
        <>
            <h2>Ссылка</h2>
            <p>Ваша ссылка: <a href={props.link.to} target="_blank" rel="noopener noreferrer" >{props.link.to}</a></p>
            <p>Откуда: <a href={props.link.from} target="_blank" rel="noopener noreferrer" >{props.link.from}</a></p>
            <p>Количество кликов: <strong>{props.link.click}</strong></p>
            <p>Дата создания: <strong>{new Date(props.link.data).toLocaleDateString()}</strong></p>
        </>
    );
};




