export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-800 border-t-teal rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-400">Carregando...</p>
      </div>
    </div>
  )
}

