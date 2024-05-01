import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faCalendarDays, faEarthAmericas,
    faFilter,
    faFilterCircleXmark,
    faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import  {faBookmark as staticIcon} from '@fortawesome/free-regular-svg-icons'
import  {faBookmark as regularIcon} from '@fortawesome/free-solid-svg-icons'

import {useLocation, useNavigate} from "react-router-dom";
function Movies(props) {
    const hostedUrl='https://mernbackend-gk1y.onrender.com'
    const [model,setModel]=useState({})
    const [favourite,setFavourite]=useState([])
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [show,setShow]=useState(false)
    const [selectedYear,setSelectedYear]=useState('')
    const [selectedGenre,setSelectedGenre]=useState('')
    const [selectedCountry,setSelectedCountry]=useState('')
    const [years,setYears]=useState([
        2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,
        2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,'1990',
        '1980','1970','1960','1950','1940','1930','1920','1910','1900'
    ])
    const genreMapping = [
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 16, name: 'Animation' },
        { id: 35, name: 'Comedy' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentary' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Family' },
        { id: 14, name: 'Fantasy' },
        { id: 36, name: 'History' },
        { id: 27, name: 'Horror' },
        { id: 10402, name: 'Music' },
        { id: 9648, name: 'Mystery' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Science Fiction' },
        { id: 10770, name: 'TV Movie' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'War' },
        { id: 37, name: 'Western' }
    ];
    const countries = [
        { name: "Argentina", code: "AR" },
        { name: "Australia", code: "AU" },
        { name: "Austria", code: "AT" },
        { name: "Belgium", code: "BE" },
        { name: "Brazil", code: "BR" },
        { name: "Canada", code: "CA" },
        { name: "China", code: "CN" },
        { name: "Czech Republic", code: "CZ" },
        { name: "Denmark", code: "DK" },
        { name: "Finland", code: "FI" },
        { name: "France", code: "FR" },
        { name: "Germany", code: "DE" },
        { name: "Hong Kong", code: "HK" },
        { name: "Hungary", code: "HU" },
        { name: "India", code: "IN" },
        { name: "Ireland", code: "IE" },
        { name: "Israel", code: "IL" },
        { name: "Italy", code: "IT" },
        { name: "Japan", code: "JP" },
        { name: "Luxembourg", code: "LU" },
        { name: "Mexico", code: "MX" },
        { name: "Netherlands", code: "NL" },
        { name: "New Zealand", code: "NZ" },
        { name: "Norway", code: "NO" },
        { name: "Poland", code: "PL" },
        { name: "Romania", code: "RO" },
        { name: "Russia", code: "RU" },
        { name: "South Africa", code: "ZA" },
        { name: "South Korea", code: "KR" },
        { name: "Spain", code: "ES" },
        { name: "Sweden", code: "SE" },
        { name: "Switzerland", code: "CH" },
        { name: "Taiwan", code: "TW" },
        { name: "Thailand", code: "TH" },
        { name: "United Kingdom", code: "GB" },
        { name: "United States of America", code: "US" }
    ];
    const [eachPage,setEachPage]=useState(18)
    const [case1,setCase1]=useState(true)
    const [appliedFilters, setAppliedFilters] = useState({
        genre: '',
        year: '',
        country:''
    });
    const [userData,setUserData]=useState(JSON.parse(localStorage.getItem('userData'))||[])
    const navigate=useNavigate()
    const [pageCountC,setPageCountC]=useState(4)
    const location = useLocation()
    const searchQuery=location.state?.searchValue


    const fetchSearchResults = async () => {
        const TMDB_API_KEY = '5b7651f7af7ea99088647f49969a106c';
        const api_url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&page=${currentPage}&include_adult=false&language=en-US&query=${searchQuery}`;

            const response = await fetch(api_url);
            const json = await response.json();

            if (!response.ok) {
                throw new Error('Error fetching search results');
            }

            setCase1(false)
            const moviesWithCountries = await Promise.all(
                json.results.map(async (movie) => {
                    const myNewJson = await newOne(movie.id)
                    const cast=await getCasts(movie.id)
                    const video= await getMovies(movie.id)
                    const mainCharacters = cast.filter((character) => character.order <= 5);
                    const images= await relatedImages(movie.id)
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

        setMovieList({ ...json, results: moviesWithCountries });


    };


    useEffect(() => {
        if (searchQuery) {
            fetchSearchResults();
        } else {
            fetchData();
        }
    }, [searchQuery, currentPage, appliedFilters, show, eachPage]);



    const isItemInFavourites = (itemId) => {
        if (favourite){
            return favourite.some(favItem => favItem.movieItem.id === itemId);
        }
        return false;
    };
    const handleAddToWatchList=async (item)=>{
        try {
            const response=await fetch(`${hostedUrl}/api/user/${userData.id}/addMovie`,{
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
   const handleRemoveFromWatchList = async (item) => {
            try {
                const selectedModel =  model.find((item2)=>item2.movieItem.id === item.id);
                console.log(userData.id,'userId')
                console.log(item.id,'movieId')
                console.log(selectedModel,'modelId')
                        const response = await fetch(`${hostedUrl}/api/user/${userData.id}/removeMovie/${item.id}/model/${selectedModel._id}`, {
                            method: 'DELETE',
                        });

                        const json = await response.json();
                        console.log(json, 'removed from Watch List');
            } catch (e) {
                console.error(e.message);
            }
        };

    const fetchData = async () => {
        let api_url = `https://api.themoviedb.org/3/discover/movie?api_key=5b7651f7af7ea99088647f49969a106c&page=${currentPage}`;

        if (appliedFilters.genre) {
            api_url += `&with_genres=${appliedFilters.genre}`;
        }

        if (appliedFilters.year) {
            api_url += `&primary_release_year=${appliedFilters.year}`;
        }

        if (appliedFilters.country) {
            api_url += `&with_origin_country=${appliedFilters.country}`;
        }

        const response = await fetch(api_url);

        const json = await response.json();
        console.log(json.results)
        setCase1(true)

        const moviesWithCountries = await Promise.all(
            json.results.map(async (movie) => {
                const myNewJson = await newOne(movie.id)
                const cast=await getCasts(movie.id)
                const video= await getMovies(movie.id)
                const mainCharacters = cast.filter((character) => character.order <= 5);
                const images= await relatedImages(movie.id)
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

        setMovieList({ ...json, results: moviesWithCountries });

    };
    const newOne=async(movie_id)=>{

        const response  = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=5b7651f7af7ea99088647f49969a106c&language=en-US`)
        const json = await response.json()

        return json
    }

    const set=()=>{
        if (show){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow='scroll'

        }
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


    const screenSizes=()=>{
        if (window.innerWidth>1199){
            setEachPage(18)
            setPageCountC(4)
        }
        if (window.innerWidth>992 && window.innerWidth<1199){
            setEachPage(18)
            setPageCountC(4)
        }
        if (window.innerWidth>768 && window.innerWidth<992){
            setEachPage(20)
            setPageCountC(4)
        }
        if (window.innerWidth>576 && window.innerWidth<768){
            setEachPage(18)
            setPageCountC(3)
        }
        if (window.innerWidth<576){
            setEachPage(18)
            setPageCountC(2)
        }
    }

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



    useEffect( () => {
        set()
        screenSizes()
    }, [currentPage,appliedFilters,show,eachPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };


    const handleSelectYear = (year) => {
            setSelectedYear(year);
    };
    const handleCountry = (country) => {
        setSelectedCountry(country)
    };
    const handleGenre = (id)=>{
        setSelectedGenre(id)
    }
    const handleApplyChanges=()=>{
        setAppliedFilters({
            genre: selectedGenre,
            year: selectedYear,
            country: selectedCountry
        });
        setCurrentPage(1)
    }

    const handleReset=()=>{
        setAppliedFilters({
            genre: '',
            year: '',
            country: ''
        });
        fetchData()
        setSelectedGenre('')
        setSelectedYear('')
        setSelectedCountry('')
    }
    const [special,setSpecial]=useState(8)
    const [pageCount,setPageCount]=useState(6)
    const [sp,setSp]=useState(5)
    const [slidesPerPage,setSlidesPerPage]=useState(4)

    const screenSizesM=()=>{
        if (window.innerWidth > 1199) {
            setPageCount(6);
            setSlidesPerPage(4);
            setSpecial(8);
            setSp(5);
        } else if (window.innerWidth > 992) {
            setPageCount(6);
            setSlidesPerPage(4);
            setSpecial(6);
            setSp(5);
        } else if (window.innerWidth > 768) {
            setPageCount(4);
            setSlidesPerPage(3);
            setSpecial(5);
            setSp(5);
        } else if (window.innerWidth > 576) {
            setPageCount(3);
            setSlidesPerPage(2);
            setSpecial(4);
            setSp(4);
        } else {
            const numberToChange = 3;
            setPageCount(numberToChange);
            setSlidesPerPage(1);
            setSpecial(numberToChange);
            setSp(numberToChange);
        }
    }
    useEffect(() => {
        screenSizesM()
    }, []);

    const handleNavigate = (item)=>{
        navigate(`/movies/${item.title}`, { state: { movieData: item ,obj:{pageCount,slidesPerPage,sp,special}} });
    }


    const getUser=async (id)=>{
        try {
            const response = await fetch(`${hostedUrl}/api/user/${id}`)
            const json = await response.json();
            setFavourite(json.movies)
            setModel(json.movies)

        }catch (error) {
            console.error('update in error:', error.message);

        }
    }
    useEffect(() => {
        if (userData.id){
            getUser(userData.id);

        }
    }, [userData,favourite]);




    useEffect(() => {

        // console.log(model)
    }, [model]);







    return (
        <div>
            <Navbar activeItem={'movies'} color={'#0B0B0D'} />
            <div className={'container-fluid movieL'}>
                <div className={'row'}>
                    {case1 ? <div id={'rt3'} className={'col-xl-12 tr col-lg-12 col-md-12 col-sm-12 col-12'}>
                        <h1>Movies</h1>
                        <section onClick={() => setShow(true)} className={'y45'}>
                            <FontAwesomeIcon icon={faFilter}/>
                            <h2>Filter</h2>
                        </section>
                    </div> : <div id={'rt3'} className={'col-xl-12 tr col-lg-12 col-md-12 col-sm-12 col-12'}>
                        <h1>Search results for: "{searchQuery}"</h1>
                    </div>}
                </div>
                <div className={'row'}>
                    <div className={`col-xl-12 tr   col-lg-12 col-md-12 col-sm-12 col-12`}>
                        {movieList.results && movieList.results.slice(0, eachPage).map((item) => (
                            <div
                                onClick={() => handleNavigate(item)}
                                className={'eachMovie'}
                                key={item.id}
                            >
                                <img   id={'re'} src={item.poster_path==='' || item.poster_path===null || !item.poster_path?'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg':`https://image.tmdb.org/t/p/original${item.poster_path}`}/>
                                <div  className={'cover'}>
                                    <section id={'top'}>
                                        <h2>HD</h2>
                                        <section id={'tr'} onClick={(event)=>{
                                            event.stopPropagation()
                                            isItemInFavourites(item.id)?handleRemoveFromWatchList(item):handleAddToWatchList(item)
                                        }}>
                                            {isItemInFavourites(item.id)? <FontAwesomeIcon style={{color:'#0feffd'}} icon={regularIcon} />: <FontAwesomeIcon icon={staticIcon} />}
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
                <div className={'row'}>
                    <div className={'col-xl-12 rer col-lg-12 col-md-12 col-sm-12 col-12'}>
                        <ReactPaginate
                            pageCount={500}
                            onPageChange={handlePageChange}
                            containerClassName={'pagination'}
                            activeClassName={'activeP'}
                            breakLabel={''}
                            pageClassName={'eachPage'}
                            previousLinkClassName={'h'}
                            nextLinkClassName={'h'}
                            nextClassName={'eachPage'}
                            previousClassName={'eachPage'}
                            nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                            previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
                            pageRangeDisplayed={pageCountC}
                            marginPagesDisplayed={0}
                        />
                    </div>
                </div>
            </div>
            {show?
                <div  className={'container-fluid filterBy'}>
                    <div className={'row'}>
                        <div className={'col-xl-12 jio col-lg-12 col-md-12 col-sm-12 col-12'}>
                            <div className={'real'}>
                                <h1>Browse</h1>
                                <section id={'headline'}>
                                    <FontAwesomeIcon icon={faCalendarDays}/>
                                    <h2>Release Year</h2>
                                </section>
                                <div className={'options'}>
                                    {years.map((item) => (
                                        <p className={selectedYear === item ? 'selectedG' : ''}
                                           onClick={() => handleSelectYear(item)} key={item}>{item}</p>
                                    ))}
                                </div>
                                <section id={'headline'}>
                                    <FontAwesomeIcon icon={faFolderOpen}/>
                                    <h2>Genres</h2>
                                </section>
                                <div className={'options'}>
                                    {genreMapping.map((item) => (
                                        <p className={selectedGenre === item.id ? 'selectedG' : ''}
                                           onClick={() => handleGenre(item.id)}>{item.name}</p>
                                    ))}
                                </div>
                                <section id={'headline'}>
                                    <FontAwesomeIcon icon={faEarthAmericas}/>
                                    <h2>Countries</h2>
                                </section>
                                <div className={'options'}>
                                    {countries.map((item) => (
                                        <p className={selectedCountry === item.code ? 'selectedG' : ''}
                                           onClick={() => handleCountry(item.code)}>{item.name}</p>
                                    ))}
                                </div>


                                {selectedGenre || selectedYear  || selectedCountry? <div className={'er'}>
                                    <section onClick={handleReset} className={'y45'}>
                                        <FontAwesomeIcon icon={faFilterCircleXmark}/>
                                        <h2>Clear all filters</h2>
                                    </section>
                                </div> : null}
                                <section className={'end'}>
                                    <button onClick={handleApplyChanges} id={'id1'}>Apply</button>
                                    <button onClick={() => setShow(false)} id={'id2'}>Close</button>
                                </section>
                            </div>
                        </div>
                    </div>
                </div> : null}

        </div>
    );
}

export default Movies;
