import os, sys
sys.path.insert(0, r'c:\Users\Default User.DESKTOP-UTOLC7H\Desktop\project\backend')
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
import django
django.setup()
from store.models import User

email = 'thexzeditorofficial@gmail.com'
password = 'B20101204R'

user, created = User.objects.get_or_create(email=email)
user.set_password(password)
user.is_staff = True
user.is_superuser = True
user.is_active = True
if created:
    user.display_name = 'Admin'
user.save()
print('OK — created' if created else 'OK — updated')
print('Email:', user.email)
print('is_superuser:', user.is_superuser)
