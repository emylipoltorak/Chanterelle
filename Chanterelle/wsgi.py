"""
WSGI config for Chanterelle project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
"""

import newrelic.agent
newrelic.agent.initialize('/../newrelic.ini')
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Chanterelle.settings")

application = get_wsgi_application()
application = newrelic.agent.wsgi_application()(application)
