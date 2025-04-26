import pandas as pd
import sys
import json
from datetime import datetime

def convert_to_serializable(value):
    if pd.isna(value):
        return None
    if isinstance(value, pd.Timestamp):
        return value.strftime('%Y-%m-%d %H:%M:%S')
    return str(value)

def filter_excel(file_path, filters):
    try:
        # Read the Excel file with optimized settings
        df = pd.read_excel(
            file_path,
            engine='openpyxl',
            dtype=str,  # Read all columns as strings for faster processing
            na_filter=False  # Disable NA filtering for better performance
        )
        
        # Apply filters if they exist and are not null
        for column, values in filters.items():
            if values is not None and len(values) > 0:
                # Convert values to set for faster lookups
                value_set = set(values)
                df = df[df[column].isin(value_set)]
        
        # Convert DataFrame to list of dictionaries with serializable values
        # Use vectorized operations instead of iterating
        result = df.to_dict('records')
        
        # Convert values to serializable format
        for row in result:
            for key, value in row.items():
                row[key] = convert_to_serializable(value)
        
        return result
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    file_path = sys.argv[1]
    filters = json.loads(sys.argv[2])
    
    result = filter_excel(file_path, filters)
    print(json.dumps(result)) 