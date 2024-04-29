import React from 'react';
import Navbar from "../components/Navbar";
import {faX} from "@fortawesome/free-solid-svg-icons/faX";
import {faFacebookF, faRedditAlien} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons/faWhatsapp";
import {faFacebookMessenger} from "@fortawesome/free-brands-svg-icons/faFacebookMessenger";
import {faTelegram} from "@fortawesome/free-brands-svg-icons/faTelegram";
import {Link} from "react-router-dom";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";

function Home(props) {
    return (
        <div>
            <Navbar activeItem={'home'} color={'#0B0B0D'}/>
            <div className={'container-fluid homePart'}>
                <div className={'row'}>
                    <div className={'col-xl-2 gp col-lg-2 col-md-1 col-sm-1 col-1'}></div>
                    <div className={'col-xl-8 gp col-lg-8 col-md-10 col-sm-10 col-10'}>
                        <div className={'htuk'}>
                            <img
                                src={'https://img.1hd.to/xxrz/400x400/100/88/35/8835791304d21b3c256c5501095f5e4e/8835791304d21b3c256c5501095f5e4e.png'}/>
                            <p>Please help us by sharing this site with your friends. Thanks!</p>
                            <div className={'ter'}>
                                <h2><span>176k</span><p>Shares</p></h2>
                                <section style={{background:'#4267B2'}}><FontAwesomeIcon icon={faFacebookF}/></section>
                                <section style={{background:'#000000'}}><FontAwesomeIcon icon={faX}/></section>
                                <section style={{background:'#25d366'}}><FontAwesomeIcon icon={faWhatsapp}/></section>
                                <section style={{background:'#448AFF'}}><FontAwesomeIcon icon={faFacebookMessenger}/></section>
                                <section style={{background:'#ff4500'}}><FontAwesomeIcon icon={faRedditAlien}/></section>
                                <section style={{background:'#0088CC'}}><FontAwesomeIcon icon={faTelegram}/></section>

                            </div>
                            <button>
                                <Link to={'/movies'}>
                                    Browse All Movies & Series
                                    <FontAwesomeIcon icon={faArrowRight}/>
                                </Link>
                            </button>
                        </div>
                        <h1 className={'specialU'}>Watch Free Movies Online With 1HD.to</h1>
                        <p className={'spP'}>If you are sitting through ads and pop-ups only to watch your content of
                            interest, well, stop! As time changes, so do free movie sites. Why compromise your safety as
                            well as your viewing experience when an ad-free site like 1HD.to exists? With 1HD.to, you
                            can bid farewell to annoying interruptions and enjoy seamless movie streaming at your
                            convenience. No more frustrating ad breaks or intrusive pop-ups to disrupt your
                            entertainment.
                            Or if ads are none of your concern, as you are paying to watch your favorite movies,
                            consider breaking free and embracing the world of free entertainment. 1HD.to offers a vast
                            library of films that you can enjoy without any subscription fees. Imagine having access to
                            a wide range of high-quality movies from different genres, all at your fingertips. Whether
                            you're in the mood for action-packed blockbusters, heartwarming dramas, or thrilling
                            suspense, 1HD.to has got you covered.
                        </p>

                        <h1 className={'specialU'}>Unlock A Limitless World Of Entertainment With Thousands Of HD
                            Movies</h1>
                        <p className={'spP'}>Why settle for anything less when you can have it all? At 1HD.to, we
                            believe in delivering an extraordinary movie-watching experience that will surpass your
                            expectations. Our vast content library is filled with an extensive selection of films,
                            catering to a wide range of genres and tastes. Whether you're craving adrenaline-pumping
                            thrillers, heartwarming romances, or thought-provoking dramas, we have something special in
                            store for you at 1HD.to.
                            But would you compromise on great content if it strains your eyes after a few minutes? If
                            that's what you are doing, bid farewell to that site and bookmark us instead. At 1HD.to, we
                            strive to make your viewing experience truly exceptional. Immerse yourself in stunning HD
                            quality, choose from multiple subtitle options to enhance your understanding, and enjoy fast
                            loading speeds that whisk you away into the cinematic world in an instant. And the cherry on
                            top? We've banished those intrusive ads that disrupt your enjoyment. Say goodbye to
                            interruptions and distractions, and indulge in pure cinematic bliss.
                            Your security and privacy are of utmost importance to us. We take pride in providing a safe
                            and secure platform for free movie streaming. Explore our extensive library with confidence,
                            knowing that your personal information is well-protected.
                            Experience the revolution in free movie streaming with 1HD.to. Upgrade your entertainment,
                            redefine your expectations, and indulge in a world of high-quality films without any
                            compromises. Join us today and discover the true meaning of a premium free movie streaming
                            site.
                        </p>

                        <h1 className={'specialU'}>What Is 1HD.to?</h1>
                        <p className={'spP'}>
                            1HD.to is a new free movie site entering the scene. While the term "new" may evoke notions
                            of naivety, 1HD.to defies this stereotype by offering an upgraded and refined movie
                            streaming experience. It builds upon the strengths of traditional sites, leaving behind the
                            flaws and inconveniences that plagued them. With a user-friendly interface, extensive movie
                            library, and seamless streaming capabilities, 1HD.to is at the forefront of the evolving
                            landscape of free movie sites.
                        </p>

                        <h1 className={'specialU'}>What Can You Watch On 1HD.to?</h1>
                        <p className={'spP'}>
                            On 1HD.to, you have access to a vast and diverse range of movies that cater to every taste
                            and preference. The extensive content library offers an impressive selection of films
                            spanning various genres, ensuring there's something for everyone. From action-packed
                            thrillers and heartwarming romances to captivating dramas and hilarious comedies, you'll
                            find an abundance of titles to choose from. Whether you're in the mood for the latest
                            blockbusters or timeless classics, 1HD.to has you covered with an extensive collection of
                            high-quality movies that will keep you entertained for hours on end.
                        </p>

                        <h1 className={'specialU'}>How To Download Movies To Watch Offline On 1HD.to?</h1>
                        <img className={'ae'} src={'https://i.imgur.com/ieo4zUc.jpg'}/>
                        <p className={'spP'}>
                            If you are looking to download movies for an upcoming getaway, don’t sweat, downloading a
                            movie on 1HD.to is as easy as eating a piece of cake. These are the three simple steps that
                            help you watch your favorite movies and TV series offline:
                            - Look for the Download button on the media player (while you are streaming the movie).
                            - Click on the "Download" button to get to the download page.
                            - Simply follow the provided steps on the page to download the file.
                        </p>


                        <h1 className={'specialU'}>How to Download 1HD.to App Or 1HD.to APK File?</h1>
                        <p className={'spP'}>
                            Please note that there is currently no official 1HD app or APK file available. It is
                            important to be cautious and avoid downloading any app or file claiming to be 1HD.to, as
                            they are likely fake and may have malicious intentions. We prioritize your safety and will
                            notify you once our official app and APK file become available. Stay tuned for updates!
                        </p>

                        <h1 className={'specialU'}>How To Watch Free Movies Online On 1HD.to?</h1>
                        <p className={'spP'}>
                            To watch movies free online on 1HD.to, simply follow these steps:
                            - Utilize the search bar or browse through the categories to find the title of your
                            interest.
                        </p>
                        <img className={'ae'} src={'https://i.imgur.com/ieo4zUc.jpg'}/>
                        <p className={'spP'}>
                            - Click on the title to access the subpage, where you can read information about the movie
                            to help you decide if you want to watch it.
                            - Once you've made your decision, click on the "Watch Now" button.
                        </p>
                        <img className={'ae'} src={'https://i.imgur.com/ieo4zUc.jpg'}/>
                        <p className={'spP'}>
                            - On the movie's page, click the play button to start streaming and enjoy the content seamlessly, without any ads, pop-ups, redirects, buffering, or lagging.
                        </p>

                    </div>
                    <div className={'col-xl-2 gp col-lg-2 col-md-1 col-sm-1 col-1'}></div>
                </div>
            </div>
        </div>
    );
}

export default Home;