import { useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import FileUpload from './components/FileUpload'
import FilterSection from './components/FilterSection'
import DataTable from './components/DataTable'

const API_URL = 'http://localhost:5000'

function App() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (filters) => {
    if (!uploadedFile) {
      toast.error('Please upload a file first')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/filter`, {
        filename: uploadedFile,
        filters: filters
      })
      setData(response.data.data)
    } catch (error) {
      toast.error('Error filtering data')
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Excel Data Filter
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Upload your Excel file and filter data based on multiple criteria
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <FileUpload 
            onFileUpload={(filename) => setUploadedFile(filename)} 
          />
        </div>
        
        {uploadedFile && (
          <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Filter Options
            </h2>
            <FilterSection 
              filename={uploadedFile}
              onSearch={handleSearch}
            />
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          data.length > 0 && (
            <div className="bg-white rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Filtered Results
              </h2>
              <DataTable data={data} />
            </div>
          )
        )}
      </div>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App 