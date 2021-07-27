import os, sys,shutil
from dynamic.config.setting import SERVER_PORT,ABSOLUTE_PATH
from flask import Flask, request, jsonify
from dynamic.algorithm.controller.algorithm_controller import algorithm
from dynamic.user.controller.user_controller import user
from dynamic.predict.controller.predict_controller import predict
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(algorithm, url_prefix='/backend/algorithm')
app.register_blueprint(user, url_prefix='/backend/user')
app.register_blueprint(predict, url_prefix='/backend/predict')
app.config["JSON_AS_ASCII"] = False  # jsonify返回的中文正常显示
CORS(app, supports_credentials=True)

# 项目根路径
BASE_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BASE_PATH)  # 将项目根路径临时加入环境变量，程序退出后失效
#path_data ='E:\\qwe'
temporary_data = ABSOLUTE_PATH+"\\resources\\temporary_file"

@app.route('/', methods=['GET'])
def ping_pong():
    return jsonify('Hello World!')



if __name__ == '__main__':
    # 会删除resources\\temporary_file下的所有文件，测试时注释掉
    # initialization_app(temporary_data)
    # host为主机ip地址，port指定访问端口号，debug=True设置调试模式打开
    app.run(host="localhost", port=SERVER_PORT, debug=True)














'''
#python删除文件的方法 os.remove(path)path指的是文件的绝对路径,如：
# os.remove(r"E:\code\practice\data\1.py")#删除文件
# os.rmdir(r"E:\code\practice\data\2")#删除文件夹（只能删除空文件夹）
# shutil.rmtree(r"E:\code\practice\data\2")#删除文件夹
# path_data = "E:\code\practice\data"#

def initialization_app(temporary_data):
    for i in os.listdir(temporary_data) :# os.listdir(path_data)#返回一个列表，里面是当前目录下面的所有东西的相对路径
        file_data = temporary_data + "\\" + i#当前文件夹的下面的所有东西的绝对路径
        if os.path.isfile(file_data) == True:#os.path.isfile判断是否为文件,如果是文件,就删除.如果是文件夹.递归给del_file.
            os.remove(file_data)
        else:
            shutil.rmtree(file_data)
'''

