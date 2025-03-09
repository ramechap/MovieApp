import React, { useEffect, useState } from 'react'
import Footer_movie from './footer'
import bg from '../image/bg.jpg';
import heroimg from '../image/hero-img.jpg';
import stranger from '../image/stranger.jpg';
import "../component/search.css"
import { IoStar } from "react-icons/io5";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Movie_search() {
    const [search, setsearch] = useState("")
    const [post, setpost] = useState([])
    let {searchkeyword}=useParams()
 
    

const fetchAPi=async()=>{
   
      const options = {
        method: 'GET',
        url: 'https://streaming-availability.p.rapidapi.com/shows/search/title',
        params: {
            country: 'us',
            title: searchkeyword,
            output_language: 'en'
        },
        headers: {
          'x-rapidapi-key': 'b0292751bbmshb2f327a15a6a706p127035jsna842e7a2207f',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      };
      try {
          const response = await axios.request(options);
          setpost(response.data)
          console.log(response.data)
          console.log("post",post)
          console.log(post[0].showType)
          console.log(post[0].title)
          console.log(post[0].overview)
          console.log(post[0].rating)
          console.log(post[0].imdbId)
          console.log(post[0].tmdbId)
          console.log(post[0].firstAirYear)
          console.log(post[0].itemType)
          post[0].cast.map(element => {
              console.log("cast",element)
          });
          post[0].genres.map(element => {
              console.log(element.id + ","+element.name)
          });
          post[0].directors?.map(element => {
            console.log(element)
        });
        console.log(post[0].imageSet.verticalPoster.w720)
        console.log(post[0].imageSet.horizontalPoster.w720)
        console.log(post[0].imageSet.verticalBackdrop.w720)
        console.log(post[0].imageSet.horizontalBackdrop.w720)
        console.log(post[0].streamingOptions.us[0].link)
        console.log(post)
          
      } catch (error) {
          console.error(error);
      }
}

useEffect(() => {
fetchAPi()

}, [searchkeyword])
    
return (
    <div className='categorymovie'>
        <div className="grid-container">
            <div className="grid-item">
                <div className='searchmovieallpostsc'>
                    <div className='searchmoviepostboxc'>
                        {post.length >0 && <div style={{ justifyItems: "left", marginLeft: "15%" }}>
                            <p style={{ color: "white" }}>Results for</p>
                            <h2 style={{ fontSize: "2.4rem", color: "white" }}>{searchkeyword}</h2>
                        </div>}
                        <div style={{ marginTop: "30px" }}>
                            <div>
                                <div className='searchmovieallpostc'>
                                    {post.length > 0 ? ( // Check for posts length
                                        post.map((element, index) => (
                                            <div className='searchpostmoviee' style={{ marginTop: "5%" }} key={index}>
                                                <div className='searchmovieimgpost'>
                                                    <Link to="/dfs">
                                                        <img src={element.imageSet.verticalPoster.w720} id="searchmovieimgpost" />
                                                    </Link>
                                                </div>
                                                <div className='searchrpost-content' style={{ marginLeft: "10px", justifyContent: "left", color: "white", display: "grid" }}>
                                                    <div>
                                                        <h2 style={{ fontSize: "1.5rem" }}>{(element.title).slice(0, 30)}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-results">Sorry, Not Available Right Now</div> // Display message
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer_movie />
    </div>
);}
