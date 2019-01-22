export const API_FUNC_MAP = {
    'intraday': {
        'url': 'TIME_SERIES_INTRADAY',
        'result': 'Time Series (5min)',
        'name': '5 min'
    },
    'daily': {
        'url': 'TIME_SERIES_DAILY',
        'result': 'Time Series (Daily)',
        'name': 'Daily'
    },
    'daily_adjusted': {
        'url': 'TIME_SERIES_DAILY_ADJUSTED',
        'result': 'Time Series (Daily)',
        'name': 'Adjusted daily'
    },
    'weekly': {
        'url': 'TIME_SERIES_WEEKLY',
        'result': 'Weekly Time Series',
        'name': 'Weekly'
    },
    'weekly_adjusted': {
        'url': 'TIME_SERIES_WEEKLY_ADJUSTED',
        'result': 'Weekly Time Series',
        'name': 'Adjusted weekly'
    },
    'monthly': {
        'url': 'TIME_SERIES_MONTHLY',
        'result': 'Monthly Time Series',
        'name': 'Monthly'
    },
    'monthly_adjusted': {
        'url': 'TIME_SERIES_MONTHLY_ADJUSTED',
        'result': 'Monthly Time Series',
        'name': 'Adjusted monthly'
    } 
};
export const API_FUNC_LIST = Object.keys(API_FUNC_MAP);