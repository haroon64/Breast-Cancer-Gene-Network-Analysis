from pymongo import MongoClient
from pymongo.database import Database as MongoDatabase
from pymongo.collection import Collection
from app.config import CLIENT_URL ,DB_NAME,COLLECTION_NAME
class MongoDBClient:
    def __init__(self, uri: str, db_name: str):
        """
        Initialize MongoDB connection.
        
        :param uri: MongoDB connection URI (e.g., "mongodb://localhost:27017")
        :param db_name: Name of the MongoDB database
        """
        self._client = MongoClient(uri)
        self._db = self._client[db_name]
        if not self._client:
            raise Exception("Failed to connect to MongoDB")

    def get_database(self) -> MongoDatabase:
        """
        Returns the MongoDB database object.
        """
        return self._db

    def get_collection(self, collection_name: str) :
        """
        Get a collection from the MongoDB database.
        
        :param collection_name: Name of the collection
        :return: Collection object
        """
        return self._db[collection_name]

    def close(self):
        """
        Close the MongoDB connection.
        """
        self._client.close()
        
mongodb_client = MongoDBClient(CLIENT_URL, DB_NAME)
Collection = mongodb_client.get_collection(COLLECTION_NAME)