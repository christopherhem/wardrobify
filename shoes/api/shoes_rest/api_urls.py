from django.urls import path
from .api_views import api_list_shoes, api_detail_shoe
urlpatterns = [
    path('shoes/', api_list_shoes, name='api_create_shoes'),
    path('shoes/<int:shoe_id>/', api_detail_shoe, name='api_detail_shoe'),
    path('bins/<int:bin_id>/shoes/', api_list_shoes, name='api_list_shoes'),
]