from flask import Flask, request,jsonify,Blueprint,make_response
import json
from dynamic.config.setting import ABSOLUTE_PATH

predict = Blueprint('predict_controller',__name__)

#数据可视化请求
@predict.route("/visual_data",methods=["POST"])
def visual_data():

    data_name = request.json.get("data_name", "")
    print(data_name)

    img_url = ABSOLUTE_PATH+'\\resources\\predict\\visual_pic\\'+data_name+".png"
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response

#获取模型名称
@predict.route("/get_model_name", methods=["POST"])
def get_model_name():
    list_model_name=['Proposed','DNN','SSL','SSH']
    return jsonify(list_model_name)

#模型评估图片
@predict.route("/model_evaluation", methods=["POST"])
def model_evaluation():

    m_name = request.json.get("m_name", "")
    print(m_name)

    img_url = ABSOLUTE_PATH + '\\resources\\predict\\model_evaluation\\' +m_name+ ".png"
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response

#预测
@predict.route("/bearing_predict",methods=["POST"])
def bearing_predict():

    data_name=request.json.get("data_name", "")
    m_name=request.json.get("m_name", "")
    print(data_name)
    print(m_name)

    img_url = ABSOLUTE_PATH + '\\resources\\predict\\result_pic\\' + data_name + ".png"
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response


