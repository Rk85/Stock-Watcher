from jinja2 import (
    BaseLoader,
    TemplateNotFound
)
import os
import logging

logger = logging.getLogger(__name__)


class MyTemplateLoader(BaseLoader):
    '''
        Description : Customized class to the templates through jinja

    '''

    def __init__(self, template_folder):
        '''
            Description : Init function to initialize the template loader class

        '''
        self.template_folder = template_folder

    def get_source(self, environment, template_name):
        '''
            Description : Returns the template details to the jinja environment

            input_param : environment - details of the jinja enviroment
            input_type : dict

            input_param : template_name - Name of the template to be rendered
            input_type : string

            out_param : source - template source
            out_type : string

            out_param : path - path of the template folder
            out_type : string

            out_param : lambda - function to check whether the template
                            should be read again not. False-changed,
                            True-not changed
            out_type : function object

        '''
        path = os.path.join(self.template_folder, template_name)
        if not os.path.exists(path):
            raise TemplateNotFound(template_name)
        fd = open(path, "r")
        source = "\r\n".join(fd.readlines())
        return source, path, lambda: False
