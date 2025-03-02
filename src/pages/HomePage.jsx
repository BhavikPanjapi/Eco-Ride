import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import NavBar from "../components/NavBar";
import RideOptions from "../components/RideOptions";
import { Button } from "../components/ui/button";

function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-200 to-green-400 relative overflow-hidden">
      <NavBar />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 pt-8 pb-16 flex flex-col items-center">
        {/* Hero section */}
        <div className="w-full max-w-6xl mx-auto relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL%C2%B7E%202025-03-01%2023.00.28%20-%20A%20modern%20web%20application%20homepage%20for%20a%20ride-sharing%20platform%20focused%20on%20auto-rickshaws%20and%20cabs.%20The%20design%20is%20clean%20and%20user-friendly%2C%20featuring%20a%20s-JEVwP7CmrGi6IpcQh0UCh3uXTXE4DA.webp"
            alt="Ride sharing illustration with auto-rickshaws and city skyline"
            className="w-full rounded-xl shadow-lg"
          />

          {/* Overlay buttons */}
          <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4">
            {/* Primary options */}
            <div className="flex items-center gap-3 bg-white rounded-full p-2 shadow-lg">
              <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center px-4 py-2">
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Search icon"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Find a Ride
              </Button>
              <Button variant="ghost" className="rounded-full text-gray-700 px-4 py-2">
                Fare Splitting
              </Button>
            </div>

            {/* Secondary options */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Button className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2">
                Scheduling
              </Button>
              <Button variant="ghost" className="bg-white/80 hover:bg-white rounded-full text-gray-700 px-4 py-2">
                Ride Sharing
              </Button>
            </div>

            {/* Login Button */}
            <Link to="/login">
              <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Ride options section */}
        <RideOptions />
      </div>

      {/* Location pin */}
      <div className="absolute top-32 right-8 z-10">
        <MapPin className="h-12 w-12 text-white drop-shadow-lg" aria-label="Location Pin" />
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-20 h-40 bg-green-300 rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-20 h-40 bg-yellow-300 rounded-tl-full"></div>
    </main>
  );
}

export default HomePage;