import requests
import json

# stock api config
api_key = '7KAIVRPOYGSV8AKU'
api_url_base = 'https://www.alphavantage.co/query?function=%s&symbol=%s&apikey=%s'

api_function_map = {
    'intraday': {
        'url': 'TIME_SERIES_INTRADAY&interval=5min',
        'result': 'Time Series (5min)'
    },
    'daily': {
        'url': 'TIME_SERIES_DAILY',
        'result': 'Time Series (Daily)'
    },
    'daily_adjusted': {
        'url': 'TIME_SERIES_DAILY_ADJUSTED',
        'result': 'Time Series (Daily)'
    },
    'weekly': {
        'url': 'TIME_SERIES_WEEKLY',
        'result': 'Weekly Time Series'
    },
    'weekly_adjusted': {
        'url': 'TIME_SERIES_WEEKLY_ADJUSTED',
        'result': 'Weekly Time Series'
    },
    'monthly': {
        'url': 'TIME_SERIES_MONTHLY',
        'result': 'Monthly Time Series'
    },
    'monthly_adjusted': {
        'url': 'TIME_SERIES_MONTHLY_ADJUSTED',
        'result': 'Monthly Time Series'
    } 
}

def get_stock_data(func, name):
    if func in api_function_map:
        api_url = api_url_base % (api_function_map[func]['url'], name, api_key)

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
            for date in raw[api_function_map[func]['result']]:
                data['data'][date] = {}
                for key in raw[api_function_map[func]['result']][date]:
                    data['data'][date][key[3:]] = raw[api_function_map[func]['result']][date][key]
            return data
        else:
            return None
    else:
        return None