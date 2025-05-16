#app/urls.py
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView


urlpatterns = [
    # Login deve estar acessível mesmo sem autenticação
    re_path(r'^login/?$', TemplateView.as_view(template_name="index.html")),

    # Todas as outras rotas caem na SPA
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]
