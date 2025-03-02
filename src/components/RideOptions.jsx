import { Button } from "./ui/button"

const vehicles = [
  { id: 1, type: "CAB", image: "https://via.placeholder.com/150x100/ffffff/cccccc?text=CAB" },
  { id: 2, type: "AUTO", image: "https://via.placeholder.com/150x100/ffffff/cccccc?text=AUTO" },
  { id: 3, type: "AUTO", image: "https://via.placeholder.com/150x100/ffffff/cccccc?text=AUTO" },
  { id: 4, type: "CAB", image: "https://via.placeholder.com/150x100/ffffff/cccccc?text=CAB" },
  { id: 5, type: "AUTO", image: "https://via.placeholder.com/150x100/ffffff/cccccc?text=AUTO" },
]

function RideOptions() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-white/80 rounded-lg p-3 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full mb-2">{vehicle.type}</div>
            <img
              src={vehicle.image || "/placeholder.svg"}
              alt={`${vehicle.type} vehicle`}
              className="mb-2 w-full max-w-[100px]"
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

export default RideOptions

