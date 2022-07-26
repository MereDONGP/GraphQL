import {useQuery} from '@apollo/client'
import { allBooks, allAuthors} from './queries';
import Authors from './components/Authors';

function App() {

  const books = useQuery(allBooks)
  const author = useQuery(allAuthors)

  if(author.loading){
    return <h1>Loading people</h1>
}

  return (
    <>
      <Authors people={author.data.allAuthors}></Authors>
    </>
  );
}

export default App;
