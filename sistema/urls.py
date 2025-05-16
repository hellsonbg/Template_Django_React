#sistema/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect

def redirect_admin(request):
    if not request.path.endswith('/'):
        return HttpResponseRedirect(request.path + '/')
    return HttpResponseRedirect('/admin/login/')

urlpatterns = [
    path('admin', redirect_admin),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),     
    path('', include('app.urls')),        
]


