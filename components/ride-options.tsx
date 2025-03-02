import Image from "next/image"
import { Button } from "@/components/ui/button"

const vehicles = [
  { id: 1, type: "CAB", image: "/placeholder.svg?height=100&width=150" },
  { id: 2, type: "AUTO", image: "/placeholder.svg?height=100&width=150" },
  { id: 3, type: "AUTO", image: "/placeholder.svg?height=100&width=150" },
  { id: 4, type: "CAB", image: "/placeholder.svg?height=100&width=150" },
  { id: 5, type: "AUTO", image: "/placeholder.svg?height=100&width=150" },
]

export default function RideOptions() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white/80 rounded-lg p-3 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full mb-2">{vehicle.type}</div>
            <Image
              src={vehicle.image || "/placeholder.svg"}
              alt={`${vehicle.type} vehicle`}
              width={100}
              height={60}
              className="mb-2"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-xs w-full mt-auto bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
            >
              Select
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

