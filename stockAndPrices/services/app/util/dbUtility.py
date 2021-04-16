from configuration.Config import DB_NAME, DB_HOST, DB_PORT
import mongoengine
from mongoengine import Document, fields, DoesNotExist
from bson.json_util import loads, dumps

# pylint: disable=no-member
# DB & User model#
db = mongoengine
db.connect(alias='test1', db='test_1', host=DB_HOST, port=DB_PORT)
db.connect(alias='test2', db='test_2', host=DB_HOST, port=DB_PORT)


class User(Document):
    username = fields.StringField(required=True, unique=True)
    password = fields.StringField(required=True)
    email = fields.StringField(required=True, unique=True)
    roles = fields.StringField()
    is_active = fields.BooleanField(default=True)
    meta = {'db_alias':'test1'}

    @classmethod
    def lookup(cls, username):
        try:
            return  User.objects(username=username).get()
        except DoesNotExist:
            return None

    @classmethod
    def identify(cls, id):
        try:
            return User.objects(id=loads(id)).get() 
        except DoesNotExist:
            return None

    @property
    def rolenames(self):
        try:
            return self.roles.split(",")
        except Exception:
            return []

    @property
    def identity(self):
        return dumps(self.id)

    def is_valid(self):
        return self.is_active


class Interest(fields.EmbeddedDocument):
    gid = fields.StringField(required=True)
    sid = fields.StringField(required=True)
    gname = fields.StringField(required=True)
    gprice = fields.StringField(required=True)
    discount = fields.StringField(required=True)


class InterestList(Document):
    username = fields.StringField(required=True, unique=True)
    interest_list = fields.ListField(fields.EmbeddedDocumentField(Interest), default=True)
    meta = {'db_alias':'test2'}