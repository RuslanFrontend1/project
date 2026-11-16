# VELVET & VOID

Магазин разделён на независимые части:

- `frontend/` — статический сайт на HTML, CSS и JavaScript, размещаемый на Netlify.
- `backend/` — Django REST API и PostgreSQL, размещаемые на Render.

Фронтенд вызывает Django API по адресу из `frontend/config.js`. Секреты хранятся только в локальном `backend/.env` или в настройках окружения Render.

## Локальный запуск на Windows

1. Установите Python 3.12.
2. В корне проекта создайте и активируйте окружение:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Установите серверные зависимости и подготовьте базу:

   ```powershell
   cd backend
   pip install -r requirements.txt
   Copy-Item .env.example .env
   python manage.py migrate
   python manage.py seed_products
   python manage.py createsuperuser
   ```

   Если `DATABASE_URL` пуст, для локальной разработки используется SQLite. На Render обязательно укажите URL PostgreSQL.

4. В первом терминале, из папки `backend`, запустите API:

   ```powershell
   python manage.py runserver 8000
   ```

5. Во втором терминале, из корня проекта, запустите статику:

   ```powershell
   python -m http.server 5500 --directory frontend
   ```

6. Для локального API временно задайте в `frontend/config.js`:

   ```js
   apiBaseUrl: "http://127.0.0.1:8000",
   ```

   После локальной проверки верните Render URL. `FRONTEND_ORIGINS` в `backend/.env` должен включать `http://127.0.0.1:5500`.

Для демонстрационного режима можно открыть сайт с `?demo`; он не отправляет реальные заказы в API.

## Развёртывание

### PostgreSQL и Django на Render

1. Создайте PostgreSQL database в Render и скопируйте **Internal Database URL**.
2. Создайте Web Service из этого репозитория по `render.yaml`, указав Render URL базы в переменной `DATABASE_URL`. Текущий API-адрес: `https://valvet-and-void.onrender.com`; если Render назначит другой адрес, обновите `frontend/config.js`.
3. Добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в переменные окружения Render, если нужны уведомления. Не добавляйте их во фронтенд.
4. При первом запуске сервис выполнит миграции и заполнит пустой каталог командой `seed_products`.
5. Создайте администратора командой Render Shell: `python manage.py createsuperuser`.
6. Проверьте `https://<ваш-api>.onrender.com/api/health` — ответ должен содержать `"ok": true` и `"database": "ok"`.

`render.yaml` не создаёт платную базу автоматически: тариф PostgreSQL выберите в Render отдельно. У бесплатных тарифов могут быть ограничения хранения, времени работы и доступности.

### Фронтенд на Netlify

`netlify.toml` публикует только папку `frontend/`. После создания Render API:

1. Проверьте `apiBaseUrl` в `frontend/config.js`.
2. Разверните корень репозитория на Netlify.
3. Убедитесь, что адрес сайта совпадает с `FRONTEND_ORIGINS` у Render. Если адрес Netlify отличается, обновите переменную и перезапустите Render-сервис.

## Основные API-маршруты

- `GET /api/config`, `GET /api/health`
- `GET /api/products`, `POST /api/products`, `PATCH/DELETE /api/products/<id>`
- `POST /api/orders`; `GET /api/admin/orders`, `GET /api/admin/stats`
- `POST /api/bookings`, `GET /api/admin/bookings`
- `GET/POST /api/reviews`, `GET /api/products/<id>/reviews`
- `POST /api/newsletter`
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/refresh`, `GET /api/auth/me`

Для административных запросов требуется JWT пользователя с флагом Django `is_staff` или `is_superuser`. Django Admin доступен по `/admin/`.

Оплата в оформлении пока демонстрационная: реального списания денег нет.

## Проверки

Из папки `backend`:

```powershell
python manage.py check
python manage.py test
```

Из корня проекта:

```powershell
node --check frontend/app.js
node --check frontend/config.js
```
