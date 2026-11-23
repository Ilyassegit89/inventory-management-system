


import products from "../../data/products";


interface DashboardStat {
    title: string;
    value: number;
    description: string;
    icon: string;
    color: string;
}

const stats: DashboardStat[] = [
    {
        title: "Total Products",
        value: products.length,
        description: "Products in inventory",
        icon: "📦",
        color: "blue"
    },
    {
        title: "Total Customers",
        value: 86,
        description: "Registered customers",
        icon: "👥",
        color: "green"
    },
    {
        title: "Total Orders",
        value: 32,
        description: "Orders received",
        icon: "🛒",
        color: "purple"
    },
    {
        title: "Low Stock Products",
        value: 5,
        description: "Products need restocking",
        icon: "⚠️",
        color: "red"
    }
];


 function  DashboardPage() {
    return (
        <div className="space-y-6">

             {/* Page heading  */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard Overview
                </h1>
                <p className="text-slate-500 mt-1">
                    Here's what's happening in your store.
                </p>
            </div>

             {/* Statistics Cards  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

               {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500">
                                {stat.title}
                            </p>

                            <span className="text-2xl">{stat.icon}</span>
                        </div>

                        <h2 className="text-3xl font-bold text-slate-800 mt-4">
                            {stat.value}
                        </h2>

                        <p className="text-sm text-slate-500 mt-2">
                            {stat.description}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default DashboardPage;
