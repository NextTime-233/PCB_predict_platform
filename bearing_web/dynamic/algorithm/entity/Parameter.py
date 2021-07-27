class Parameter():
    def __init__(self):
        self.parameter_name:str
        self.parameter_type:str
        self.data_name:str
        self.signal_length:int
        self.signal_number:int
        self.normal:bool
        self.batch_size:int
        self.epochs:int
        self.num_classes: int
    @property
    def parameter_name(self):
        return self.__parameter_name

    @parameter_name.setter
    def parameter_name(self, value):
        self.__parameter_name = value

    @property
    def parameter_type(self):
        return self.__parameter_type

    @parameter_type.setter
    def parameter_type(self, value):
        self.__parameter_type = value

    @property
    def data_name(self):
        return self.__data_name

    @data_name.setter
    def data_name(self, value):
        self.__data_name = value

    @property
    def signal_length(self):
        return self.__signal_length

    @signal_length.setter
    def signal_length(self, value):
        self.__signal_length = value

    @property
    def signal_number(self):
        return self.__signal_number

    @signal_number.setter
    def signal_number(self, value):
        self.__signal_number = value

    @property
    def normal(self):
        return self.__normal

    @normal.setter
    def normal(self, value):
        self.__normal = value

    @property
    def batch_size(self):
        return self.__batch_size

    @batch_size.setter
    def batch_size(self, value):
        self.__batch_size = value

    @property
    def epochs(self):
        return self.__epochs

    @epochs.setter
    def epochs(self, value):
        self.__epochs = value

    @property
    def num_classes(self):
        return self.__num_classes

    @num_classes.setter
    def num_classes(self, value):
        self.__num_classes = value

