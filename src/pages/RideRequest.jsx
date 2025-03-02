"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Calendar, Clock, Users, Search } from "lucide-react"

const RideRequest = ({ isAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    passengers: 1,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/request" } })
    }
  }, [isAuthenticated, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.origin.trim()) {
      newErrors.origin = "Origin is required"
    }

    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required"
    }

    if (!formData.date) {
      newErrors.date = "Date is required"
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past"
      }
    }

    if (!formData.time) {
      newErrors.time = "Time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        navigate("/matches", { state: { searchParams: formData } })
      }, 1000)
    }
  }

  // Get today's date in YYYY-MM-DD format for min date attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl font-bold">Find a Ride</h1>
          <p className="mt-2">Enter your journey details to find available rides</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                Origin
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Enter pickup location"
                  className={`pl-10 w-full rounded-md border ${
                    errors.origin ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>
              {errors.origin && <p className="mt-1 text-sm text-red-600">{errors.origin}</p>}
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Enter drop-off location"
                  className={`pl-10 w-full rounded-md border ${
                    errors.destination ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>
              {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  className={`pl-10 w-full rounded-md border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>
              {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`pl-10 w-full rounded-md border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                />
              </div>
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Passengers
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "passenger" : "passengers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <Search className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Searching..." : "Search Rides"}
          </button>
        </form>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Travel Tips</h2>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-500 mr-2">
              ✓
            </span>
            Book in advance for better rates and more options
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-500 mr-2">
              ✓
            </span>
            Be flexible with your travel times for more matches
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-500 mr-2">
              ✓
            </span>
            Complete your profile to increase your chances of getting accepted
          </li>
          <li className="flex items-start">
            <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-500 mr-2">
              ✓
            </span>
            Message the driver before booking to confirm details
          </li>
        </ul>
      </div>
    </div>
  )
}

export default RideRequest