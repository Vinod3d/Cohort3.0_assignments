import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSlider from '../components/CartSlider'
import { Outlet } from 'react-router'


const MainLayout = () => {
    return (
        <div className='bg-background min-h-screen relative flex flex-col'>
            <Navbar />
            <main className="overflow-x-hidden flex-1 flex flex-col">
                <Outlet />
            </main>
            <Footer />
            <CartSlider />
        </div>
    )
}

export default MainLayout