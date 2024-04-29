import React from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";


function Footer(props) {
    const goTop=()=>{
        window.scrollTo(0,0)
    }
    return (
        <div className={'container-fluid footer'}>
            <div className={'row'}>
                <div className={'col-xl-12 foot col-lg-12 col-md-12 col-sm-12 col-12'}>
                    <div className={'imge'}>
                        <Link to={'/'}>
                            <img
                                src={'https://img.1hd.to/xxrz/400x400/100/88/35/8835791304d21b3c256c5501095f5e4e/8835791304d21b3c256c5501095f5e4e.png'}/>
                        </Link>
                    </div>
                    <div className={'sec'}>
                        <h3>About Us</h3>
                        <p>1HD is free tv shows streaming website with zero ads, it allows you watch tv shows online,
                            watch tv shows online free in high quality for free. You can also download full tv shows and
                            watch it later if you want.</p>
                        <p>This site does not store any files on our server, we only linked to the media which is hosted
                            on 3rd party services.</p>
                        <section>
                            <span>Sitemap  </span>
                            <span>Contact</span>
                            <span>Terms of service</span>
                        </section>
                    </div>
                    <div className={'sec'}>
                        <h3>Links</h3>
                        <div className={'yn'}>
                            <section>
                                <h4>Movies</h4>
                                <h4>TV Series</h4>
                                <h4>Top IMDb</h4>
                            </section>
                            <section>
                                <h4>Action</h4>
                                <h4>Comedy</h4>
                                <h4>Drama</h4>
                            </section>
                            <section>
                                <h4>Fantasy</h4>
                                <h4>Horror</h4>
                                <h4>Mystery</h4>
                            </section>
                        </div>

                    </div>
                    <div className={'enw'}>
                        <button onClick={goTop}>
                            <FontAwesomeIcon icon={faAngleUp} />
                            <h2>Top</h2>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;