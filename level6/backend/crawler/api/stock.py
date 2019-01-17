import requests
import json

# stock api config
api_key = '7KAIVRPOYGSV8AKU'
api_url_base = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=%s&apikey=%s'

def get_stock_data(name):
    api_url = api_url_base % (name, api_key)

    response = requests.get(api_url)

    if response.status_code == 200:
        raw = json.loads(response.content.decode('utf-8'))
        data = {
            'meta_data': {},
            'data': {}
        }
        for key in raw['Meta Data']:
            # Rename the annoying key name
            data['meta_data'][key[3:]] = raw['Meta Data'][key]
        for date in raw['Time Series (Daily)']:
            data['data'][date] = {}
            for key in raw['Time Series (Daily)'][date]:
                data['data'][date][key[3:]] = raw['Time Series (Daily)'][date][key]
        return data
    else:
        return None