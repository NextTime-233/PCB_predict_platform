class ModelEvaluation():
    def __init__(self):
        self.__m_name ="NULL"
        self.__loss : float
        self.__accuracy : float
        self.__precision : float
        self.__recall :float
        self.__f1_meansure : float
        self.__save_path : str

    @property
    def m_name(self):
        return self.__m_name

    @m_name.setter
    def m_name(self, value):
        self.__m_name = value

    @property
    def loss(self):
        return self.__loss

    @loss.setter
    def loss(self, value):
        self.__loss = value

    @property
    def accuracy(self):
        return self.__accuracy

    @accuracy.setter
    def accuracy(self, value):
        self.__accuracy = value

    @property
    def precision(self):
        return self.__precision

    @precision.setter
    def precision(self, value):
        self.__precision = value

    @property
    def recall(self):
        return self.__recall

    @recall.setter
    def recall(self, value):
        self.__recall = value

    @property
    def f1_meansure(self):
        return self.__f1_meansure

    @f1_meansure.setter
    def f1_meansure(self, value):
        self.__f1_meansure = value


    @property
    def save_path(self):
        return self.__save_path

    @save_path.setter
    def save_path(self, value):
        self.__save_path = value

