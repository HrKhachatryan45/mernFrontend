import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieData from "./pages/MovieData";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Account from "./pages/Account";

function App(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(JSON.parse(localStorage.getItem("userData")) || []);
    const hostedUrl='https://mernbackend-gk1y.onrender.com'
    const getUser = async (id) => {
        try {
            const response = await fetch(`${hostedUrl}/api/user/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching user data:', error.message);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getUser(id.id);
            if (userData) {
                setUser(userData);
            }
            setLoading(false);
        };
            fetchData();

    }, [id]);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(id));
    }, [id]);

    if (loading) {
        return <div className={'loading'}>
            <section className={'loader'}></section>
        </div>;
    }

    return (
        <BrowserRouter basename="/mernFrontend">
            <Routes>
                <Route path="/#/" element={<Home />} />
                <Route path="/#/movies" element={<Movies />} />
                <Route path="/#/movies/:movieName" element={<MovieData />} />
                <Route path="/#/contact" element={<Contact />} />
                <Route path="/#/account/:id" element={user ? <Account /> : <Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
