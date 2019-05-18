from flask import Blueprint, jsonify
from webargs import fields
from webargs.flaskparser import use_args

from . import goodObject


bp_claim = Blueprint("claims", __name__)

add_args = {
    "garbage_type": fields.Str(required=True),
    "parameters": fields.Str(required=True),
}

search_args = {
    "citizensId": fields.Integer(required=False),
    "collectorsId": fields.Integer(required=False)
}

put_args = {
    "measurementUnit": fields.Str(required=True),
    "amount": fields.Float(required=True)
}

@bp_claim.route('/<collector_id>/<citizen_id>', methods=["POST"])
@use_args(add_args)
def add(args, collector_id, citizen_id):
    return jsonify([collector_id, citizen_id, args])


@bp_claim.route('/search', methods=["GET"])
@use_args(search_args)
def search(args):
    with goodObject.connection.cursor() as cursor:
        if args['collectorsId']:
            cursor.execute('select * from claims where executor = %n', (args['collectorsId']))
        elif args['citizensId']:
            cursor.execute('select * from claims where creator = %n', (args['citizensId']))
        else:
            return jsonify(None)
        result = cursor.fetchall()

    return jsonify(result)


@bp_claim.route('/<id>', methods=["GET"])
def get(id):
    with goodObject.connection.cursor() as cursor:
        cursor.execute('select * from claims where id = %n', (id))
        result = cursor.fetchone()
        result['params'] = {}
        cursor.execute('select * from claim_params where claim = %n', (id))
        res = cursor.fetchall()
        for raw in res.values():
            result['params'][raw['code']] = raw['value']

    return jsonify(result)


@bp_claim.route('/<id>', methods=["DELETE"])
def delete(id):
    return jsonify([id])


@bp_claim.route('/<id>/<state>', methods=["PUT"])
@use_args(put_args)
def put(args, id, state):
    return jsonify([id, args, state])

