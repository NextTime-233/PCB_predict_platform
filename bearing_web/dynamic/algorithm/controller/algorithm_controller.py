from flask import Flask, request,jsonify,Blueprint,make_response
import json


import io
from dynamic.algorithm.entity.Parameter import Parameter
from dynamic.algorithm.entity import ModelEvaluation
from dynamic.config.setting import ABSOLUTE_PATH


algorithm = Blueprint('algorithm_controller',__name__)

@algorithm.route("/test",methods=["POST"])
def test():
    hello = str(request.json.get('hello', ''))
    return jsonify('请求发送成功')



@algorithm.route("/visual_data", methods=["POST"])
def visual_data():
    """可视化轴承信息，生成图片至本地，返回图片地址"""
    data_name=request.args.get("data_name", "")
    img_url = ABSOLUTE_PATH + '\\resources\\PREDICT_visial_pic\\'+data_name+'.png'
    print(img_url)
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response

@algorithm.route("/select_model_name", methods=["POST"])
def select_model_name():


    list_model_name=['LSTM_2011_09_01','GRU_2021_09_23','CNN_2019_03_21']

    return jsonify(list_model_name)

@algorithm.route("/diagnosis",methods=["POST"])
def diagnosis():
    """实时诊断"""
    """
    date_path=  ABSOLUTE_PATH +'\\resources\\data\\'+request.args.get("data_name", "")+'.mat'
    m_name=str(request.args.get('m_name', ''))
    result=DiagnosisService.diagnosis(date_path,m_name)
    """
    data_name = str(request.json.get('data_name', ''))
    m_name = str(request.json.get('m_name', ''))
    print(data_name)
    print(m_name)
    return 'SVM断线'

@algorithm.route("/train_model", methods=["POST"])
def train_model():
    """训练模型，生成评估指数，模型，图片保存地址"""

    parameter = Parameter()
    parameter.parameter_type=request.json.get("parameter_type", "")
    parameter.data_name=str(request.json.get("data_name", ""))
    parameter.signal_length=int(request.json.get("signal_length", ""))
    parameter.signal_number=int(request.json.get("signal_number", ""))
    parameter.normal=bool(request.json.get("normal", ""))
    parameter.batch_size=int(request.json.get("batch_size", ""))
    parameter.epochs=int(request.json.get("epochs", ""))
    parameter.num_classes=int(request.json.get("num_classes", ""))



    modelEvaluation_dic=[{'m_name': str('LSTM2020_01_20'),
                          'loss': float('0.91'),
                          'accuracy': float('0.82'),
                          'precision': float('0.40'),
                          'recall': float('0.91'),
                          'f1_meansure': float('0.61'),
                          'save_path': 'address2021_07_14__19_46_26'}]
    print(modelEvaluation_dic)
    modelEvaluation_json=json.dumps(modelEvaluation_dic)
    return modelEvaluation_json


#通过模型名称，获取模型相关图片
@algorithm.route("/get_model_path", methods=["POST"])
def get_pic():

    m_name = str(request.json.get("m_name"))
    pic_name=request.json.get("pic_name", "")

    if m_name=='LSTM_2011_09_01':
        save_path = ''

    elif m_name=='GRU_2021_09_23':
        save_path = ''

    elif m_name == 'CNN_2019_03_21':
        save_path = 'address2021_07_14__19_46_26'

    img_url = ABSOLUTE_PATH + '\\resources\\temporary_file\\' + save_path+"\\"+pic_name+'.png'
    print(img_url)
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response




# 诊断记录查询，初始化
@algorithm.route("/initialization_select_diagnosis_log", methods=["POST"])
def initialization_select_diagnosis_log():
    page_size = int(request.json.get("pageSize"))
    #dic = DiagnosisService.initialization_select_diagnosis_log(page_size)


@algorithm.route("/select_diagnosis_log", methods=["POST"])
def select_diagnosis_log():
    page_number = int(request.json.get("pageNumber"))
    page_size = int(request.json.get("pageSize"))

    #DiagnosisService.select_diagnosis_log(page_number, page_size)





@algorithm.route('/getPic',methods=['GET', 'POST'])
def getPic():
    img_url = ABSOLUTE_PATH+'\\resources\\temporary_file\\'+request.args.get("pic_path", "")
    print(img_url)
    with open(img_url, 'rb') as f:
        pic = f.read()
    '''对读取的图片进行处理'''
    response = make_response(pic)
    response.headers['Content-Type'] = 'image/png'
    return response

















