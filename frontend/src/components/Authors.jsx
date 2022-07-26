import React , {useState} from 'react'


const Authors = ({people}) => {

    const [ viewAuth, setViewAuth] = useState("block")
    const [viewBooks, setViewBooks] = useState("none")
    const [view, setView] = useState({authView: "block", authBook: "none"})

/*     const changeView = () => {
        if (viewAuth === "block"){
            setViewAuth("none")
            setViewBooks("block")
        }
        else if (viewBooks === "block"){
            setViewBooks("none")
            setViewAuth("block")
        }
    } */

    
    return(
        <>
        <button onClick={() => setView({authView: "block", authBook: "none"})}>Authors</button>
        <button onClick={() =>  setView({authView: "none", authBook: "block"})}>Books</button>
        <div style={{"display":view.authView}}>
            {people.map((n,i) => 
                    <ul key={i}>
                        <li>Name: {n.name}</li>
                        <li>Born: {n.born}</li>
                        <li>Book Count: {n.bookCount}</li>
                    </ul>
                )}
        </div>

        <div style={{"display": view.authBook }}>
            <h1>View Books</h1>
        </div>
        </>
    )
}

export default Authors