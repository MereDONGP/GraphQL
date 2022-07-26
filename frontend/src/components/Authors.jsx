import React from 'react'


const Authors = ({people}) => {

    
    return(
        <>
            {people.map((n,i) => 
                <ul key={i}>
                    <li>Name: {n.name}</li>
                    <li>Born: {n.born}</li>
                    <li>Book Count: {n.bookCount}</li>
                </ul>
            )}
        </>
    )
}

export default Authors