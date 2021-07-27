class DiagnosisLog():
    def __init__(self):
        self.__data_time :str
        self.__d_name : str
        self.__m_name : str
        self.__result: str

    @property
    def data_time(self):
        return self.__data_time

    @data_time.setter
    def data_time(self, value):
        self.__data_time = value

    @property
    def d_name(self):
        return self.__d_name

    @d_name.setter
    def d_name(self, value):
        self.__d_name = value

    @property
    def m_name(self):
        return self.__m_name

    @m_name.setter
    def m_name(self, value):
        self.__m_name = value

    @property
    def result(self):
        return self.__result

    @result.setter
    def result(self, value):
        self.__result = value
