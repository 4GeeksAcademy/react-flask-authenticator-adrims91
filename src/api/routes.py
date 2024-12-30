"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

bcrypt = Bcrypt()

@api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    if "username" not in data or "password" not in data:
        return jsonify({"error": "Missing username or password."}), 400
    user = User.query.filter_by(username=data['username']).first()
    if user:
        return jsonify({"error": "User already exists."}), 400
    new_user = User(username=data['username'], password=data['password'], is_active=True)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"username": new_user.username}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    if not user:
        return jsonify({"error": "bad credentials"}), 401
    token = create_access_token(identity=user.username)
    return jsonify({"token": token, "username": user.username}), 200

