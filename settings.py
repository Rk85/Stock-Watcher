import logging

# logging configurations
DEBUG_FORMAT = "%(levelname)s at %(asctime)s in function '%(funcName)s' in"
DEBUG_FORMAT = DEBUG_FORMAT + "file \"%(pathname)s\" at line "
DEBUG_FORMAT = DEBUG_FORMAT + "%(lineno)d: %(message)s"

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
        'handlers': ['console'], 'level': 'DEBUG'
    }
}
