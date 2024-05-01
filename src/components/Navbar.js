import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCircleXmark, faEye, faEyeSlash, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faBookmark, faUser} from "@fortawesome/free-solid-svg-icons";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";

function Navbar({color,activeItem}) {
    const [showPasswordsOfLogin,setShowPasswordsOfLogin]=useState(false)
    const [showPasswordsOfSignUp,setShowPasswordsOfSignUp]=useState({
        password:false,
        confirmPassword:false
    })
    const hostedUrl='https://mernbackend-gk1y.onrender.com'
    const [success,setSuccess]=useState(null)
    const [user,setUser]=useState(JSON.parse(localStorage.getItem("userData"))||{})
    const [show,setShow]=useState(false)
    const location=useLocation()
    const [showMenu,setShowMenu]=useState(false)
    const [showLogin,setShowLogin]=useState(false)
    const [searchValue,setSearchValue]=useState('')
    const naviagte=useNavigate()
    const [case2,setCase2]=useState('login')
    const [error,setError]=useState(null)
    const [extra,setExtra]=useState(false)
    const [signUpValues,setSignUpValues]=useState({
        firstName:'',
        email:'',
        password:'',
        confirmPassword: ''
    })
    const [loginValues,setLoginValues]=useState({
        email:'',
        password:''
    })
    const handleSearch=()=>{
        setShow(!show)
    }
    const handleMenu=()=>{
        setShowMenu(!showMenu)
    }

    const set=()=>{
        if (showMenu || showLogin){
            document.body.style.overflow='hidden'
        }else{
            document.body.style.overflow='scroll'

        }
    }

    const handleSubmit =(ev)=>{
        ev.preventDefault()
        naviagte('/movies',{state: {searchValue}})
        setShow(false)
    }


    const handleSignUp = async (ev) =>{
        ev.preventDefault()
        if (signUpValues.confirmPassword==='' || !signUpValues.confirmPassword){
            setError('All fields must be filled')
            return;
        }
        if (signUpValues.password !== signUpValues.confirmPassword) {
            setError('Passwords do not match')
            return;
        }

        try {
            const response = await fetch(`${hostedUrl}/api/user/signup`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    firstName: signUpValues.firstName,
                    email: signUpValues.email,
                    password: signUpValues.password,
                })
            });

            const json = await response.json();
            console.log(json,'new User');
            setError(json.error)

            if (response.ok){
                setTimeout(()=>{
                    setCase2('login')
                },1500)
                setSignUpValues({
                    firstName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                });
                setSuccess('User successfully registered')
            }
        } catch (error) {
            setError(error.message)
            console.error('Signup error:', error.message);
        }
    }

    useEffect(() => {
        localStorage.setItem('login',JSON.stringify({isLogged:false}))
    }, []);

