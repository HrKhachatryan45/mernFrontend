import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleLeft,
    faAngleRight,
    faBookmark as regularIcon,
    faCalendarDays, faCircleXmark, faEarthAmericas, faEye, faEyeSlash,
    faFilter, faFilterCircleXmark, faFolderOpen,
    faKey
} from "@fortawesome/free-solid-svg-icons";
import {faBookmark as staticIcon, faBookmark} from "@fortawesome/free-regular-svg-icons";
import ReactPaginate from "react-paginate";

function Account(props) {
    const hostedUrl='https://mernbackend-gk1y.onrender.com'
    const [showPasswords,setShowPasswords]=useState({
        currentPassword:false,
        newPassword:false,
        confirmNewPassword:false
    })
    const [success,setSuccess]=useState('')
    const [show,setShow]=useState(false)
    const [show1,setShow1]=useState(false)
    const [immediateUser,setImmediateUser]=useState({})
    const location = useLocation();
    const [id, setId] = useState(JSON.parse(localStorage.getItem("userData")) || { id: '' });
    const [condition,setCondition]=useState( location.state?.condition)
    const [nameToChange,setNameToChange]=useState(immediateUser.firstName || '');
    const navigate = useNavigate();
    const [special,setSpecial]=useState(8)
    const [pageCount,setPageCount]=useState(6)
    const [sp,setSp]=useState(5)
    const [slidesPerPage,setSlidesPerPage]=useState(4)
    const [model,setModel]=useState({})
    const [favourite,setFavourite]=useState([])
    const [years,setYears]=useState([
        2024,2023,2022,2021,2020,2019,2018,2017,2016,2015,2014,2013,2012,
        2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,'1990',
        '1980','1970','1960','1950','1940','1930','1920','1910','1900'
    ])
    const [changePassword,setChangePassword]=useState({
        currentPassword:'',
        newPassword:'',
        confirmNewPassword:''
    })
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
    const [selectedYear,setSelectedYear]=useState('')
    const [selectedGenre,setSelectedGenre]=useState('')
    const [selectedCountry,setSelectedCountry]=useState('')
    const [appliedFilters, setAppliedFilters] = useState({
        genre: '',
        year: '',
        country:''
    });
    useEffect(() => {
        console.log( location.state?.condition)
    }, [location]);


    const handleSelectYear = (year) => {
        setSelectedYear(year);
    };
    const handleCountry = (country) => {
        setSelectedCountry(country)
    };
    const handleReset=()=>{
        setAppliedFilters({
            genre: '',
            year: '',
            country: ''
        });
        setSelectedGenre('')
        setSelectedYear('')
        setSelectedCountry('')
    }
    const set=()=>{
        if (show || show1){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow='scroll'

        }
    }
    useEffect( () => {
        set()
    }, [appliedFilters,show,show1]);
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


    const handleNavigate = (item)=>{
        navigate(`/movies/${item.title}`, { state: { movieData: item ,obj:{pageCount,slidesPerPage,sp,special}} });
    }
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };




    const [currentItems,setCurrentItems]=useState([])
    const [pageCountC,setPageCountC]=useState(2)
    useEffect(() => {
        screenSizesM();
        getUser(id.id);
        // console.log(favourite)
        const itemsPerPage=18
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, favourite.length);

        if (appliedFilters.year || appliedFilters.genre || appliedFilters.country){
            if (!currentItems===[]){
                filterCurrentItems()
            }else{
                filterFavourite()
            }

        }else{
            setCurrentItems(favourite.slice(startIndex, endIndex));

        }
    }, [id,favourite,currentPage]);


    const filterCurrentItems = () => {
        const filteredItems = favourite.filter((item) => {
            const matchesYear = !appliedFilters.year || new Date(item.movieItem.release_date).getFullYear() === appliedFilters.year;
            const matchesGenre = !appliedFilters.genre || item.movieItem.genre_ids.some(id => id === appliedFilters.genre);
            const matchesCountry = !appliedFilters.country || item.movieItem.country.some(id => id === appliedFilters.country);

            return matchesYear && matchesGenre && matchesCountry;
        });

        setCurrentItems(filteredItems);
    };
    const filterFavourite = () => {
        const filteredItems = favourite.filter((item) => {
            const matchesYear = !appliedFilters.year || new Date(item.movieItem.release_date).getFullYear() === appliedFilters.year;
            const matchesGenre = !appliedFilters.genre || item.movieItem.genre_ids.some(id => id === appliedFilters.genre);
            const matchesCountry = !appliedFilters.country || item.movieItem.country.some(id => id === appliedFilters.country);

            return matchesYear && matchesGenre && matchesCountry;
        });

        setFavourite(filteredItems);
    };


    const getUser=async (id)=>{
        try {
            const response = await fetch(`${hostedUrl}/api/user/${id}`)
            const json = await response.json();
            setImmediateUser(json)


            setModel(json.movies)
            // console.log('fav',favourite)

            setFavourite(json.movies)
        }catch (error) {
            console.error('update in error:', error.message);

        }
    }
    useEffect(() => {
        if (immediateUser.firstName) {
            setNameToChange(immediateUser.firstName);
        }
    }, [immediateUser.firstName]);

    const handleSubmit= async (ev)=>{
        ev.preventDefault()
        const updatedItem = { firstName: nameToChange };
        try {
            const response = await fetch(`${hostedUrl}/api/user/update/${immediateUser._id}`,{
                method:"PATCH",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(updatedItem)
            })
            const json= await  response.json()

            if (id.id){
                getUser(id.id)
            }

        }catch (error) {
            console.error('update in error:', error.message);
        }
    }

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
const [error,setError]=useState(null)
    const handleChangePassword=async (ev)=>{
    ev.preventDefault()

        const newPassword={
            currentPassword:changePassword.currentPassword,
            newPassword:changePassword.newPassword
        }
        const match=changePassword.newPassword === changePassword.confirmNewPassword

        try {
            if (!match){
                setError('New Passwords dont match ')
            }else{
            const response = await fetch(`${hostedUrl}/api/user/${id.id}/passwordChange`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPassword)
            })
                const json = await response.json()
                console.log(json,'json')
                setError(json.error)
                if (response.ok){
                    setSuccess('Password successfully chnaged ')

                   setTimeout(()=>{
                       localStorage.removeItem('userData')
                       navigate('/')
                       localStorage.setItem('login',JSON.stringify({isLogged:false}))
                   },1500)
                }
                }


        }catch (e) {
            setError(e.message)
        }
    }

    return (
        <div>
            <Navbar  color={'#0B0B0D'} />
            <div className={'container-fluid header'}>
                <div className={'row'}>
                    <div className={'col-xl-12 hd col-lg-12 col-md-12 col-sm-12 col-12'}>
                        <h1>{immediateUser.firstName}</h1>
                        <div className={'bottomP'}>
                            <section style={{background:condition===true?'#121315':'#2C2F35'}}  onClick={()=>setCondition(true)}>
                                <h4 style={{color:condition===true?'#0feffd':'white'}}>My Profile</h4>
                            </section>
                            <section style={{background:condition===false?'#121315':'#2C2F35'}} onClick={()=>setCondition(false)}>
                                <h4  style={{color:condition===false?'#0feffd':'white'}}>Watch List</h4>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'container-fluid defr'}>
                {condition ? <div className={'row'}>
                    <div className={'col-xl-3 bhd col-lg-3 col-md-3 col-sm-3 col-3'}></div>
                    <div className={'col-xl-6 bhd col-lg-6 col-md-6 col-sm-6 col-6'}>
                        <form>
                            <label>
                                <p>Email address</p>
                                <input disabled={true} style={{cursor: 'no-drop'}} type={'email'}
                                       value={immediateUser.email}/>
                            </label>
                            <label>
                                <p>Your Name</p>
                                <input type={'text'} value={nameToChange}
                                       onChange={(ev) => setNameToChange(ev.target.value)}/>
                            </label>
                            <div className={'bhde'}>
                                <button onClick={handleSubmit}>Submit</button>
                                <section onClick={()=>setShow1(true)} id={'en'}>
                                    <FontAwesomeIcon icon={faKey}/>
                                    <p>Change Password</p>
                                </section>
                            </div>
                        </form>
                    </div>
                    <div className={'col-xl-3 bhd col-lg-3 col-md-3 col-sm-3 col-3'}></div>
                </div> : <div className={'row'}>
                    <div className={`col-xl-12 ${favourite.length>18 || favourite.length === 0 || !favourite?'':'isNeeded'} tr col-lg-12 col-md-12 col-sm-12 col-12`}>
                        <div id={'rt3'} className={'col-xl-12 tr col-lg-12 col-md-12 col-sm-12 col-12'}>
                            <h1>Watch list</h1>
                            <section onClick={() => setShow(true)} className={'y45'}>
                                <FontAwesomeIcon icon={faFilter}/>
                                <h2>Filter</h2>
                            </section>
                        </div>
                        {favourite.length > 18 ? currentItems.map((item) => (
                            <div
                                onClick={() => handleNavigate(item.movieItem)}
                                className={'eachMovie'}
                                key={item.movieItem.id}
                            >
                                <img id={'re'}
                                     src={item.movieItem.poster_path === '' || item.movieItem.poster_path === null || !item.movieItem.poster_path ? 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg' : `https://image.tmdb.org/t/p/original${item.movieItem.poster_path}`}/>
                                <div className={'cover'}>
                                    <section id={'top'}>
                                        <h2>HD</h2>
                                        <section id={'tr'}
                                                 onClick={(event) => {
                                                     event.stopPropagation()
                                                     handleRemoveFromWatchList(item.movieItem)
                                                 }}>
                                            {isItemInFavourites(item.movieItem.id) ?
                                                <FontAwesomeIcon style={{color: '#0feffd'}} icon={regularIcon}/> :
                                                <FontAwesomeIcon icon={staticIcon}/>}
                                        </section>
                                    </section>
                                    <section id={'bottom'}>
                                        <div>
                                            <h3>Movie</h3>
                                            <h3>{new Date(item.movieItem.release_date).getFullYear()}</h3>
                                        </div>
                                        <h1>
                                            {item.movieItem.title && item.movieItem.title.length > 20 ? `${item.movieItem.title.slice(0, 20)}...` : item.movieItem.title}
                                        </h1>
                                    </section>
                                </div>
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
                                    nextLabel={<FontAwesomeIcon icon={faAngleRight}/>}
                                    previousLabel={<FontAwesomeIcon icon={faAngleLeft}/>}
                                    pageRangeDisplayed={pageCountC}
                                    marginPagesDisplayed={0}
                                />
                            </div>
                        )) : favourite.map((item) => (
                            <div
                                onClick={() => handleNavigate(item.movieItem)}
                                className={'eachMovie'}
                                key={item.movieItem.id}
                            >
                                <img id={'re'}
                                     src={item.movieItem.poster_path === '' || item.movieItem.poster_path === null || !item.movieItem.poster_path ? 'https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg' : `https://image.tmdb.org/t/p/original${item.movieItem.poster_path}`}/>
                                <div className={'cover'}>
                                    <section id={'top'}>
                                        <h2>HD</h2>
                                        <section id={'tr'}
                                                 onClick={(event) => {
                                                     event.stopPropagation()
                                                     handleRemoveFromWatchList(item.movieItem)
                                                 }}>
                                            {isItemInFavourites(item.movieItem.id) ?
                                                <FontAwesomeIcon style={{color: '#0feffd'}} icon={regularIcon}/> :
                                                <FontAwesomeIcon icon={staticIcon}/>}
                                        </section>
                                    </section>
                                    <section id={'bottom'}>
                                        <div>
                                            <h3>Movie</h3>
                                            <h3>{new Date(item.movieItem.release_date).getFullYear()}</h3>
                                        </div>
                                        <h1>
                                            {item.movieItem.title && item.movieItem.title.length > 20 ? `${item.movieItem.title.slice(0, 20)}...` : item.movieItem.title}
                                        </h1>
                                    </section>
                                </div>
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
                                    nextLabel={<FontAwesomeIcon icon={faAngleRight}/>}
                                    previousLabel={<FontAwesomeIcon icon={faAngleLeft}/>}
                                    pageRangeDisplayed={pageCountC}
                                    marginPagesDisplayed={0}
                                />
                            </div>
                        ))}
                    </div>
                </div>}
                <div className={'row'}>
                    <div className={'col-xl-12 rer col-lg-12 col-md-12 col-sm-12 col-12'}>
                        {favourite.length> 18 && !condition  ? <ReactPaginate
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
                            nextLabel={<FontAwesomeIcon icon={faAngleRight}/>}
                            previousLabel={<FontAwesomeIcon icon={faAngleLeft}/>}
                            pageRangeDisplayed={pageCountC}
                            marginPagesDisplayed={0}
                        /> : null}
                    </div>
                </div>
                {!condition && (favourite.length === 0 || !favourite)?
                    <div className={'row'}>
                        <div className={'col-xl-12 fee col-lg-12 col-md-12 col-sm-12 col-12'}>
                            <h1>Watch List is Empty</h1>
                        </div>
                    </div>:null}
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
            {show1?
                <div className={'container-fluid passwordChange'}>
                    <div className={'row'}>
                        <div className={'col-xl-3 frt col-lg-3 col-md-2 col-sm-1 d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none'}></div>
                        <div className={'col-xl-6 frt col-lg-6 col-md-8 col-sm-10 col-12'}>
                            <div className={'lbl'}>
                                <FontAwesomeIcon id={'we'} onClick={() => {
                                    setShow1(false)
                                    setError('')
                                }} icon={faCircleXmark}/>
                                <h1>Change password</h1>
                                <h2>Create a new secure password</h2>
                                <form onSubmit={handleChangePassword}>
                                  <label>
                                        <input type={showPasswords.currentPassword?'text':'password'} value={changePassword.currentPassword}
                                           onChange={(ev) => setChangePassword({
                                               ...changePassword,
                                               currentPassword: ev.target.value
                                           })} placeholder={'Current Password'}/>
                                            <FontAwesomeIcon onClick={()=>setShowPasswords({...showPasswords,currentPassword: !showPasswords.currentPassword})} icon={showPasswords.currentPassword?faEyeSlash:faEye}/>
                                  </label>
                                   <label>
                                        <input type={showPasswords.newPassword?'text':'password'} value={changePassword.newPassword}
                                           onChange={(ev) => setChangePassword({
                                               ...changePassword,
                                               newPassword: ev.target.value
                                           })} placeholder={'New Password'}/>
                                            <FontAwesomeIcon onClick={()=>setShowPasswords({...showPasswords,newPassword: !showPasswords.newPassword})} icon={showPasswords.newPassword?faEyeSlash:faEye}/>
                                   </label>
                                   <label>
                                        <input type={showPasswords.confirmNewPassword?'text':'password'} value={changePassword.confirmNewPassword}
                                           onChange={(ev) => setChangePassword({
                                               ...changePassword,
                                               confirmNewPassword: ev.target.value
                                           })} placeholder={'Confirm New Password'}/>
                                            <FontAwesomeIcon onClick={()=>setShowPasswords({...showPasswords,confirmNewPassword: !showPasswords.confirmNewPassword})} icon={showPasswords.confirmNewPassword?faEyeSlash:faEye}/>
                                   </label>
                                    <button>Submit</button>
                                    {error && (
                                        <div className={'error'}>
                                            <p>{error}</p>
                                        </div>
                                    )}
                                    {success && (
                                        <div className={'success'}>
                                            <p>{success}</p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                        <div
                            className={'col-xl-3 frt col-lg-3 col-md-2 col-sm-1 d-xl-flex d-lg-flex d-md-flex d-sm-flex d-none'}></div>
                    </div>
                </div> : null}
        </div>
    );
}

export default Account;