import { flightsData } from "@/data/data";

export default function FlightsPage() {
  const { consolidators } = flightsData[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Flights Consolidators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consolidators.map((consolidator, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-4">{consolidator.title}</h2>
            <div className="space-y-2">
              <a
                href={consolidator.link}
                className="block text-blue-600 hover:underline"
              >
                Visit Link
              </a>
              <a
                href={consolidator.site}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                Visit Site
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}