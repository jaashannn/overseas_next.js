export default function DashboardPage() {
  // Random travel and tour package data
  const travelData = [
    {
      id: 1,
      title: "Sunwings Vacation Package",
      description: "7-day all-inclusive trip to Cancun, Mexico.",
      price: "$1200",
      bookings: 45,
    },
    {
      id: 2,
      title: "Rocky Mountaineer Adventure",
      description: "5-day scenic train journey through the Canadian Rockies.",
      price: "$2500",
      bookings: 22,
    },
    {
      id: 3,
      title: "Transat European Getaway",
      description: "10-day tour of Paris, Rome, and Barcelona.",
      price: "$1800",
      bookings: 30,
    },
    {
      id: 4,
      title: "Carnival Cruise Experience",
      description: "7-day Caribbean cruise with stops in Jamaica and the Bahamas.",
      price: "$1500",
      bookings: 18,
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Message */}
      <h1 className="text-3xl font-bold mb-6">Welcome Back, Agent!</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-3xl font-bold text-blue-950">115</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="text-3xl font-bold text-yellow-600">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className="text-3xl font-bold text-blue-950">$15,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Active Packages</h2>
          <p className="text-3xl font-bold text-yellow-600">8</p>
        </div>
      </div>

      {/* Travel and Tour Package Data */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Popular Travel Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelData.map((data) => (
            <div
              key={data.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
              <p className="text-gray-600 mb-4">{data.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-blue-600">{data.price}</p>
                <p className="text-sm text-gray-500">{data.bookings} bookings</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}