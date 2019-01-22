from flask import Flask, request
from flask_restful import Api, Resource
from flask_pymongo import PyMongo
from flask_cors import CORS
import crawler.api.stock as StockApi
from bson import ObjectId
 
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://admin:admin@coding-test-shard-00-00-9rcsg.mongodb.net:27017,coding-test-shard-00-01-9rcsg.mongodb.net:27017,coding-test-shard-00-02-9rcsg.mongodb.net:27017/test?ssl=true&replicaSet=coding-test-shard-0&authSource=admin&retryWrites=true"
api = Api(app)
mongo = PyMongo(app)
CORS(app) # Solve cross domain problem: https://stackoverflow.com/questions/19962699/flask-restful-cross-domain-issue-with-angular-put-options-methods
stocks_db = mongo.db.stocks

class StockList(Resource):
    def get(self):
        stocks = stocks_db.find()
        stock_list = []
        for stock in stocks:
            stock.pop('_id')
            stock_list.append(stock['name'])
        return dict(result='success', userlist=stock_list)

class Stock(Resource):
    def get(self, func, name):
        _name = name.lower()
        stock = stocks_db.find_one({'name': _name})
        if stock is not None:
            _id = stock['_id']
            if func in stock:
                # Cached
                return dict(result='cached', data=stock[func])
            else:
                # Update
                result = self.add_stock(_name, func, _id)
                if result is not None:
                    return dict(result='update', data=result)
        else:
            # Insert
            result = self.add_stock(_name, func)
            if result is not None:
                return dict(result='success', data=result)
        return dict(result='error', data=None)
    def add_stock(self, name, func, _id=None):
        result = StockApi.get_stock_data(func, name)
        if _id is not None: 
            # Update
            if result is not None:
                new_value = {}
                new_value[func] = result
                stocks_db.update_one({'_id': _id}, {'$set': new_value})
                return result
        else:
            # Insert
            if result is not None:
                stock = {'name': name}
                stock[func] = result
                stocks_db.insert_one(stock)
                return result
        return None

api.add_resource(StockList, '/list')
api.add_resource(Stock, '/stock/<func>/<name>')
 
if __name__ == '__main__':
    app.run(debug=True)