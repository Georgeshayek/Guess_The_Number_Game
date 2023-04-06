import { useState } from 'react';
import NumberGuess from './components/NumberGuess/NumberGuess';
import ErrorModal from './components/UI/ErrorModal';
import './App.css';

function App() {
  const [error, setError] = useState();
  const setErrorHandler=(err)=>{
    setError(err)
  }
  const dismiss = () => {
    setError(null);
  };
  return (
    <div className="App">
      {error && (
        <ErrorModal
          message={error.message}
          title={error.title}
          dismiss={dismiss}
        />
      )}
      <NumberGuess errorHandler={setErrorHandler}/>
    </div>
  );
}

export default App;
