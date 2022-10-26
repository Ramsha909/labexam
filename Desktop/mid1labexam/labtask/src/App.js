import './App.css';
import React, {useState, useEffect} from 'react';
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class Page extends React.Component {
  state = {
    value: "",
    query: "",
    data: ["React", "funny", "Geo"],
    filteredData: []
  };
  //componentDidMount
  componenetDidMount(){
    this.setQuery();
  }
  //componentDidUpdate
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.query !== this.props.match.params.query) 
    {
      this.setQuery();
    }
  }
  setQuery = () => {
    const { query = "" } = this.props.match.params;
    const filteredData = this.state.data.filter(element =>
      element.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ value: query, query, filteredData });
  };
  
function App() {
  const [data, setdata] = useState({})

  async function getAPI(){
    const rawData = await fetch(`https://hn.algolia.com/api/v1/search?query=hello&page=0`)
    const jsonData = rawData.json();
    setdata( state => ({...jsonData}) 
    
    );
  }
  const {searchQuery,searchResults} = JSON.parse(window.sessionStorage.getItem("searchDetails"));
  
  const [d, setd] = useState(searchQuery ? searchQuery : "" );
   const [result, setResult] = useState( searchResults ? searchResults:[]);
   const apiKey = ("API")
   
   function handleChange(event) {
       const d = event.target.value;
       console.log(event.target.value);
       setd(d);
   }
   function handleSubmit(event) {
       event.preventDefault();
       axios.get("https://hn.algolia.com/api/v1/search?query=hello&page=0" + d + "&key=" + apiKey + "&maxResults=20")
           .then(data => {
               console.log(data.data.items);
               setResult(data.data.items);
               window.sessionStorage.setItem("searchDetails",JSON.stringify({searchQuery:d,searchDetails:data.data.items}))
              })
      }
//user click on privious searched items 

useEffect(() => {
    getAPI().then(() => console.log(data));
  }, []);
  return (
    <div className="App">
      <h1>My Hacker Stories</h1>
        <label>Search: <input type="text" name ="name" /> <button type='submit'> submit </button></label>
        <br></br>
        
        {/* <button type ="submit">React</button>
        <button type ="submit">Hello</button>
        <button type ="submit">Geo</button> */}
        
    </div>
  );
}

export default App;
