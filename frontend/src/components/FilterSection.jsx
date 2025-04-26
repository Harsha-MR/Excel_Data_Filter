import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const columns = ['CategoryShortName', 'BranchAlias', 'SupplierAlias']

function FilterSection({ filename, onSearch }) {
  const [filters, setFilters] = useState({
    CategoryShortName: [],
    BranchAlias: [],
    SupplierAlias: []
  })

  const [options, setOptions] = useState({
    CategoryShortName: ['KU2PM', 'KURM', 'SKDM', 'HDB', 'PTL', 'BLS', 'PRF', 'BAN', 'BRC', 'EAR', 'NEC', 'RNG', 'SET', 'TIK', 'K2P', 'KUR', 'LAA', 'LPS', 'DRS', 'SKD', 'EMB', 'PLN', 'PTD', 'WOV', 'DUP', 'STL', 'SMT', 'SPC', 'SPE', 'SPP', 'NSP', 'PET', 'BOT', 'SHW'],
    BranchAlias: ['01-SE', '02-GK', '03-RG', '04-NO', '05-DLF', '06-IP', '08-VK', '10-IN', '11-RP', '14-KNP', '15-LDH', '16-V3S', '17-MGF', '18-GNO', '19-DDN', '22-FBD', '23-KPV', '24-MHG', '25-DBB', '26-SSG', '30-JD2', '31-BL1', '36-BBY', '38-AG2', '39-LJP', '42-MEG', '44-RP2', '45-NO2', '47-PSN', '48-LK2', '49-RG2', '50-HAL', '52-AMB', '53-SE1', '55-GIP', '56-DHA', '59-GZB', '61-TAT', '62-MHL', '64-JBL', '65-KAM', '67-PAV', '68-BHT', '69-KUR', '71-AML', '72-MOI', '73-SRH', '75-BB4', '76-SKT', '77-PSV', '78-BSP2', '79-RO2', '80-LD3', '81-PT2', '83-NSK', '84-TLK', '85-TAT2', '87-FBD2', '88-LK3', '90-DWK', '91-LK4', '92-RRK', '93-BHL', '95-DD4', '96-ELN', 'US-04', '51-JAM', '58-RCT', '82-GRD', 'HQ1-UV', '12-PTN', '86-RNC', '29-BSP', '40-LKO', '74-NGP', '21-RO1', '43-DD2', '07-CR', '46-DD3', '57-MRT', '70-HDR', '89-FBD3', 'MB-OL1', 'US-03', '66-RDP', 'US-02', 'MB-OL2', '94-BRL', 'US-01', 'US-05'],
    SupplierAlias: ['CAL-TRF', 'DEL-PTH', 'JPR-FLO', 'BBY-MNR', 'SUR-JJE', 'DEL-SHB', 'JPR-FLW', 'DEL-RWZ', 'VNS-SNS', 'AHD-SBT', 'JPR-BPN', 'DEL-PSM', 'DEL-KDE', 'BBY-CCN', 'BBY-RNK', 'DEL-AZH', 'BBY-EDS', 'JPR-BTP', 'LDN-ASK', 'DEL-NHA', 'DEL-APL', 'JPR-ANX', 'JPR-DFL', 'JPR-DGC', 'AHD-NIC', 'JPR-ADF', 'JPR-MNG', 'SUR-ANB', 'BBY-SCC', 'BBY-VTA', 'CAL-RZL', 'BBY-GMR', 'SUR-CHT', 'SUR-GKT', 'SUR-TTE', 'SUR-KSR', 'SUR-VTF', 'SUR-KRF', 'SUR-SUB', 'SUR-VGC', 'SUR-VRD', 'BBY-PRC', 'JPR-ART', 'SUR-KRS', 'SUR-SCF', 'BBY-RAD', 'CAL-FND', 'CAL-SNS', 'BBY-RMC', 'BBY-MNS', 'DEL-SRE', 'DEL-CTS', 'CAL-CNR', 'CAL-KAN', 'CAL-MDS', 'CAL-DWF', 'SUR-RCF', 'SUR-RSE', 'SUR-SPD', 'DEL-ARD', 'CAL-ASH', 'CAL-GSK', 'CAL-SRT', 'CAL-DBR', 'CAL-GMS', 'CAL-EKM', 'SUR-RMC', 'JPR-GDS', 'SUR-RLF', 'CAL-RGD', 'SUR-TNK', 'SUR-VSN', 'SUR-KIA', 'SUR-AMS', 'SUR-ARZ', 'SUR-MJF', 'SUR-SET', 'BBY-DPC', 'BLR-RDF', 'BLR-SNS', 'SUR-APF', 'SUR-NTF', 'VNS-JDS', 'SUR-VNA', 'BLR-MSS', 'BLR-SMM', 'VNS-GSS', 'JPR-NFH', 'BLR-MKK', 'DEL-SPE', 'SUR-ISH', 'SUR-SSC', 'AHD-NVA', 'CAL-SVM', 'SUR-MNI', 'SUR-SVT', 'VNS-SCH', 'AHD-AJT', 'SUR-SMD', 'JPR-NCR', 'SUR-SSF', 'VNS-RDH', 'SUR-AYN', 'SUR-UVS', 'BBY-SLC', 'SUR-VFS', 'AHD-NUT', 'BLR-KSS', 'BLR-MAD', 'BLR-MMS', 'SUR-NLX', 'VNS-VVD', 'BLR-SSS', 'VNS-BHH', 'VNS-KSS', 'GUJ-MGM', 'BLR-BDS', 'SUR-VBT', 'VNS-JKP', 'VNS-PSC', 'CJB-MHV', 'SUR-MRD', 'VNS-HRD', 'VNS-ZBD', 'BLR-SKS', 'MAA-TSS', 'VNS-SND', 'BBY-JBS', 'LDN-SGR', 'AHD-KDC', 'AHD-KRE', 'CAL-AMB', 'CAL-VNI', 'DEL-RSS', 'JPR-BGF', 'MAA-SHL', 'SUR-VNY', 'VNS-ARC', 'AHD-PRT', 'JPR-RCM', 'SUR-EKF', 'SUR-KFH', 'SUR-KGC', 'CAL-SSF', 'DEL-JMY', 'VNS-HNC', 'CAL-RGF', 'AHD-CLT', 'AHD-DSA', 'AHD-RTF', 'CAL-DSR', 'CAL-RAJ', 'CAL-VRM', 'CAL-LVS', 'CAL-RKC', 'CAL-JBC', 'DEL-ABH', 'DEL-MSK', 'JPR-LSA', 'DEL-KKR', 'BBY-SWN', 'AHD-KGM', 'BBY-KBI', 'BBY-GOP', 'BBY-PVF', 'SUR-RDC', 'SUR-SYS', 'CAL-NLM', 'SUR-NCR', 'CAL-SNH', 'HYD-KNT', 'MHR-GTH', 'DEL-HSH', 'SUR-DAS', 'SUR-SDF', 'SUR-MNR', 'SUR-RVA', 'DEL-MTR', 'BBY-IQR', 'DEL-DFN', 'DEL-BBF', 'SUR-PVC', 'SUR-SKW', 'SUR-SAE', 'BLR-NMD', 'SUR-BLC', 'VNS-KOR', 'SUR-VLT', 'CHN-GPS', 'MAA-TSW', 'SUR-SNJ']
  })

  const handleFilterChange = (column, values) => {
    // If "all" is selected, set value to ["all"] and clear other selections
    if (values.includes('all')) {
      setFilters(prev => ({
        ...prev,
        [column]: ['all']
      }))
      return
    }

    // If "all" was previously selected and now selecting other values, remove "all"
    if (filters[column].includes('all')) {
      values = values.filter(v => v !== 'all')
    }

    setFilters(prev => ({
      ...prev,
      [column]: values
    }))
  }

  const handleSearch = () => {
    // Convert "all" selections to null for backend processing
    const processedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = value.includes('all') ? null : value
      return acc
    }, {})
    
    onSearch(processedFilters)
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
                      : filters[column].includes('all')
                        ? 'All'
                        : filters[column].join(', ')}
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
                  {Array.isArray(options[column]) && options[column].map((value, index) => (
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
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200"
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default FilterSection 