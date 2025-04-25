import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const API_URL = 'http://localhost:5000'

const columns = ['CategoryShortName', 'BranchAlias', 'SupplierAlias']

function FilterSection({ filename, onSearch }) {
  const [filters, setFilters] = useState({
    CategoryShortName: [],
    BranchAlias: [],
    SupplierAlias: []
  })

  const [options, setOptions] = useState({
    CategoryShortName: [],
    BranchAlias: [],
    SupplierAlias: []
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchColumnValues = async () => {
      setLoading(true)
      try {
        const results = await Promise.all(
          columns.map(column =>
            axios.get(`${API_URL}/column-values/${filename}/${column}`)
          )
        )

        const newOptions = {}
        results.forEach((result, index) => {
          // Keep all values, including duplicates
          newOptions[columns[index]] = result.data.values
        })
        setOptions(newOptions)
      } catch (error) {
        toast.error('Error fetching column values')
        console.error(error)
      }
      setLoading(false)
    }

    if (filename) {
      fetchColumnValues()
    }
  }, [filename])

  const handleFilterChange = (column, values) => {
    // If "all" is selected, clear other selections
    if (values.includes('all')) {
      setFilters(prev => ({
        ...prev,
        [column]: []
      }))
      return
    }

    setFilters(prev => ({
      ...prev,
      [column]: values
    }))
  }

  const handleSearch = () => {
    onSearch(filters)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div key={column} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {column}
            </label>
            <Listbox
              value={filters[column]}
              onChange={(values) => handleFilterChange(column, values)}
              multiple
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <span className="block truncate">
                    {filters[column].length === 0
                      ? 'Select options'
                      : `${filters[column].length} selected`}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <Listbox.Option
                    value="all"
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          All
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                  {options[column].map((value, index) => (
                    <Listbox.Option
                      key={`${value}-${index}`}
                      value={value}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {value}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          disabled={loading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Loading...
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  )
}

export default FilterSection 