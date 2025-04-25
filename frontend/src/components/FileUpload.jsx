import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const API_URL = 'http://localhost:5000'

function FileUpload({ onFileUpload }) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    if (!file.name.endsWith('.xlsx')) {
      toast.error('Please upload an Excel (.xlsx) file')
      return
    }

    await uploadFile(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (!file.name.endsWith('.xlsx')) {
        toast.error('Please upload an Excel (.xlsx) file')
        return
      }
      await uploadFile(file)
    }
  }

  const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      toast.success('File uploaded successfully')
      onFileUpload(response.data.filename)
    } catch (error) {
      toast.error('Error uploading file')
      console.error(error)
    }
    setUploading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors duration-200 ease-in-out ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className={`w-12 h-12 mb-3 transition-colors duration-200 ease-in-out ${
              dragActive ? 'text-blue-500' : 'text-gray-400'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">Excel files only (.xlsx)</p>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <label
          htmlFor="file-upload"
          className={`absolute inset-0 cursor-pointer ${
            uploading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        />
      </div>
      {uploading && (
        <div className="mt-4 flex items-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          <span className="text-sm text-gray-600">Uploading...</span>
        </div>
      )}
    </div>
  )
}

export default FileUpload 