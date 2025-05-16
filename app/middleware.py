# app/middleware.py

from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin


EXEMPT_PATH_PREFIXES = [
    '/login',
    '/admin',
    '/static',
    '/api/login',
    '/api/token', 
    '/api/token/refresh', 
]

class LoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path_info

        # Redirecionar /admin sem barra para /admin/
        if path == '/admin':
            return redirect('/admin/')

        # Permitir caminhos isentos
        if any(path.startswith(prefix) for prefix in EXEMPT_PATH_PREFIXES):
            return self.get_response(request)

        # Se não autenticado, redireciona para login
        if not request.user.is_authenticated:
            return redirect('/login')

        return self.get_response(request)



class CsrfExemptForApi(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith('/api/') and request.method in ('POST', 'PUT', 'PATCH', 'DELETE'):
            setattr(request, '_dont_enforce_csrf_checks', True)

