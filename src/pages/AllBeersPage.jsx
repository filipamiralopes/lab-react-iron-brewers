import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import beersJSON from "./../assets/beers.json";
import axios from "axios"



function AllBeersPage() {
  // Mock initial state, to be replaced by data from the API. Once you retrieve the list of beers from the Beers API store it in this state variable.
  const [beers, setBeers] = useState([]);
  const [searchState, setSearchState] = useState('');


  // TASKS:
  // 1. Set up an effect hook to make a request to the Beers API and get a list with all the beers.
  // 2. Use axios to make a HTTP request.
  // 3. Use the response data from the Beers API to update the state variable.

  const fetchAllBeers = async () => {
    try {
      const {data} = await axios("https://ih-beers-api2.herokuapp.com/beers");
      // add same image to all beers
      data.map((oneBeer) => {
        oneBeer.image_url = "https://images.unsplash.com/photo-1593023669551-3c9cb301ce81?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        return oneBeer;
      })
      setBeers(data);
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(()=> {
    fetchAllBeers()
  }, []);

  // fetch beers that match search

  const handleSearchBeer = async () => {
    // console.log(searchState)
    try {
      const {data} = await axios.get(`https://ih-beers-api2.herokuapp.com/beers/search?q=${searchState}`)
      // console.log(data)
      // add same image to all beers
      data.map((oneBeer) => {
        oneBeer.image_url = "https://images.unsplash.com/photo-1593023669551-3c9cb301ce81?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        return oneBeer;
      })
      setBeers(data)
    } catch (error) {
      console.log(error)
    }
  }


  // The logic and the structure for the page showing the list of beers. You can leave this as it is for now.
  return (
    <>
      <Search handleSearchBeer={handleSearchBeer} searchState={searchState} setSearchState={setSearchState}/>

      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {beers &&
          beers.map((beer, i) => {
            return (
              <div key={i}>
                <Link to={"/beers/" + beer._id}>
                  <div className="card m-2 p-2 text-center" style={{ width: "24rem", height: "18rem" }}>
                    <div className="card-body">
                      <img
                        src={beer.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + beer.name}
                      />
                      <h5 className="card-title text-truncate mt-2">{beer.name}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className="card-text">
                        Created by: {beer.contributed_by}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllBeersPage;
