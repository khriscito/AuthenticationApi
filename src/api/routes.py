"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/login", methods=["POST"])
def get_login():
    body = request.json
    body_email = body.get("email", None)
    body_password = body.get("password", None)
    if body_email is None or body_password is None:
        return {"Error": "no ha colocado su correo o contraseña"}, 400
    user = User.query.filter_by(email=body_email).first()
    if user is None:
        return {"Error": "El usuario no existe"}, 404
    token = create_access_token(identity=user.id, expires_delta=False)
    print(token)
    return jsonify({"token": token})


@api.route("/register", methods=["POST"])
def get_register():
    body = request.json
    body_email = body.get("email", None)
    if body_email is None:
        return {"error": "Debe colocar un email"}, 400
    email_exists = User.query.filter_by(email=body_email).first()
    if email_exists:
        return {"Error": "Ya existe un email "}
    body_password = body.get("password", None)
    if body_password is None:
        return {"error": "Debe colocar una contraseña"}, 400

    new_user = User(
        email=body_email,
        password=body_password,
        is_active=True,
    )
    db.session.add(new_user)
    try:
        db.session.commit()
        return jsonify({"data": "Usuario ha sido creado con exito"}), 201
    except Exception as error:
        return jsonify({"msg": error.args[0]})