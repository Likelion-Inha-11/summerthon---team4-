import React from 'react';
function Test(){
    const name = 'react';
    const style = {
        backgroundColor: 'black',
        color:'aqua',
        fontSize: 24,
        padding: '1rem'
    }
    return(
        <>
        <div style={style}>{name}</div>
        </>
    );
    }
    export default Test;
    