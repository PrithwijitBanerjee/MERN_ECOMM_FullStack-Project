import Footer from '../commons/Footer'
import NavBar from '../commons/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <NavBar />
            <div style={{ minHeight: '70vh' }} className="d-flex flex-column">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout