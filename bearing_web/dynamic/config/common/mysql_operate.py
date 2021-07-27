import pymysql
from dynamic.config.setting import MYSQL_HOST,MYSQL_PORT,MYSQL_USER, MYSQL_PASSWD, MYSQL_DB

class MysqlDb():

    def __init__(self, host, port, user, passwd, db):
        # 建立数据库连接
        self.conn = pymysql.connect(
            host=host,
            port=port,
            user=user,
            passwd=passwd,
            db=db,
            autocommit=True
        )
        # 通过 cursor() 创建游标对象，并让查询结果以字典格式输出

        self.cur = self.conn.cursor(cursor=pymysql.cursors.DictCursor)

    def __del__(self): # 对象资源被释放时触发，在对象即将被删除时的最后操作
        # 关闭游标
        self.cur.close()
        # 关闭数据库连接
        self.conn.close()

    def select_one(self, sql):
        """查询"""
        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql)
        # 使用 fetchone() 获取查询结果
        data = self.cur.fetchone()
        return data

    def select_one_value(self, sql , value:tuple):
        """查询"""
        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql,value)
        # 使用 fetchone() 获取查询结果
        data = self.cur.fetchone()
        return data

    def select_all(self, sql):
        """查询"""
        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql)
        # 使用 fetchall() 获取查询结果
        data = self.cur.fetchall()
        return data

    def select_all_value(self, sql,value:tuple):
        """查询"""
        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql,value)
        # 使用 fetchall() 获取查询结果
        data = self.cur.fetchall()
        return data


    def execute(self, sql):
        """更新/新增/删除"""

        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql)
        # 提交事务
        self.conn.commit()

    def execute_value(self, sql,property:tuple):
        """更新/新增/删除"""

        # 检查连接是否断开，如果断开就进行重连
        self.conn.ping(reconnect=True)
        # 使用 execute() 执行sql
        self.cur.execute(sql,property)
        # 提交事务
        self.conn.commit()




'''
        try:
            # 检查连接是否断开，如果断开就进行重连
            self.conn.ping(reconnect=True)
            # 使用 execute() 执行sql
            self.cur.execute(sql)
            # 提交事务
            self.conn.commit()
          
        except Exception as e:
            print("操作出现错误：{}".format(e))
            # 回滚所有更改
            self.conn.rollback()
        '''


db = MysqlDb(MYSQL_HOST,MYSQL_PORT,MYSQL_USER, MYSQL_PASSWD, MYSQL_DB)
