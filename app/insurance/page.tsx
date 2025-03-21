"use client";

import { FaPhone } from "react-icons/fa6";


export default function InsurancePage() {
  return (
    <section className="bg-gradient-to-r from-gray-400 to-blue-950 py-20 px-6 lg:px-24">
      {/* Insurance Banner */}
      <div className="text-center mt-10 ">
        <h1 className="text-4xl font-bold text-white">INSURANCE</h1>
      </div>

      {/* Introduction */}
      <h2 className="text-center text-2xl font-semibold text-white">
        We provide Insurance Solutions for Travel Purposes
      </h2>

      {/* Book Button */}
      {/* <div className="flex justify-center mt-6">
        <Link to="contact" smooth={true} duration={500}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
            BOOK HERE
          </button>
        </ScrollLink>
      </div> */}

      {/* Insurance Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
        <InsuranceCard
          title="Why Buy Insurance?"
          text="Travelling without emergency medical travel insurance while outside of Canada can be an unexpected and costly expense..."
        />
        <InsuranceCard
          title="Emergency Medical Insurance"
          text="Manulife has an extensive global network of emergency and travel assistance services through one dedicated 1-800 number..."
        />
        <InsuranceCard
          title="Trip Cancel Insurance"
          text="A trip can be considered an investment, so you should protect that investment from unexpected and uncontrollable events..."
        />
        <InsuranceCard
          title="Inclusive Travel Insurance"
          text="This insurance product offers peace of mind and protection from the time leading up to your travel departure and throughout your trip..."
        />
        <InsuranceCard
          title="What's Included?"
          text="Here is a brief summary of inclusions: Trip Cancellation, Trip Interruption, Emergency Medical Expenses, Emergency Evacuation, Lost Luggage..."
        />
        <InsuranceCard
          title="Super Visa Insurance"
          text="Parents and Grandparents applying for Super Visas are required to obtain private Canadian health insurance for the term of their stay..."
        />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12 text-lg font-semibold text-white">
        Call our specialists to learn more about how we can help you SAVE on your travel needs.
      </div>

      {/* Contact Box */}
      <div className="flex justify-center items-center mt-4 bg-blue-950 text-white px-6 py-4 rounded-lg text-lg font-semibold shadow-lg">
        <FaPhone className="mr-3" />
        1 855 553 2720
      </div>
    </section>
  );
}

// Reusable Insurance Card Component
const InsuranceCard = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col text-white">
    <h3 className="text-xl font-semibold bg-blue-950 p-2">{title}</h3>
    <p className="text-gray-700 mt-2">{text}</p>
  </div>
);
