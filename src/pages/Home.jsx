import { Link } from "react-router-dom"
import { MapPin, Calendar, Search, Shield, CreditCard } from "lucide-react"

const Home = ({ isAuthenticated }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center"></div>
        <div className="relative z-10 px-6 py-16 md:py-24 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ride sharing made simple and affordable</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl">
            Connect with drivers heading your way and share the journey. Save money, reduce emissions, and make new
            connections.
          </p>
          {isAuthenticated ? (
            <Link
              to="/request"
              className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Find a Ride
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-300"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How RideShare Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to find and share rides, whether you're commuting to work or planning a road
            trip.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Enter Your Route</h3>
            <p className="text-gray-600">Tell us where you're starting from and where you're headed.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Date</h3>
            <p className="text-gray-600">Select when you need to travel, whether it's today or next week.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Your Match</h3>
            <p className="text-gray-600">Browse available rides that match your route and schedule.</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16 rounded-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose RideShare</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who are already enjoying the benefits of shared transportation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Money</h3>
              <p className="text-center text-gray-600">
                Split the cost of gas and tolls with other passengers heading your way.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a9 9 0 1 0 9 9"></path>
                  <path d="M12 3v9l4.5 4.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Emissions</h3>
              <p className="text-center text-gray-600">
                Help the environment by sharing rides and reducing the number of cars on the road.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-center text-gray-600">
                Our verification system and user ratings help ensure a safe experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to start sharing rides?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Join our community of riders and drivers today and experience a better way to travel.
        </p>
        {isAuthenticated ? (
          <Link
            to="/request"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-300"
          >
            <Search className="mr-2 h-5 w-5" />
            Find a Ride Now
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-300"
          >
            Sign Up Free
          </Link>
        )}
      </section>
    </div>
  )
}

export default Home