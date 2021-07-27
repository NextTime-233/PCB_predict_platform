from flask import Flask, request,jsonify,Blueprint,make_response


user = Blueprint('user_controller',__name__)

@user.route("/log_on",methods=["POST"])
def log_on():
    user_name = str(request.args.get('user_name', ''))
    pw = str(request.args.get('pw', ''))

    if user_name is '1'and pw is '0':
        message='登录成功'
    else:
        message='账户名或密码错误'

    return message