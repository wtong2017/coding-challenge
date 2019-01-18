from flask import Flask, request
from flask_restful import Api, Resource
from flask_pymongo import PyMongo
from flask_cors import CORS
import crawler.api.stock as StockApi
 
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://admin:admin@coding-test-shard-00-00-9rcsg.mongodb.net:27017,coding-test-shard-00-01-9rcsg.mongodb.net:27017,coding-test-shard-00-02-9rcsg.mongodb.net:27017/test?ssl=true&replicaSet=coding-test-shard-0&authSource=admin&retryWrites=true"
api = Api(app)
mongo = PyMongo(app)
CORS(app) # Solve cross domain problem: https://stackoverflow.com/questions/19962699/flask-restful-cross-domain-issue-with-angular-put-options-methods

class StockList(Resource):
    def get(self):
        stocks = mongo.db.stocks.find()
        stock_list = []
        for stock in stocks:
            stock.pop('_id')
            stock_list.append(stock['name'])
        return dict(result='success', userlist=stock_list)

class Stock(Resource):
    def get(self, name):
        _name = name.lower()
        stock = mongo.db.stocks.find_one({'name': _name})
        if stock is not None:
            stock.pop('_id')
            return dict(result='success', data=stock)
        else:
            result = StockApi.get_stock_data(_name)
            stock = {'name': _name}
            stock['daily_adjusted'] = result
            stock_id = mongo.db.stocks.insert_one(stock).inserted_id
            if stock_id is not None:
                return dict(result='success', data={'name': _name, 'daily_adjusted': result})
            return dict(result='error', data=None)

api.add_resource(StockList, '/list')
api.add_resource(Stock, '/stock/<name>')
 
if __name__ == '__main__':
    app.run(debug=True)