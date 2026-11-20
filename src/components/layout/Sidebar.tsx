import { NavLink } from 'react-router-dom';



interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "categories", label: "Categories", icon: "🗂️" },
    { id: "customers", label: "Customers", icon: "👥" },
    //{ id: "orders", label: "Orders", icon: "🛒" },
];

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">

            {/* Logo */}
            <div className="mb-10">
                <h1 className="text-2xl font-bold">
                    IMS<span className="text-blue-400">.</span>
                </h1>

                <p className="text-sm text-slate-400">
                    Inventory Management
                </p>
            </div>

            {/* Navigation */}
            <nav>
                <p className="text-xs uppercase text-slate-500 font-semibold mb-4">
                    Menu
                </p>

                
                <ul className="space-y-2">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <NavLink
                                to={item.id === 'dashboard' ? '/' : `/${item.id}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 w-full p-3 rounded-lg transition ${
                                        isActive
                                            ? 'bg-slate-800 text-white'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`
                                }
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </nav>

        </aside>
    );
}

export default Sidebar;
