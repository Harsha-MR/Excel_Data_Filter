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
        # Read the Excel file
        df = pd.read_excel(file_path)
        
        # Apply filters if they exist and are not null
        for column, values in filters.items():
            if values is not None and len(values) > 0:
                df = df[df[column].isin(values)]
        
        # Convert DataFrame to list of dictionaries with serializable values
        result = []
        for _, row in df.iterrows():
            row_dict = {}
            for column in df.columns:
                row_dict[column] = convert_to_serializable(row[column])
            result.append(row_dict)
        
        return result
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    file_path = sys.argv[1]
    filters = json.loads(sys.argv[2])
    
    result = filter_excel(file_path, filters)
    print(json.dumps(result)) 