const handleLogIn=async (ev)=>{
        ev.preventDefault()
    try {
        const response = await fetch(`${hostedUrl}/api/user/login`,{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                email:loginValues.email,
                password:loginValues.password
            })
        })
        const json=await response.json()
        setError(json.error)

        if (response.ok){
            localStorage.setItem('userData',JSON.stringify({id:json._id}))
            setLoginValues({
                email: '',
                password: '',
            });
            setTimeout(()=>{
                localStorage.setItem('login',JSON.stringify({isLogged:true}))
                naviagte(`/account/${json._id}`,{state:{id:json._id,condition:true}})
                // return;

            },1500)
            setSuccess('User successfully logged in')

        }

    } catch (error) {
        setError(error.message)
        console.error('loging in error:', error.message);
    }


}
const handleLogOut=()=>{
        localStorage.removeItem('userData')
    naviagte('/')
    setUser({})
    localStorage.setItem('login',JSON.stringify({isLogged:false}))
}



    useEffect(() => {
        set()
    }, [showMenu,error,showLogin]);


    useEffect(() => {
        set();
    }, [showMenu, showLogin]);

    useEffect(() => {
        set();
    }, [location]);


    return (
        <div>
            <div style={{background: color}} className={'container-fluid navB'}>
                <div className={'row'}>
                    <div className={'col-xl-2 nv col-lg-2  col-md-2 col-sm-2 col-2'}>
                        <Link to={'/'}><img
                            src={'https://img.1hd.to/xxrz/400x400/100/88/35/8835791304d21b3c256c5501095f5e4e/8835791304d21b3c256c5501095f5e4e.png'}/></Link>
                    </div>
                    <div className={'col-xl-5 nv col-lg-5  col-md-5 col-sm-5 col-5'}>
                        <section id={'inpPlus'}>
                            <FontAwesomeIcon id={'e'} icon={faMagnifyingGlass}/>
                            <form onSubmit={handleSubmit}>
                                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                       type={'text'} placeholder={'Search for movies and tv series'}/>
                            </form>
                        </section>
                    </div>
                    <div className={'col-xl-3 nv col-lg-3  col-md-3 col-sm-3 col-3'}>
                    <ul>
                            <li><Link className={activeItem === 'home' ? 'activeItem' : ''} to={'/'}>HOME</Link></li>
                            <li><Link className={activeItem === 'movies' ? 'activeItem' : ''}
                                      to={'/movies'}>MOVIES</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{justifyContent: 'flex-end'}}
                         className={'col-xl-2 nv col-lg-2  col-md-2 col-sm-2 col-2'}>
                        {!user.id ? (
                            <button onClick={() => setShowLogin(true)}>Login</button>
                        ) : (
                            <div className={'additional'}>
                                <section onClick={()=>setExtra(!extra)} id={'arrowDown'}><FontAwesomeIcon icon={faAngleDown}/></section>
                                {extra ? <div className={'menuDown'}>
                                        <section onClick={()=>{
                                            naviagte(`/account/${user.id}`,{state:{condition:false}})
                                        }}  className={'eq'}>
                                            <FontAwesomeIcon icon={faBookmark}/>
                                            <h3>Watch list</h3>
                                        </section>
                                        <section onClick={()=>{
                                            naviagte(`/account/${user.id}`,{state:{condition:true}})
                                        }} className={'eq'}>
                                            <FontAwesomeIcon icon={faUser}/>
                                            <h3>My Profile</h3>
                                        </section>
                                        <section style={{margin: '0'}} onClick={handleLogOut} className={'eq'}>
                                            <FontAwesomeIcon icon={faArrowRight}/>
                                            <h3>Logout</h3>
                                        </section>
                                    </div>:null}
                            </div>
                        )}
                    </div>

                </div>
            </div>
            {showLogin ? <div className={'loginOrSignup'}>
                <div className={'sty'}>
                    <img src={'https://1hd.to/images/login-img.webp'}/>
                    <div className={'right-part'}>
                        {case2 === 'login' ? <div className={"login"}>
                            <FontAwesomeIcon onClick={() => setShowLogin(false)} icon={faCircleXmark}/>
                            <h1>Welcome back</h1>
                            <form onSubmit={handleLogIn}>
                                <label>
                                    <p>Email address</p>
                                    <input value={loginValues.email} onChange={(ev) => setLoginValues({
                                        ...loginValues,
                                        email: ev.target.value
                                    })} required={true} type={'email'} placeholder={'your-email@mail.ru'}/>
                                </label>
                                <label id={'par'}>
                                    <p> Password</p>
                                    <input value={loginValues.password} onChange={(ev)=>
                                        setLoginValues({...loginValues,password:ev.target.value})} required={true} type={showPasswordsOfLogin?'text':'password'} placeholder={'Enter your password'}/>
                                    <FontAwesomeIcon onClick={()=>setShowPasswordsOfLogin(!showPasswordsOfLogin)} icon={showPasswordsOfLogin?faEyeSlash:faEye}/>

                                </label>
                                <button>Login</button>

                            </form>
                            <div className={'fpw'}>
                                <p id={'h'}>Forgot password?</p>
                                <p id={'h1'}>Don't have an account?<h4 onClick={() => {
                                    setCase2('signup')
                                    setError('')
                                    setSuccess('')
                                }}>Register</h4></p>
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
                            </div>
                        </div> : <div className={'login'}>
                            <FontAwesomeIcon onClick={() => setShowLogin(false)} icon={faCircleXmark}/>

                            <h1>Create an Account</h1>
                            <form onSubmit={handleSignUp}>
                                <label>
                                    <p>Name</p>
                                    <input value={signUpValues.firstName} onChange={(ev)=>setSignUpValues({...signUpValues,firstName: ev.target.value})}  type={'text'} placeholder={'Name'}/>
                                </label>
                                <label>
                                    <p>Email address</p>
                                    <input value={signUpValues.email} onChange={(ev)=>setSignUpValues({...signUpValues,email: ev.target.value})}  type={'text'} placeholder={'your-@mail.ru'}/>
                                </label>
                                <label id={'par'}>
                                    <p> Password</p>
                                    <input value={signUpValues.password} onChange={(ev)=>setSignUpValues({...signUpValues,password: ev.target.value})}  type={showPasswordsOfSignUp.password?'text':'password'} placeholder={'Enter your password'}/>
                                    <FontAwesomeIcon onClick={()=>setShowPasswordsOfSignUp({...showPasswordsOfSignUp,password: !showPasswordsOfSignUp.password})} icon={showPasswordsOfSignUp.password?faEyeSlash:faEye}/>
                                </label>
                                <label id={'par'}>
                                    <p> Confirm Password</p>
                                    <input value={signUpValues.confirmPassword} onChange={(ev)=>setSignUpValues({...signUpValues,confirmPassword: ev.target.value})}  type={showPasswordsOfSignUp.confirmPassword?'text':'password'} placeholder={'Confirm your password'}/>
                                    <FontAwesomeIcon onClick={()=>setShowPasswordsOfSignUp({...showPasswordsOfSignUp,confirmPassword: !showPasswordsOfSignUp.confirmPassword})} icon={showPasswordsOfSignUp.confirmPassword?faEyeSlash:faEye}/>
                                </label>
                                <button>Register</button>
                            </form>
                            <div className={'fpw'}>
                                <p id={'h1'}>Have an account?<h4 onClick={() => {
                                    setCase2('login')
                                    setError('')
                                    setSuccess('')
                                }}>Login now</h4></p>
                            </div>
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
                        </div>}
                    </div>
                </div>
            </div> : null}

            <div style={{background: color}} className={'container-fluid navB2'}>
                <div className={'row'}>
                    <div className={'col-sm-5 tp col-5'}>
                        <FontAwesomeIcon style={{color: showMenu ? '#0feffd' : 'white'}} onClick={handleMenu}
                                         icon={faBars}/>
                        <Link to={'/'}>
                            <img
                                src={'https://img.1hd.to/xxrz/400x400/100/88/35/8835791304d21b3c256c5501095f5e4e/8835791304d21b3c256c5501095f5e4e.png'}/>
                        </Link>
                    </div>
                    <div className={'col-sm-4 tp col-4'}></div>
                    <div id={'ab'} className={' col-sm-3 tp col-3'}>
                        <FontAwesomeIcon id={'spka'} style={{color: show ? '#0feffd' : 'white'}} onClick={handleSearch}
                                         icon={faMagnifyingGlass}/>

                        {!user.id ? (
                            <FontAwesomeIcon onClick={ ()=>setShowLogin(true)} icon={faUser}  />
                        ) : (
                            <div className={'additional'}>
                                <section onClick={()=>setExtra(!extra)} id={'arrowDown'}><FontAwesomeIcon icon={faAngleDown}/></section>
                                {extra ? <div className={'menuDown'}>
                                    <section onClick={()=>{
                                        naviagte(`/account/${user.id}`,{state:{condition:false}})
                                    }}  className={'eq'}>
                                        <FontAwesomeIcon icon={faBookmark}/>
                                        <h3>Watch list</h3>
                                    </section>
                                    <section onClick={()=>{
                                        naviagte(`/account/${user.id}`,{state:{condition:true}})
                                    }} className={'eq'}>
                                        <FontAwesomeIcon icon={faUser}/>
                                        <h3>My Profile</h3>
                                    </section>
                                    <section style={{margin: '0'}} onClick={handleLogOut} className={'eq'}>
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                        <h3>Logout</h3>
                                    </section>
                                </div>:null}
                            </div>
                        )}
                    </div>
                </div>
                {show ? <div className={'divInput'}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    <form onSubmit={handleSubmit}>
                        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type={'text'}
                               placeholder={'Search for movies and tv shows'}/>
                    </form>

                </div>
                    :null}
                {showMenu ? <div className={'menu'}>
                    <div className={'hv'}>
                        <Link to={'/'} className={'link'}>    <div className={'topMenu'}>
                            Home
                        </div></Link>
                        <Link to={'/movies'} className={'link'}> <div className={'topMenu'}>
                            Movies
                        </div></Link>
                        <Link to={'/contact'} className={'link'}> <div style={{border: 'none'}} className={'topMenu'}>
                            Contact
                        </div></Link>
                    </div>
                </div>:null}
            </div>
        </div>
    );
}

export default Navbar;