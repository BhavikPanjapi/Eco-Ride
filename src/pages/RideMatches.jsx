"use client"

import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import RideCard from "../components/RideCard"
import { Filter } from "lucide-react"

const RideMatches = ({ isAuthenticated }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const searchParams = location.state?.searchParams || {}

  const [rides, setRides] = useState([])
  const [filteredRides, setFilteredRides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortOption, setSortOption] = useState("price-asc")
  const [filterOptions, setFilterOptions] = useState({
    maxPrice: 100,
    minSeats: 1,
    timeRange: "any",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/matches" } })
      return
    }

    // Simulate API call to fetch rides based on search params
    const fetchRides = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockRides = [
        {
          id: 1,
          driver: {
            name: "John D.",
            rating: 4.8,
            trips: 124,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          origin: searchParams.origin || "San Francisco",
          originAddress: "123 Market St, San Francisco, CA",
          destination: searchParams.destination || "Los Angeles",
          destinationAddress: "456 Hollywood Blvd, Los Angeles, CA",
          date: searchParams.date || "2023-06-15",
          time: searchParams.time || "08:00",
          price: 45.0,
          seats: 4,
          seatsAvailable: 3,
          distance: "380 miles",
          duration: "6h 30m",
        },
        {
          id: 2,
          driver: {
            name: "Sarah M.",
            rating: 4.9,
            trips: 89,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          origin: searchParams.origin || "San Francisco",
          originAddress: "789 Valencia St, San Francisco, CA",
          destination: searchParams.destination || "Los Angeles",
          destinationAddress: "101 Venice Beach, Los Angeles, CA",
          date: searchParams.date || "2023-06-15",
          time: searchParams.time || "09:30",
          price: 55.0,
          seats: 3,
          seatsAvailable: 2,
          distance: "385 miles",
          duration: "6h 15m",
        },
        {
          id: 3,
          driver: {
            name: "Michael T.",
            rating: 4.7,
            trips: 56,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          origin: searchParams.origin || "San Francisco",
          originAddress: "555 Mission St, San Francisco, CA",
          destination: searchParams.destination || "Los Angeles",
          destinationAddress: "222 Santa Monica Blvd, Los Angeles, CA",
          date: searchParams.date || "2023-06-15",
          time: searchParams.time || "10:45",
          price: 35.0,
          seats: 5,
          seatsAvailable: 4,
          distance: "375 miles",
          duration: "6h 45m",
        },
        {
          id: 4,
          driver: {
            name: "Emily R.",
            rating: 5.0,
            trips: 42,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          origin: searchParams.origin || "San Francisco",
          originAddress: "999 Folsom St, San Francisco, CA",
          destination: searchParams.destination || "Los Angeles",
          destinationAddress: "333 Sunset Blvd, Los Angeles, CA",
          date: searchParams.date || "2023-06-15",
          time: searchParams.time || "12:00",
          price: 60.0,
          seats: 2,
          seatsAvailable: 1,
          distance: "390 miles",
          duration: "6h 10m",
        },
        {
          id: 5,
          driver: {
            name: "David K.",
            rating: 4.6,
            trips: 78,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          origin: searchParams.origin || "San Francisco",
          originAddress: "777 Howard St, San Francisco, CA",
          destination: searchParams.destination || "Los Angeles",
          destinationAddress: "444 Wilshire Blvd, Los Angeles, CA",
          date: searchParams.date || "2023-06-15",
          time: searchParams.time || "14:30",
          price: 40.0,
          seats: 4,
          seatsAvailable: 3,
          distance: "382 miles",
          duration: "6h 20m",
        },
      ]

      setRides(mockRides)
      setFilteredRides(mockRides)
      setIsLoading(false)
    }

    fetchRides()
  }, [isAuthenticated, navigate, searchParams])

  useEffect(() => {
    // Apply filters and sorting
    let result = [...rides]

    // Apply filters
    result = result.filter((ride) => {
      if (ride.price > filterOptions.maxPrice) return false
      if (ride.seatsAvailable < filterOptions.minSeats) return false

      if (filterOptions.timeRange !== "any") {
        const rideHour = Number.parseInt(ride.time.split(":")[0])

        if (filterOptions.timeRange === "morning" && (rideHour < 5 || rideHour >= 12)) return false
        if (filterOptions.timeRange === "afternoon" && (rideHour < 12 || rideHour >= 17)) return false
        if (filterOptions.timeRange === "evening" && (rideHour < 17 || rideHour >= 21)) return false
        if (filterOptions.timeRange === "night" && rideHour >= 5 && rideHour < 21) return false
      }

      return true
    })

    // Apply sorting
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortOption === "time-asc") {
      result.sort((a, b) => {
        const timeA = a.time.split(":").map(Number)
        const timeB = b.time.split(":").map(Number)
        return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
      })
    } else if (sortOption === "time-desc") {
      result.sort((a, b) => {
        const timeA = a.time.split(":").map(Number)
        const timeB = b.time.split(":").map(Number)
        return timeB[0] * 60 + timeB[1] - (timeA[0] * 60 + timeA[1])
      })
    }

    setFilteredRides(result)
  }, [rides, sortOption, filterOptions])

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilterOptions({
      ...filterOptions,
      [name]: name === "maxPrice" || name === "minSeats" ? Number(value) : value,
    })
  }

  const handleRideSelect = (rideId) => {
    // In a real app, this would navigate to a booking page or show a booking modal
    alert(`You selected ride #${rideId}. In a real app, this would proceed to booking.`)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl font-bold">Available Rides</h1>
          <p className="mt-2">
            {searchParams.origin && searchParams.destination
              ? `From ${searchParams.origin} to ${searchParams.destination}`
              : "Browse available rides"}
            {searchParams.date && ` on ${searchParams.date}`}
          </p>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Sort by:</span>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="rounded-md border border-gray-300 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="time-asc">Departure: Earliest</option>
                <option value="time-desc">Departure: Latest</option>
              </select>
            </div>

            <button
              onClick={toggleFilters}
              className="flex items-center text-gray-700 hover:text-primary transition-colors"
            >
              <Filter className="h-5 w-5 mr-1" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-3">Filter Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="maxPrice" className="block text-sm text-gray-700 mb-1">
                    Max Price: ${filterOptions.maxPrice}
                  </label>
                  <input
                    type="range"
                    id="maxPrice"
                    name="maxPrice"
                    min="10"
                    max="100"
                    step="5"
                    value={filterOptions.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="minSeats" className="block text-sm text-gray-700 mb-1">
                    Min Available Seats: {filterOptions.minSeats}
                  </label>
                  <input
                    type="range"
                    id="minSeats"
                    name="minSeats"
                    min="1"
                    max="6"
                    value={filterOptions.minSeats}
                    onChange={handleFilterChange}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="timeRange" className="block text-sm text-gray-700 mb-1">
                    Time of Day:
                  </label>
                  <select
                    id="timeRange"
                    name="timeRange"
                    value={filterOptions.timeRange}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="any">Any Time</option>
                    <option value="morning">Morning (5am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-9pm)</option>
                    <option value="night">Night (9pm-5am)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Finding rides for you...</p>
            </div>
          ) : filteredRides.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 text-gray-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No rides found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your filters or search for a different route or date.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-gray-600">
                Found {filteredRides.length} {filteredRides.length === 1 ? "ride" : "rides"} matching your criteria
              </p>

              {filteredRides.map((ride) => (
                <RideCard key={ride.id} ride={ride} onSelect={handleRideSelect} isSelectable={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RideMatches