import './App.css';
import React, {useState, useEffect} from 'react';



function App() {
  const [data, setdata] = useState({})

  async function getAPI(){
    const rawData = await fetch(`https://hn.algolia.com/api/v1/search?query=hello&page=0`)
    const jsonData = rawData.json();
    setdata( state => ({...jsonData}) 
    
    );

  }

useEffect(() => {
    getAPI().then(() => console.log(data));
  }, []);
  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
        <label>Search: <input type="text" name ="name" /> <button> submit </button></label>
        <br></br>
        
        {/* <button type ="submit">React</button>
        <button type ="submit">Hello</button>
        <button type ="submit">Geo</button> */}
        
    </div>
  );
}

export default App;
