import pandas as pd
import sys
import json

def filter_excel(file_path, filters):
    # Read the Excel file
    df = pd.read_excel(file_path)
    
    # Apply filters if they exist
    for column, values in filters.items():
        if values and len(values) > 0:
            df = df[df[column].isin(values)]
    
    # Convert to dict for JSON serialization
    return df.to_dict('records')

if __name__ == "__main__":
    file_path = sys.argv[1]
    filters = json.loads(sys.argv[2])
    
    result = filter_excel(file_path, filters)
    print(json.dumps(result)) 