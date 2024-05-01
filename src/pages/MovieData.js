import React, {useEffect, useState} from 'react';
import Navbar from "../components/Navbar";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {
    faAngleLeft,
    faAngleRight,
    faChevronLeft, faCircleXmark,
    faPlay,
    faPlus,
    faStar as solidStar,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBookmark, faBookmark as staticIcon,faStar as regularStar} from "@fortawesome/free-regular-svg-icons";
import {faBookmark as regularIcon} from '@fortawesome/free-solid-svg-icons'
import Carousel from 'nuka-carousel'


function MovieData(props) {
    const hostedUrl='https://mernbackend-gk1y.onrender.com'
    const [trailer,setTrailer]=useState(false)
    const location = useLocation();
    const movieData = location.state?.movieData;
    const obj=location.state?.obj
    const [show,setShow]=useState(false)
    const navigate=useNavigate()
    const [special,setSpecial]=useState(obj.special)
    const [pageCount,setPageCount]=useState(obj.pageCount)
    const genreMapping = {
        28: 'Action',
        12: 'Adventure',
        16: 'Animation',
        35: 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mystery',
        10749: 'Romance',
        878: 'Science Fiction',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
    };
    const countries = {
        AR: "Argentina",
        AU: "Australia",
        AT: "Austria",
        BE: "Belgium",
        BR: "Brazil",
        CA: "Canada",
        CN: "China",
        CZ: "Czech Republic",
        DK: "Denmark",
        FI: "Finland",
        FR: "France",
        DE: "Germany",
        HK: "Hong Kong",
        HU: "Hungary",
        IN: "India",
        IE: "Ireland",
        IL: "Israel",
        IT: "Italy",
        JP: "Japan",
        LU: "Luxembourg",
        MX: "Mexico",
        NL: "Netherlands",
        NZ: "New Zealand",
        NO: "Norway",
        PL: "Poland",
        RO: "Romania",
        RU: "Russia",
        ZA: "South Africa",
        KR: "South Korea",
        ES: "Spain",
        SE: "Sweden",
        CH: "Switzerland",
        TW: "Taiwan",
        TH: "Thailand",
        GB: "United Kingdom",
        US: "United States of America",
        ID: "Indonesia"

    };
    const [sp,setSp]=useState(obj.sp)
    const [slidesPerPage,setSlidesPerPage]=useState(obj.slidesPerPage)

const [similiarMovies,setSimiliarMovies]=useState([])

    const TMDB_API_KEY = '5b7651f7af7ea99088647f49969a106c';
    const BASE_URL = 'https://api.themoviedb.org/3';

    const fetchSimilarMovies = async (movieId) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`);
            const json = await response.json();

            const filteredMovies = json.results.filter(movie => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return releaseYear > 2000;
            });

            const moviesWithCountries = await Promise.all(
                filteredMovies.map(async (movie) => {
                    const myNewJson = await newOne(movie.id)
                    const cast=await getCasts(movie.id)
                    const mainCharacters = cast.filter((character) => character.order <= 5);
                    const images= await relatedImages(movie.id)
                    const video=await getMovies(movie.id)
                    return {
                        ...movie,
                        cast:mainCharacters,
                        country: myNewJson.origin_country,
                        productionCompanies:myNewJson.production_companies,
                        runtime:myNewJson.runtime,
                        images,
                        video
                    };
                })
            );

            setSimiliarMovies( moviesWithCountries );

            return moviesWithCountries
        } catch (error) {
            console.error('Error fetching similar movies:', error);
            throw error;
        }
    };
    const  relatedMovies= async ()=>{
        const movieId=movieData.id
        const similiar=await fetchSimilarMovies(movieId)
        setSimiliarMovies(similiar.slice(0,pageCount))

    }
    useEffect(() => {
        relatedMovies()
        console.log(movieData)
    }, [navigate,pageCount,special,sp,slidesPerPage,location,movieData]);

    useEffect(() => {
    }, [movieData]);


    const getMovies= async (movie_id)=>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=5b7651f7af7ea99088647f49969a106c&language=en-US`)
        const json=await response.json()
        try {
            if (!response.ok){
                throw Error('error during fetching api')
            }
            return json.results
        }catch (e) {
            console.error(e)
        }
    }

    const renderStars = (voteAverage) => {
        const totalStars = 5;
        const filledStars = (voteAverage / 2).toFixed(1); // Convert 10-point scale to 5-point scale

        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= filledStars) {
                stars.push(<FontAwesomeIcon key={i} icon={solidStar} />);
            } else if (i > filledStars && i - 1 < filledStars) {
                stars.push(<FontAwesomeIcon icon={faStarHalfStroke} />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={regularStar} />);
            }
        }

        return (
            <div>
                {stars}
            </div>
        );
    };
    useEffect(() => {
        set()
    }, [trailer]);


    const newOne=async(movie_id)=>{

        const response  = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=5b7651f7af7ea99088647f49969a106c&language=en-US`)
        const json = await response.json()

        return json
    }
    const relatedImages = async (movie_id) =>{
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=5b7651f7af7ea99088647f49969a106c`)

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            return json.backdrops
        } catch (error) {
            console.error('There was a problem fetching the casts:', error);
        }
    }
    const getCasts = async (movie_id) => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=5b7651f7af7ea99088647f49969a106c&language=en-US&limit=5`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const json = await response.json();
            return json.cast
        } catch (error) {
            console.error('There was a problem fetching the casts:', error);
        }
    };

    const handleNavigate = async (item) => {
        navigate(`/movies/${item.title}`, { state: { movieData: item ,obj:{pageCount,slidesPerPage,sp,special}} });
        await relatedMovies();
    };


    const set=()=>{
        if (trailer){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow='scroll'

        }
    }
    const [model,setModel]=useState({})
    const [favourite,setFavourite]=useState([])
    const [id,setId]=useState( JSON.parse(localStorage.getItem("userData")) || [])

    const isItemInFavourites = (itemId) => {
        if (favourite){
            return favourite.some(favItem => favItem.movieItem.id === itemId);
        }
        return false;
    };
    const handleRemoveFromWatchList = async (item) => {
        try {
            const selectedModel =  model.find((item2)=>item2.movieItem.id === item.id);
            console.log(id.id,'userId')
            console.log(item.id,'movieId')
            console.log(selectedModel,'modelId')
            const response = await fetch(`${hostedUrl}/api/user/${id.id}/removeMovie/${item.id}/model/${selectedModel._id}`, {
                method: 'DELETE',
            });

            const json = await response.json();
            console.log(json, 'removed from Watch List');
        } catch (e) {
            console.error(e.message);
        }
    };
    const handleAddToWatchList=async (item)=>{
        try {
            const response=await fetch(`${hostedUrl}/api/user/${id.id}/addMovie`,{
                method:'POST',
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({movieItem:item})
            })
            const json=await response.json()
            console.log(json,'added to Watchlist')
        }catch (e) {
            console.error(e.message)
        }

    }
    useEffect(() => {
        if (id.id){
            getUser(id.id);

        }
        // console.log(favourite)
    }, [id,favourite]);
    const getUser=async (id)=>{
        try {
            const response = await fetch(`${hostedUrl}/api/user/${id}`)
            const json = await response.json();
            setModel(json.movies)
            setFavourite(json.movies)
        }catch (error) {
            console.error('update in error:', error.message);

        }
    }
    return (
        <div>
            <div style={{background: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`}}
                 className={'container-fluid movieD'}>
                <div className={'coverOfMovie'}>
                </div>

                <div className={'normal'}>
                    <Navbar color={'transparent'}/>

                    <div className={'row'}>
                        <div
                            className={'d-xl-flex d-lg-flex d-md-flex  col-xl-2 gfr col-lg-2 col-md-1 d-sm-none d-none'}></div>
                        <div className={'col-xl-8 gfr col-lg-8 col-md-10 col-sm-12 col-12'}>
                            <div className={'coverPage'}>
                                <div className={'lft'}>
                                    <div className={'de'}>
                                        <p>HD</p>
                                        <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}/>
                                    </div>
                                </div>
                                <div className={'rght'}>
                                    <div className={'forSizes'}>
                                        <div className={'rey'}>
                                            <p>HD</p>
                                            <img src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}/>
                                        </div>
                                    </div>
                                    <button id={'eg'}>
                                        <Link to={'/movies'}><FontAwesomeIcon icon={faChevronLeft}/>Movies</Link>
                                    </button>
                                    <h1>{movieData.title}</h1>
                                    <div className={'all8'}>
                                        <section className={'gtr'}>
                                            <button onClick={() => setTrailer(true)}>
                                                <FontAwesomeIcon icon={faPlay}/>
                                                <h3>Watch Now</h3>
                                            </button>
                                        </section>
                                        <section className={'gtr'}>
                                                {isItemInFavourites(movieData.id) ?
                                                    <FontAwesomeIcon id={'fre'} onClick={(event) => {
                                                        event.stopPropagation()
                                                        isItemInFavourites(movieData.id) ? handleRemoveFromWatchList(movieData) : handleAddToWatchList(movieData)
                                                    }} style={{color: '#0feffd'}} icon={regularIcon}/> :
                                                    <FontAwesomeIcon id={'fre'} onClick={(event) => {
                                                        event.stopPropagation()
                                                        isItemInFavourites(movieData.id) ? handleRemoveFromWatchList(movieData) : handleAddToWatchList(movieData)
                                                    }} icon={staticIcon}/>}
                                            <h2>Watch List</h2>
                                        </section>
                                        <section style={{border: 'none'}} className={'gtr'}>
                                            <section id={'ert'}>
                                                <h3>{renderStars(movieData.vote_average)}</h3>

                                            </section>
                                            <section id={'rew'}>
                                                <p><span>10</span>/{movieData.vote_average.toFixed(1)} voted</p>
                                            </section>
                                        </section>
                                    </div>
                                    <h4 id={'key'}>Overview</h4>
                                    <div id={'value'}>
                                        {movieData.overview}
                                    </div>
                                    <button className={'sd'}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                        <span onClick={() => setShow(!show)}>read full</span>
                                    </button>
                                    {show ? <div className={'afe'}>
                                        <p>{movieData.overview}</p>
                                    </div> : null}
                                    <div className={'allKeys'}>
                                        <section id={'n1'}>
                                            <h4 id={'key'}>Casts</h4>
                                            <h4 id={'key'}>Genres</h4>
                                            <h4 id={'key'}>Duration</h4>
                                            <h4 id={'key'}>Country</h4>
                                            <h4 id={'key'}>IMDb</h4>
                                            <h4 id={'key'}>Release</h4>
                                            <h4 id={'key'}>Production</h4>
                                        </section>
                                        <section id={'n2'}>
                                            <div className={'flesx'}>
                                                {movieData.cast && movieData.cast.slice(0, sp).map((item, index) => (
                                                    <h3 key={item.id}>{item.name}{movieData.cast.length <= 1 || index === movieData.cast.length - 1 ? '' : ','}</h3>
                                                ))}
                                            </div>
                                            <div className={'flesx'}>
                                                {movieData.genre_ids && movieData.genre_ids.slice(0, 5).map((item, index) => (
                                                    <h3 key={item}>{genreMapping[item]}{movieData.genre_ids.length <= 1 || index === movieData.genre_ids.length - 1 ? '' : ','}</h3>
                                                ))}
                                            </div>
                                            <h3>{movieData.runtime} min</h3>
                                            <div className={'flesx'}>
                                                {movieData.country && movieData.country.slice(0, 5).map((item, index) => (
                                                    <h3 key={item}>{countries[item]}{movieData.country.length <= 1 || index === movieData.country.length - 1 ? '' : ','}</h3>
                                                ))}
                                            </div>
                                            <h3>{movieData.vote_average.toFixed(1)}</h3>
                                            <h3>{movieData.release_date}</h3>
                                            <div className={'flesx'}>
                                                {movieData.productionCompanies && movieData.productionCompanies.slice(0,6).map((item, index) => (
                                                    <h3 key={item.id}>
                                                        {!movieData.productionCompanies || movieData.productionCompanies.length === 0 ? '----' : (index === movieData.productionCompanies.length - 1 ? item.name : `${item.name},`)}
                                                    </h3>

                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={'d-xl-flex d-lg-flex d-md-flex  col-xl-2 gfr col-lg-2 col-md-1 d-sm-none d-none'}></div>
                    </div>

                </div>
            </div>
            {trailer ? <div className={'container-fluid trailer'}>
                <div className={'row'}>
                    <div className={'col-xl-12 lo col-lg-12 col-md-12 col-sm-12 col-12'}>

                        <div className={'re'}>
                            <FontAwesomeIcon onClick={() => setTrailer(false)} id={'rrw'} icon={faCircleXmark}/>
                            <iframe
                                src={`https://www.youtube.com/embed/${
                                    Array.isArray(movieData.video) && movieData.video.length > 0
                                        ? movieData.video.find((item) => item.type === 'Trailer')?.key || ''
                                        : ''
                                }`}
                                allowFullScreen
                            >
                            </iframe>
                        </div>

                    </div>
                </div>
            </div> : null}
            {movieData.images.length === 0 || !movieData.images ? null :
                <div className={'container-fluid relatedPhotos'}>
                    <div className={'row'}>
                        <div className={'col-xl-1 photoS col-lg-1 col-md-1 col-sm-1 col-1'}></div>
                        <div className={'col-xl-10 photoS col-lg-10 col-md-10 col-sm-10 col-10'}>


                            <Carousel defaultControlsConfig={{
                                nextButtonText: <FontAwesomeIcon icon={faAngleRight}/>,
                                prevButtonText: <FontAwesomeIcon icon={faAngleLeft}/>,
                                nextButtonClassName: 'nextNuka',
                                prevButtonClassName: 'prevNuka',
                            pagingDotsClassName: 'dots',
                            pagingDotsContainerClassName: 'doty'
                        }} cellSpacing={20} slidesToShow={slidesPerPage} wrapAround={true} autoplay={true}
                                  autoplayInterval={3000}>
                            {movieData.images && movieData.images.slice(0, special).map((item, index) => (
                                <img key={index} id={'imgo'}
                                     src={`https://image.tmdb.org/t/p/original${item.file_path}`}/>
                            ))}
                        </Carousel>

                    </div>
                    <div className={'col-xl-1 photoS col-lg-1 col-md-1 col-sm-1 col-1'}></div>

                </div>
            </div>}
            {!similiarMovies || similiarMovies.length===0 ? null : <div className={'container-fluid myLike'}>
                <div className={'row'}>
                    <div className={'col-xl-12 yer col-lg-12 col-md-12 col-sm-12 col-12'}>
                        <h1>You may also like</h1>
                        <div className={'similiar'}>
                            {similiarMovies.map((item) => (
                                <div
                                    onClick={() => handleNavigate(item)}
                                    className={'eachMovie'}
                                    key={item.id}
                                >
                                    <img id={'re'} src={`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
                                    <div className={'cover'}>
                                        <section id={'top'}>
                                            <h2>HD</h2>
                                            <section id={'tr'}>
                                                {isItemInFavourites(item.id) ?
                                                    <FontAwesomeIcon  onClick={(event) => {
                                                        event.stopPropagation()
                                                        isItemInFavourites(item.id) ? handleRemoveFromWatchList(item) : handleAddToWatchList(item)
                                                    }} style={{color: '#0feffd'}} icon={regularIcon}/> :
                                                    <FontAwesomeIcon  onClick={(event) => {
                                                        event.stopPropagation()
                                                        isItemInFavourites(item.id) ? handleRemoveFromWatchList(item) : handleAddToWatchList(item)
                                                    }} icon={staticIcon}/>}
                                            </section>
                                        </section>
                                        <section id={'bottom'}>
                                            <div>
                                                <h3>Movie</h3>
                                                <h3>{new Date(item.release_date).getFullYear()}</h3>
                                            </div>
                                            <h1>
                                                {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
                                            </h1>
                                        </section>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default MovieData