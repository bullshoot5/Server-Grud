import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import ListItem from './components/ListItem';
import Loader from './components/Loader';
import Error from './components/Error';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    //* API'a todolar için GET isteği atar.
    axios
      .get('http://localhosqweqweqwt:3000/todos')
      //* İstek başarılı olursa todos stateine veriyi gönderir.
      .then((res) => setTodos(res.data))
      //* Hata olursa hatayı yakalar.
      .catch((error) => setError(error.message));
  }, []);
  return (
    <div className="container p-3">
      <h1 className="text-center">
        Server <span className="text-warning">CRUD</span>
      </h1>
      <Form setTodos={setTodos} />

      <ul className="list-group">
        {/* Veriler yoksa loader bas */}
        {!todos && <Loader />}

        {/* Veriler geldiyse ekrana bas optional chaining `?`  */}
        {todos?.map((todo) => (
          <ListItem
            setTodos={setTodos}
            allTodos={todos}
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
