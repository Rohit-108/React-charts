
const Shimmer = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className="border p-4 rounded-lg shadow-lg animate-pulse"
                >
                    <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded-md mb-2 w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded-md mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded-md mb-2 w-1/4"></div>
                </div>
            ))}
        </div>
    )
}

export default Shimmer