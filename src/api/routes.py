"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():

    data= request.get_json()

    if not data:
        return jsonify({"msg": "data not received"}), 400
    
    hashed_password= generate_password_hash(data['password'])
    
    email= data.get("email")
    password=data.get("password")
    username=data.get("username")

    required_fields = ["email", "password", "username"]

    

    existing_user= User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "user already exists with that email"}), 409
    
    if not all(data.get(field) for field in required_fields):
        return jsonify({"msg": "missing required fields"}), 400
    
    new_user=User(
        email=email,
        password=hashed_password,
        username=username
    )
    db.session.add(new_user)
    
    try:
        db.session.commit()
        return jsonify({'msg': 'created user successfully'}), 201
    
    except Exception as e:
        print(f"Error getting users: {e}")
        return jsonify({"msg": "Internal Server Error", "error": str(e)}), 500

@api.route("/login", methods=["POST"])
def login():

    data = request.get_json()
    user=User.query.filter_by(email=data['email'].lower()).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'msg': 'invalid email or password'}), 401

    # username = request.json.get("username", None)
    # password = request.json.get("password", None)
    # if username != "test" or password != "test":
    #     return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({
        "token": access_token,
        'message': 'logged in successfully',
        'user': user.serialize()
        }), 200
