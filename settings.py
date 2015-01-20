# This variable should never be imported 
# directly in any module always use as settings.LOG_CONFIG

import logging

# logging configurations
DEBUG_FORMAT = "%(levelname)s at %(asctime)s in function '%(funcName)s' in file \"%(pathname)s\" at line %(lineno)d: %(message)s"

LOG_CONFIG = {
              'version': 1,
              'formatters': {'debug': {'format': DEBUG_FORMAT}},
              'handlers': {
                            'console': {
                                         'class': 'logging.StreamHandler',
                                         'formatter': 'debug',
                                         'level': logging.DEBUG
                                       }
                         },
              'root': {
                       'handlers':['console'], 'level': 'DEBUG'
                      }
             }
