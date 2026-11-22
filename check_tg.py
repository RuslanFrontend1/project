import os, sys
sys.path.insert(0, r'c:\Users\Default User.DESKTOP-UTOLC7H\Desktop\project\backend')
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
import django
django.setup()
from django.conf import settings

print('TOKEN:', repr(settings.TELEGRAM_BOT_TOKEN))
print('CHAT_ID:', repr(settings.TELEGRAM_CHAT_ID))
configured = bool(settings.TELEGRAM_BOT_TOKEN and settings.TELEGRAM_CHAT_ID)
print('CONFIGURED:', configured)

if configured:
    from store.views import notify_telegram
    result = notify_telegram("Тест бота VELVET & VOID — проверка соединения")
    print('RESULT:', result)
else:
    print('Токен или chat_id не заданы — бот не настроен.')
