from django.urls import path
from shoes_rest.views import api_list_shoes, api_show_shoes
urlpatterns = [
    path("shoes/", api_list_shoes, name="api_create_shoes"),
    path("shoes/<int:pk>/", api_show_shoes, name="api_show_shoes"),
    path("bins/<int:bin_vo_id>/shoes/", api_list_shoes, name="api_list_shoes"),
]