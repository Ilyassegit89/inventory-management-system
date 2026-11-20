

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import DashboardPage from './features/dashboard/DashboardPage';
import ProductsPage from './features/products/ProductsPage.tsx';

function App() {
    return (
        <BrowserRouter>
             <div className="flex min-h-screen bg-slate-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col">

                {/* Navbar */}
                <header className="bg-white border-b border-slate-200">
                    <Navbar />
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <Routes>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/products" element={<ProductsPage />} />
                    </Routes>
                </main>

            </div>
        </div>
        </BrowserRouter>
       
    );
}

export default App;
