(() => {
  "use strict";

  const money = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
  const FREE_SHIPPING_THRESHOLD=20000,COURIER_SHIPPING=300,MAX_CART_QUANTITY=20;
  const cartLimitCopy={ru:"Максимум 20 единиц одного размера.",en:"Maximum 20 units per size.",kg:"Бир өлчөмдөн эң көп 20 даана.",kz:"Бір өлшемнен ең көбі 20 дана."};
  const shippingCopy={
    ru:{remaining:amount=>`Добавьте ещё ${amount} сом — и доставка будет бесплатной.`,unlocked:"Курьерская доставка бесплатна!",courier:"Курьер Бишкек · 300 сом",courierFree:"Курьер Бишкек · бесплатно",free:"Бесплатно"},
    en:{remaining:amount=>`Add ${amount} KGS more for free delivery.`,unlocked:"Free courier delivery unlocked!",courier:"Bishkek courier · 300 KGS",courierFree:"Bishkek courier · free",free:"Free"},
    kg:{remaining:amount=>`Дагы ${amount} сом кошуңуз — жеткирүү акысыз болот.`,unlocked:"Курьердик жеткирүү акысыз!",courier:"Бишкек боюнча курьер · 300 сом",courierFree:"Бишкек боюнча курьер · акысыз",free:"Акысыз"},
    kz:{remaining:amount=>`Тағы ${amount} сом қосыңыз — жеткізу тегін болады.`,unlocked:"Курьерлік жеткізу тегін!",courier:"Бішкек курьері · 300 сом",courierFree:"Бішкек курьері · тегін",free:"Тегін"}
  };
  const translations = {
    ru: {
      announcement:"Новая коллекция · Осень / Зима 2025",announcementRight:"Бесплатная доставка от 20 000 сом",navCollection:"Коллекция",navStory:"Философия",navAtelier:"Ателье",language:"Язык",heroEyebrow:"НОВАЯ ГЛАВА · 01 / 25",heroTitle:"Одежда,<br>которая <em>чувствует.</em>",heroCopy:"Для тихой силы. Для смелых пауз.<br>Для тех, кто выбирает свой собственный мир.",exploreCollection:"Открыть коллекцию",collectionEyebrow:"СЕЗОННАЯ ПОДБОРКА · 2025",collectionTitle:"Носить <em>чувства.</em>",collectionNote:"Вещи с характером. Созданы медленно,<br>чтобы оставаться с вами надолго.",allProducts:"Все изделия",outerwear:"Верхняя одежда",suits:"Костюмы",knitwear:"Трикотаж",searchPlaceholder:"Поиск по коллекции",sort:"Сортировка",favoritesOnly:"Избранное",emptyCatalog:"Ничего не найдено. Попробуйте изменить запрос.",resetFilters:"Сбросить фильтры",craftedNote:"СОЗДАНО В БИШКЕКЕ · ВЫПУСК ОГРАНИЧЕН",manifestoEyebrow:"НАША ФИЛОСОФИЯ",manifestoTitle:"Меньше вещей.<br><em>Больше себя.</em>",manifestoText:"Мы верим в одежду, у которой есть свой ритм. В тактильные ткани, честные силуэты и детали, которые открываются не сразу. Каждая вещь создана в Бишкеке небольшими тиражами — с уважением к ремеслу и к тому, кто её носит.",meetAtelier:"Познакомиться с ателье",atelierEyebrow:"НАША ДВЕРЬ ОТКРЫТА",atelierTitle:"Встретимся<br><em>в ателье.</em>",atelierText:"Примерьте коллекцию, найдите свою посадку или просто загляните на чашку чая. Мы будем рады.",addressTitle:"Бишкек, Кыргызстан",bookVisit:"Записаться на визит",yourName:"Ваше имя",phone:"Номер телефона",visitDate:"Дата",visitTime:"Время",confirmVisit:"Подтвердить визит",visitNote:"Мы напишем вам, чтобы подтвердить запись.",newsletterEyebrow:"ПИСЬМА ИЗ НАШЕГО МИРА",newsletterTitle:"Тихие новости.<br><em>Никакого шума.</em>",newsletterLabel:"Редкие письма о новых историях и специальных выпусках.",emailPlaceholder:"Ваш email",privacyNote:"Подписываясь, вы соглашаетесь получать письма от V&V. Отписаться можно в любой момент.",footerLine:"Одежда, которая чувствует. Сделано с намерением в Бишкеке.",footerMade:"СДЕЛАНО В КЫРГЫЗСТАНЕ",adminLogin:"Вход для команды",yourSelection:"ВАШ ВЫБОР",yourCart:"Корзина",subtotal:"Промежуточный итог",shippingNote:"Доставка рассчитывается при оформлении заказа.",checkout:"Перейти к оформлению",savedForLater:"СОХРАНЕНО ДЛЯ ВАС",yourWishlist:"Избранное",yourAccount:"ВАШ АККАУНТ",welcomeBack:"Рады видеть.",authIntro:"Войдите, чтобы сохранить любимые вещи и историю заказов.",login:"Войти",register:"Создать аккаунт",emailAddress:"Email",password:"Пароль",authDemoNote:"Демо-аккаунт администратора: admin@velvet.com · пароль любой.",secureCheckout:"БЕЗОПАСНОЕ ОФОРМЛЕНИЕ",checkoutTitle:"Ваш заказ.",deliveryAddress:"Адрес доставки в Кыргызстане",deliveryMethod:"Доставка",courier:"Курьер Бишкек · 300 сом",pickup:"Самовывоз из ателье · бесплатно",paymentMethod:"Способ оплаты",stripeDemo:"Демо-оплата картой",localPayments:"Кыргызстан · мобильный кошелёк",cashTerminal:"Наличные / терминал",cashOnDelivery:"Оплата при получении",placeOrder:"Подтвердить заказ",paymentDisclaimer:"Демонстрационная оплата: реальные платежи не проводятся.",orderSummary:"Ваш заказ",shipping:"Доставка",total:"Итого",adminSpace:"ПАНЕЛЬ УПРАВЛЕНИЯ",adminTitle:"Пространство V&V.",inventory:"Каталог",addProduct:"Добавить изделие",productName:"Название",productDescription:"Описание",price:"Цена (сом)",category:"Категория",imageUrl:"URL изображения",availableSizes:"Размеры (через запятую)",saveProduct:"Сохранить изделие",logout:"Выйти из аккаунта",orderConfirmed:"ЗАКАЗ ПОДТВЕРЖДЁН",thankYou:"Спасибо за выбор.",continueShopping:"Продолжить покупки",printReceipt:"Распечатать чек",loading:"ОТКРЫВАЕМ ВАШ МИР",namePlaceholder:"Алина",emptyCart:"Корзина пока пуста.",emptyWishlist:"Здесь пока тихо. Сохраните то, что вам близко.",addToCart:"Добавить в корзину",quickAdd:"Быстрый просмотр",remove:"Удалить",reviewTitle:"Отзывы",writeReview:"Оставить отзыв",reviewPlaceholder:"Поделитесь впечатлением об изделии…",submitReview:"Опубликовать отзыв",noReviews:"Пока нет отзывов. Станьте первым.",rating:"Оценка",allCategories:"Все категории",units:"изделий",orderId:"Номер заказа",payment:"Оплата",orderThanks:"Ваш заказ принят. Мы свяжемся с вами для уточнения деталей.",memberSince:"Аккаунт создан",viewOrders:"Демо-заказов на сумму",productsMetric:"Изделий в каталоге",salesMetric:"Демо-заказов",ratingLabel:"рейтинг",sale:"БЕСТСЕЛЛЕР",new:"НОВИНКА",visitSuccess:"Спасибо! Мы свяжемся с вами, чтобы подтвердить визит.",newsletterSuccess:"Вы подписаны. До скорой встречи в письмах.",addedToCart:"Изделие добавлено в корзину.",removedFromCart:"Изделие удалено из корзины.",addedToWishlist:"Добавлено в избранное.",removedFromWishlist:"Удалено из избранного.",productSaved:"Изделие добавлено в каталог.",productDeleted:"Изделие удалено.",reviewSaved:"Спасибо за ваш отзыв.",fillRequired:"Пожалуйста, заполните все обязательные поля.",loginSuccess:"Вы вошли в аккаунт.",registerSuccess:"Аккаунт создан. Добро пожаловать!",logoutSuccess:"Вы вышли из аккаунта.",sortNewest:"Сначала новинки",sortPriceLow:"Сначала дешевле",sortPriceHigh:"Сначала дороже",sortPopular:"Сначала популярные",quickView:"Подробнее",chooseSize:"Выберите размер",emptySearch:"Нет совпадений по вашему запросу.",signedInAs:"Вы вошли как",adminAccess:"Доступ администратора активирован.",invalidImage:"Для изображения укажите адрес HTTPS.",order:"Заказ",days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]
    },
    en: {
      announcement:"New collection · Autumn / Winter 2025",announcementRight:"Complimentary delivery over 20,000 KGS",navCollection:"Collection",navStory:"Our philosophy",navAtelier:"Atelier",language:"Language",heroEyebrow:"A NEW CHAPTER · 01 / 25",heroTitle:"Clothing<br>that <em>feels.</em>",heroCopy:"For quiet strength. For brave pauses.<br>For those who choose their own world.",exploreCollection:"Explore the collection",collectionEyebrow:"SEASONAL EDIT · 2025",collectionTitle:"Wear your <em>feelings.</em>",collectionNote:"Pieces with character. Made slowly<br>to stay with you for a long time.",allProducts:"All pieces",outerwear:"Outerwear",suits:"Suits",knitwear:"Knitwear",searchPlaceholder:"Search the collection",sort:"Sort by",favoritesOnly:"Favorites",emptyCatalog:"Nothing found. Try changing your search.",resetFilters:"Reset filters",craftedNote:"MADE IN BISHKEK · LIMITED RELEASE",manifestoEyebrow:"OUR PHILOSOPHY",manifestoTitle:"Own less.<br><em>Be more.</em>",manifestoText:"We believe in clothing with its own rhythm. Tactile fabrics, honest silhouettes and details that reveal themselves over time. Each piece is made in Bishkek in small runs—with respect for the craft and the person who wears it.",meetAtelier:"Meet the atelier",atelierEyebrow:"OUR DOOR IS OPEN",atelierTitle:"Meet us<br><em>at the atelier.</em>",atelierText:"Try the collection, find your fit, or simply drop by for a cup of tea. We'd love to see you.",addressTitle:"Bishkek, Kyrgyzstan",bookVisit:"Book an atelier visit",yourName:"Your name",phone:"Phone number",visitDate:"Date",visitTime:"Time",confirmVisit:"Confirm your visit",visitNote:"We'll message you to confirm your appointment.",newsletterEyebrow:"LETTERS FROM OUR WORLD",newsletterTitle:"Quiet news.<br><em>No noise.</em>",newsletterLabel:"Occasional letters about new stories and limited releases.",emailPlaceholder:"Your email",privacyNote:"By subscribing, you agree to receive V&V emails. Unsubscribe at any time.",footerLine:"Clothing that feels. Made with intention in Bishkek.",footerMade:"MADE IN KYRGYZSTAN",adminLogin:"Team sign in",yourSelection:"YOUR SELECTION",yourCart:"Your bag",subtotal:"Subtotal",shippingNote:"Shipping is calculated at checkout.",checkout:"Proceed to checkout",savedForLater:"SAVED FOR YOU",yourWishlist:"Wishlist",yourAccount:"YOUR ACCOUNT",welcomeBack:"Welcome back.",authIntro:"Sign in to save your favorite pieces and order history.",login:"Sign in",register:"Create account",emailAddress:"Email",password:"Password",authDemoNote:"Demo admin account: admin@velvet.com · any password.",secureCheckout:"SECURE CHECKOUT",checkoutTitle:"Your order.",deliveryAddress:"Delivery address in Kyrgyzstan",deliveryMethod:"Delivery",courier:"Bishkek courier · 300 KGS",pickup:"Atelier pickup · free",paymentMethod:"Payment method",stripeDemo:"Demo card payment",localPayments:"Kyrgyzstan · mobile wallet",cashTerminal:"Cash / terminal",cashOnDelivery:"Pay on delivery",placeOrder:"Place your order",paymentDisclaimer:"Demo checkout only: no real payments are processed.",orderSummary:"Order summary",shipping:"Shipping",total:"Total",adminSpace:"ADMINISTRATION",adminTitle:"The V&V space.",inventory:"Inventory",addProduct:"Add a piece",productName:"Name",productDescription:"Description",price:"Price (KGS)",category:"Category",imageUrl:"Image URL",availableSizes:"Sizes (comma separated)",saveProduct:"Save piece",logout:"Sign out",orderConfirmed:"ORDER CONFIRMED",thankYou:"Thank you for choosing us.",continueShopping:"Continue shopping",printReceipt:"Print receipt",loading:"ENTERING YOUR WORLD",namePlaceholder:"Your name",emptyCart:"Your bag is waiting for its first piece.",emptyWishlist:"A quiet space. Save what speaks to you.",addToCart:"Add to bag",quickAdd:"Quick view",remove:"Remove",reviewTitle:"Reviews",writeReview:"Leave a review",reviewPlaceholder:"Share what you think of this piece…",submitReview:"Post review",noReviews:"No reviews yet. Be the first.",rating:"Rating",allCategories:"All categories",units:"pieces",orderId:"Order number",payment:"Payment",orderThanks:"Your order is in. We'll contact you to confirm the details.",memberSince:"Member since",viewOrders:"Demo order value",productsMetric:"Pieces in collection",salesMetric:"Demo orders",ratingLabel:"rating",sale:"BESTSELLER",new:"NEW",visitSuccess:"Thank you! We'll be in touch to confirm your visit.",newsletterSuccess:"You're subscribed. See you in your inbox.",addedToCart:"Added to your bag.",removedFromCart:"Piece removed from your bag.",addedToWishlist:"Added to your wishlist.",removedFromWishlist:"Removed from your wishlist.",productSaved:"Piece added to the collection.",productDeleted:"Piece removed.",reviewSaved:"Thank you for your review.",fillRequired:"Please complete all required fields.",loginSuccess:"You're signed in.",registerSuccess:"Your account is ready. Welcome!",logoutSuccess:"You've signed out.",sortNewest:"Newest first",sortPriceLow:"Price: low to high",sortPriceHigh:"Price: high to low",sortPopular:"Most popular",quickView:"Details",chooseSize:"Choose a size",emptySearch:"No matches for your search.",signedInAs:"Signed in as",adminAccess:"Admin access activated.",invalidImage:"Please use an HTTPS image address.",order:"Order",days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    },
    kg: {
      announcement:"Жаңы коллекция · Күз / Кыш 2025",announcementRight:"20 000 сомдон жогору акысыз жеткирүү",navCollection:"Коллекция",navStory:"Философия",navAtelier:"Ателье",language:"Тил",heroEyebrow:"ЖАҢЫ БӨЛҮМ · 01 / 25",heroTitle:"Сезимди<br><em>туюнткан</em> кийим.",heroCopy:"Жумшак күч үчүн. Кайраттуу тыныгуулар үчүн.<br>Өз дүйнөсүн тандагандар үчүн.",exploreCollection:"Коллекцияны көрүү",collectionEyebrow:"СЕЗОНДУК ТАНДОО · 2025",collectionTitle:"Сезимиңди <em>кий.</em>",collectionNote:"Мүнөзү бар кийимдер. Узакка кийилиши<br>үчүн шашпай жаралган.",allProducts:"Бардык буюмдар",outerwear:"Сырткы кийим",suits:"Костюмдар",knitwear:"Трикотаж",searchPlaceholder:"Коллекциядан издөө",sort:"Иреттөө",favoritesOnly:"Тандалгандар",emptyCatalog:"Эч нерсе табылган жок. Издөөңүздү өзгөртүңүз.",resetFilters:"Чыпкаларды тазалоо",craftedNote:"БИШКЕКТЕ ЖАСАЛГАН · ЧЕКТЕЛГЕН ТИРАЖ",manifestoEyebrow:"БИЗДИН ФИЛОСОФИЯ",manifestoTitle:"Азыраак буюм.<br><em>Көбүрөөк өзүң.</em>",manifestoText:"Биз өз ыргагы бар кийимге ишенебиз. Сапаттуу кездемелер, жөнөкөй силуэттер жана убакыт өткөн сайын ачылган деталдар. Ар бир буюм Бишкекте аз санда, өнөргө жана аны кийген адамга урмат менен жасалат.",meetAtelier:"Ателье менен таанышуу",atelierEyebrow:"ЭСИГИБИЗ АЧЫК",atelierTitle:"Ательеде<br><em>жолугалы.</em>",atelierText:"Коллекцияны кийип көрүңүз, өзүңүзгө ылайыктуусун табыңыз же чай ичип кетиңиз. Сизди күтөбүз.",addressTitle:"Бишкек, Кыргызстан",bookVisit:"Визитке жазылуу",yourName:"Атыңыз",phone:"Телефон номери",visitDate:"Күнү",visitTime:"Убактысы",confirmVisit:"Визитти ырастоо",visitNote:"Жазылууну ырастоо үчүн сизге кабар беребиз.",newsletterEyebrow:"БИЗДИН ДҮЙНӨДӨН КАТТАР",newsletterTitle:"Тынч жаңылыктар.<br><em>Ашыкча ызы-чуу жок.</em>",newsletterLabel:"Жаңы окуялар жана чектелген коллекциялар тууралуу сейрек каттар.",emailPlaceholder:"Электрондук почтаңыз",privacyNote:"Жазылуу менен V&V каттарын алууга макул болосуз. Каалаган убакта токтотсоңуз болот.",footerLine:"Сезимди туюнткан кийим. Бишкекте ниет менен жасалган.",footerMade:"КЫРГЫЗСТАНДА ЖАСАЛГАН",adminLogin:"Команда үчүн кирүү",yourSelection:"СИЗДИН ТАНДООҢУЗ",yourCart:"Себет",subtotal:"Аралык сумма",shippingNote:"Жеткирүү акысы төлөмдө эсептелет.",checkout:"Буйрутмага өтүү",savedForLater:"СИЗ ҮЧҮН САКТАЛДЫ",yourWishlist:"Тандалгандар",yourAccount:"АККАУНТУҢУЗ",welcomeBack:"Кош келиңиз.",authIntro:"Жактырган буюмдарыңызды жана буйрутмаларыңызды сактоо үчүн кириңиз.",login:"Кирүү",register:"Аккаунт түзүү",emailAddress:"Электрондук почта",password:"Сырсөз",authDemoNote:"Демо админ: admin@velvet.com · сырсөз каалаган.",secureCheckout:"КООПСУЗ ТӨЛӨМ",checkoutTitle:"Сиздин буйрутма.",deliveryAddress:"Кыргызстандагы жеткирүү дареги",deliveryMethod:"Жеткирүү",courier:"Бишкек курьери · 300 сом",pickup:"Ательеден алуу · акысыз",paymentMethod:"Төлөм ыкмасы",stripeDemo:"Карта менен демо төлөм",localPayments:"Кыргызстан · мобилдик капчык",cashTerminal:"Накталай / терминал",cashOnDelivery:"Алганда төлөө",placeOrder:"Буйрутманы ырастоо",paymentDisclaimer:"Демо төлөм: чыныгы акча алынбайт.",orderSummary:"Буйрутмаңыз",shipping:"Жеткирүү",total:"Жалпысы",adminSpace:"БАШКАРУУ ПАНЕЛИ",adminTitle:"V&V мейкиндиги.",inventory:"Каталог",addProduct:"Буюм кошуу",productName:"Аталышы",productDescription:"Сүрөттөмө",price:"Баасы (сом)",category:"Категория",imageUrl:"Сүрөттүн URL дареги",availableSizes:"Өлчөмдөр (үтүр менен)",saveProduct:"Буюмду сактоо",logout:"Аккаунттан чыгуу",orderConfirmed:"БУЙРУТМА ЫРАСТАЛДЫ",thankYou:"Тандаганыңыз үчүн рахмат.",continueShopping:"Сооданы улантуу",printReceipt:"Чекти басып чыгаруу",loading:"ДҮЙНӨҢҮЗ АЧЫЛУУДА",namePlaceholder:"Атыңыз",emptyCart:"Себетиңиз азырынча бош.",emptyWishlist:"Бул жерде азырынча бош. Жакканын сактап коюңуз.",addToCart:"Себетке кошуу",quickAdd:"Тез көрүү",remove:"Өчүрүү",reviewTitle:"Пикирлер",writeReview:"Пикир калтыруу",reviewPlaceholder:"Бул буюм тууралуу оюңузду жазыңыз…",submitReview:"Пикирди жарыялоо",noReviews:"Азырынча пикир жок. Биринчи болуңуз.",rating:"Баалоо",allCategories:"Бардык категориялар",units:"буюм",orderId:"Буйрутма номери",payment:"Төлөм",orderThanks:"Буйрутмаңыз кабыл алынды. Маалыматты тактоо үчүн байланышабыз.",memberSince:"Аккаунт ачылган",viewOrders:"Демо буйрутмалардын суммасы",productsMetric:"Каталогдогу буюмдар",salesMetric:"Демо буйрутмалар",ratingLabel:"баа",sale:"СУРОО-ТАЛАПТА",new:"ЖАҢЫ",visitSuccess:"Рахмат! Визитти ырастоо үчүн байланышабыз.",newsletterSuccess:"Жазылдыңыз. Жакында кат жазабыз.",addedToCart:"Буюм себетке кошулду.",removedFromCart:"Буюм себеттен алынды.",addedToWishlist:"Тандалгандарга кошулду.",removedFromWishlist:"Тандалгандардан алынды.",productSaved:"Буюм каталогго кошулду.",productDeleted:"Буюм өчүрүлдү.",reviewSaved:"Пикириңиз үчүн рахмат.",fillRequired:"Бардык милдеттүү талааларды толтуруңуз.",loginSuccess:"Аккаунтуңузга кирдиңиз.",registerSuccess:"Аккаунтуңуз түзүлдү. Кош келиңиз!",logoutSuccess:"Аккаунттан чыктыңыз.",sortNewest:"Жаңылары биринчи",sortPriceLow:"Арзаны биринчи",sortPriceHigh:"Кымбаты биринчи",sortPopular:"Популярдуулары биринчи",quickView:"Толук маалымат",chooseSize:"Өлчөмдү тандаңыз",emptySearch:"Издөөдө дал келген нерсе жок.",signedInAs:"Кирген аккаунт",adminAccess:"Администратор мүмкүнчүлүгү ачылды.",invalidImage:"Сүрөт үчүн HTTPS дарегин колдонуңуз.",order:"Буйрутма",days:["Жш","Дш","Шш","Шр","Бш","Жм","Иш"]
    },
    kz: {
      announcement:"Жаңа топтама · Күз / Қыс 2025",announcementRight:"20 000 сомнан жоғары тегін жеткізу",navCollection:"Топтама",navStory:"Философия",navAtelier:"Ателье",language:"Тіл",heroEyebrow:"ЖАҢА ТАРАУ · 01 / 25",heroTitle:"Сезімді<br><em>сезінетін</em> киім.",heroCopy:"Тыныш күш үшін. Батыл үзілістер үшін.<br>Өз әлемін таңдайтындарға арналған.",exploreCollection:"Топтаманы ашу",collectionEyebrow:"МАУСЫМДЫҚ ТАҢДАУ · 2025",collectionTitle:"Сезімді <em>киіңіз.</em>",collectionNote:"Мінезі бар бұйымдар. Ұзақ уақыт кию үшін<br>асықпай жасалған.",allProducts:"Барлық бұйым",outerwear:"Сырт киім",suits:"Костюмдер",knitwear:"Трикотаж",searchPlaceholder:"Топтамадан іздеу",sort:"Сұрыптау",favoritesOnly:"Таңдаулылар",emptyCatalog:"Ештеңе табылмады. Іздеуді өзгертіп көріңіз.",resetFilters:"Сүзгілерді тазалау",craftedNote:"БІШКЕКТЕ ЖАСАЛҒАН · ШЕКТЕУЛІ ТИРАЖ",manifestoEyebrow:"БІЗДІҢ ФИЛОСОФИЯ",manifestoTitle:"Аз бұйым.<br><em>Көбірек өзің.</em>",manifestoText:"Біз өз ырғағы бар киімге сенеміз. Сезімге жағымды мата, шынайы пішін және уақыт өте ашылатын бөлшектер. Әр бұйым Бішкекте аз көлемде, шеберлікке және оны киетін адамға құрметпен жасалады.",meetAtelier:"Ательемен танысу",atelierEyebrow:"ЕСІГІМІЗ АШЫҚ",atelierTitle:"Ательеде<br><em>кездесейік.</em>",atelierText:"Топтаманы киіп көріңіз, өзіңізге сай үлгіні табыңыз немесе шай ішуге келіңіз. Қуана қарсы аламыз.",addressTitle:"Бішкек, Қырғызстан",bookVisit:"Кездесуге жазылу",yourName:"Атыңыз",phone:"Телефон нөмірі",visitDate:"Күні",visitTime:"Уақыты",confirmVisit:"Кездесуді растау",visitNote:"Жазылуды растау үшін сізге хабарласамыз.",newsletterEyebrow:"БІЗДІҢ ӘЛЕМНЕН ХАТТАР",newsletterTitle:"Тыныш жаңалықтар.<br><em>Артық шу жоқ.</em>",newsletterLabel:"Жаңа оқиғалар мен шектеулі топтамалар туралы сирек хаттар.",emailPlaceholder:"Электрондық поштаңыз",privacyNote:"Жазылу арқылы V&V хаттарын алуға келісесіз. Кез келген уақытта тоқтатуға болады.",footerLine:"Сезімді киім. Бішкекте ықыласпен жасалған.",footerMade:"ҚЫРҒЫЗСТАНДА ЖАСАЛҒАН",adminLogin:"Командаға кіру",yourSelection:"СІЗДІҢ ТАҢДАУЫҢЫЗ",yourCart:"Себет",subtotal:"Аралық сома",shippingNote:"Жеткізу ақысы төлем кезінде есептеледі.",checkout:"Тапсырысты рәсімдеу",savedForLater:"СІЗ ҮШІН САҚТАЛДЫ",yourWishlist:"Таңдаулылар",yourAccount:"АККАУНТЫҢЫЗ",welcomeBack:"Қош келдіңіз.",authIntro:"Ұнаған бұйымдар мен тапсырыс тарихын сақтау үшін кіріңіз.",login:"Кіру",register:"Аккаунт ашу",emailAddress:"Электрондық пошта",password:"Құпиясөз",authDemoNote:"Демо әкімші: admin@velvet.com · кез келген құпиясөз.",secureCheckout:"ҚАУІПСІЗ РӘСІМДЕУ",checkoutTitle:"Тапсырысыңыз.",deliveryAddress:"Қырғызстандағы жеткізу мекенжайы",deliveryMethod:"Жеткізу",courier:"Бішкек курьері · 300 сом",pickup:"Ательеден алу · тегін",paymentMethod:"Төлем тәсілі",stripeDemo:"Картамен демо төлем",localPayments:"Қырғызстан · мобильді әмиян",cashTerminal:"Қолма-қол / терминал",cashOnDelivery:"Алып жатқанда төлеу",placeOrder:"Тапсырысты растау",paymentDisclaimer:"Демо төлем: нақты ақша алынбайды.",orderSummary:"Тапсырысыңыз",shipping:"Жеткізу",total:"Барлығы",adminSpace:"БАСҚАРУ ПАНЕЛІ",adminTitle:"V&V кеңістігі.",inventory:"Каталог",addProduct:"Бұйым қосу",productName:"Атауы",productDescription:"Сипаттамасы",price:"Бағасы (сом)",category:"Санат",imageUrl:"Сурет URL мекенжайы",availableSizes:"Өлшемдер (үтірмен)",saveProduct:"Бұйымды сақтау",logout:"Аккаунттан шығу",orderConfirmed:"ТАПСЫРЫС РАСТАЛДЫ",thankYou:"Таңдауыңызға рақмет.",continueShopping:"Сауданы жалғастыру",printReceipt:"Түбіртекті басып шығару",loading:"ӘЛЕМІҢІЗ АШЫЛУДА",namePlaceholder:"Атыңыз",emptyCart:"Себетіңіз әзірге бос.",emptyWishlist:"Әзірге бос. Ұнағанын сақтап қойыңыз.",addToCart:"Себетке қосу",quickAdd:"Жылдам көру",remove:"Өшіру",reviewTitle:"Пікірлер",writeReview:"Пікір қалдыру",reviewPlaceholder:"Бұйым туралы пікіріңізді бөлісіңіз…",submitReview:"Пікір жариялау",noReviews:"Әзірге пікір жоқ. Бірінші болыңыз.",rating:"Бағалау",allCategories:"Барлық санат",units:"бұйым",orderId:"Тапсырыс нөмірі",payment:"Төлем",orderThanks:"Тапсырысыңыз қабылданды. Мәліметтерді нақтылау үшін хабарласамыз.",memberSince:"Аккаунт ашылған",viewOrders:"Демо тапсырыстар сомасы",productsMetric:"Каталогтағы бұйымдар",salesMetric:"Демо тапсырыстар",ratingLabel:"баға",sale:"СҰРАНЫСТА",new:"ЖАҢА",visitSuccess:"Рақмет! Кездесуді растау үшін хабарласамыз.",newsletterSuccess:"Жазылдыңыз. Жақында хат жазамыз.",addedToCart:"Бұйым себетке қосылды.",removedFromCart:"Бұйым себеттен алынды.",addedToWishlist:"Таңдаулыларға қосылды.",removedFromWishlist:"Таңдаулылардан алынды.",productSaved:"Бұйым каталогқа қосылды.",productDeleted:"Бұйым өшірілді.",reviewSaved:"Пікіріңізге рақмет.",fillRequired:"Барлық міндетті өрісті толтырыңыз.",loginSuccess:"Аккаунтыңызға кірдіңіз.",registerSuccess:"Аккаунтыңыз ашылды. Қош келдіңіз!",logoutSuccess:"Аккаунттан шықтыңыз.",sortNewest:"Алдымен жаңалары",sortPriceLow:"Алдымен арзаны",sortPriceHigh:"Алдымен қымбаты",sortPopular:"Алдымен танымалдары",quickView:"Толығырақ",chooseSize:"Өлшемді таңдаңыз",emptySearch:"Іздеуге сәйкес ештеңе жоқ.",signedInAs:"Кірген аккаунт",adminAccess:"Әкімші мүмкіндігі іске қосылды.",invalidImage:"Сурет үшін HTTPS мекенжайын енгізіңіз.",order:"Тапсырыс",days:["Жс","Дс","Сс","Ср","Бс","Жм","Сб"]
    }
  };

  const seedProducts = [
    {id:"coat-01",category:"outerwear",name:{ru:"Пальто «Тихая сила»",en:"Quiet Strength Coat",kg:"«Жумшак күч» пальтосу",kz:"«Тыныш күш» пальтосы"},description:{ru:"Объёмное пальто с мягкой линией плеча и поясом из итальянской шерсти. Продуманный силуэт для прохладных городских дней.",en:"An oversized coat with a soft shoulder line and a self-tie belt, cut from Italian wool. A thoughtful silhouette for crisp city days.",kg:"Италия жүнүнөн тигилген, ийини жумшак жана куру бар кенен пальто. Шаардын салкын күндөрүнө ылайыктуу силуэт.",kz:"Италиялық жүннен тігілген, иығы жұмсақ әрі белдігі бар кең пальто. Қаланың салқын күндеріне арналған пішін."},price:24800,image:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"sale",rating:4.9,reviews:12},
    {id:"suit-02",category:"suits",name:{ru:"Костюм «Новый ритм»",en:"New Rhythm Suit",kg:"«Жаңы ыргак» костюму",kz:"«Жаңа ырғақ» костюмі"},description:{ru:"Свободный двубортный жакет и прямые брюки из дышащей смесовой ткани. Одинаково выразителен вместе и по отдельности.",en:"An easy double-breasted blazer and straight-leg trousers in breathable blended fabric. A considered set, equally expressive worn together or apart.",kg:"Дем алуучу кездемеден тигилген кенен жакет жана түз шым. Өз-өзүнчө да, чогуу да жарашыктуу.",kz:"Ауа өткізетін матадан тігілген кең жакет пен тік шалбар. Жеке де, бірге де жарасымды."},price:21900,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"new",rating:4.8,reviews:8},
    {id:"knit-03",category:"knitwear",name:{ru:"Свитер «Первый снег»",en:"First Snow Sweater",kg:"«Алгачкы кар» свитери",kz:"«Алғашқы қар» жемпірі"},description:{ru:"Мягкий объёмный свитер из натурального кашемира и шерсти мериноса. Нежная фактура и спущенное плечо для повседневных ритуалов.",en:"A softly oversized knit in natural cashmere and merino wool. A gentle texture and dropped shoulder, made for everyday rituals.",kg:"Табигый кашемир менен меринос жүнүнөн жумшак кенен свитер. Жагымдуу фактурасы жана түшүрүлгөн ийини бар.",kz:"Табиғи кашемир мен меринос жүнінен тоқылған жұмсақ кең жемпір. Жағымды текстурасы мен түсірілген иығы бар."},price:13900,image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"",rating:4.9,reviews:16},
    {id:"coat-04",category:"outerwear",name:{ru:"Тренч «Между строк»",en:"Between the Lines Trench",kg:"«Саптардын арасында» тренчи",kz:"«Жолдар арасында» тренчі"},description:{ru:"Лёгкий тренч из хлопка с водоотталкивающей отделкой. Съёмный пояс, глубокие карманы и подкладка с авторским принтом.",en:"A lightweight cotton trench with a water-resistant finish. A removable belt, deep pockets and a custom printed lining.",kg:"Суу өткөрбөс иштетүүсү бар жеңил пахта тренчи. Алынуучу кур, терең чөнтөктөр жана автордук астар.",kz:"Су өткізбейтін өңдеуі бар жеңіл мақта тренчі. Алынбалы белдік, терең қалталар мен авторлық астар."},price:19200,image:"https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"",rating:4.7,reviews:6},
    {id:"suit-05",category:"suits",name:{ru:"Жилет «Своя линия»",en:"Own Line Waistcoat",kg:"«Өз сызыгың» жилети",kz:"«Өз сызығың» жилеті"},description:{ru:"Структурный жилет из фактурной ткани, вдохновлённый мужским портновским искусством. Носите самостоятельно или поверх рубашки.",en:"A structured waistcoat in tactile fabric, inspired by traditional tailoring. Wear it on its own or layered over a shirt.",kg:"Эркектердин классикалык тигүү өнөрүнөн шыктанган фактуралуу жилет. Өзүнчө же көйнөктүн үстүнөн кийиңиз.",kz:"Классикалық ерлер тігін өнерінен шабыт алған текстуралы жилет. Жеке немесе жейденің үстінен киіңіз."},price:11600,image:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"new",rating:4.8,reviews:9},
    {id:"knit-06",category:"knitwear",name:{ru:"Кардиган «Тёплый воздух»",en:"Warm Air Cardigan",kg:"«Жылуу аба» кардиганы",kz:"«Жылы ауа» кардиганы"},description:{ru:"Удлинённый кардиган из мягкой мериносовой шерсти с перламутровыми пуговицами. Тёплый слой, который хочется носить каждый день.",en:"An elongated cardigan in soft merino wool with mother-of-pearl buttons. The kind of warm layer you reach for every day.",kg:"Жумшак меринос жүнүнөн тигилген, бермет топчулары бар узун кардиган. Күн сайын кийгиңиз келген жылуу катмар.",kz:"Жұмсақ меринос жүнінен тігілген, інжу түймелері бар ұзын кардиган. Күнде кигіңіз келетін жылы қабат."},price:15400,image:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"",rating:4.9,reviews:11},
    {id:"coat-07",category:"outerwear",name:{ru:"Куртка «Тихий вечер»",en:"Quiet Evening Jacket",kg:"«Тынч кеч» курткасы",kz:"«Тыныш кеш» күртесі"},description:{ru:"Укороченная куртка с мягкой стёганой фактурой и высоким воротником. Лёгкий утеплитель и матовая фурнитура.",en:"A cropped jacket with soft quilting and a high collar. Light insulation and understated matte hardware.",kg:"Жумшак тигиштүү фактурасы жана бийик жакасы бар кыска куртка. Жеңил жылуулоочу катмар жана күңүрт фурнитура.",kz:"Жұмсақ тігісті фактурасы мен биік жағасы бар қысқа күрте. Жеңіл жылытқыш қабаты мен күңгірт фурнитура."},price:17800,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=70",sizes:["XS","S","M","L"],badge:"",rating:4.8,reviews:5},
    {id:"knit-08",category:"knitwear",name:{ru:"Топ «Вторая кожа»",en:"Second Skin Top",kg:"«Экинчи тери» топу",kz:"«Екінші тері» топы"},description:{ru:"Лаконичный топ из тонкого хлопкового трикотажа с деликатной отделкой. Мягкая основа для многослойных образов.",en:"A clean-lined top in fine cotton knit with delicate finishing. A soft foundation for layered looks.",kg:"Назик жасалгалуу жука пахта трикотажынан тигилген жөнөкөй топ. Катмарлап кийүүгө ыңгайлуу.",kz:"Нәзік әрленген жұқа мақта трикотажынан тігілген қарапайым топ. Қабаттап киюге ыңғайлы."},price:7800,image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=900&q=82",sizes:["XS","S","M","L"],badge:"",rating:4.6,reviews:4}
  ];

  const STORAGE={products:"vv-products-v1",cart:"vv-cart-v1",wishlist:"vv-wishlist-v1",theme:"vv-theme-v1",language:"vv-language-v1",user:"vv-user-v1",users:"vv-users-v1",orders:"vv-orders-v1",reviews:"vv-reviews-v1",subscribers:"vv-subscribers-v1",visits:"vv-visits-v1"};
  const backendMode=location.protocol!=="file:"&&!new URLSearchParams(location.search).has("demo");
  const runtime={configured:false,oauthProviders:[],cloudinaryCloudName:"",cloudinaryUploadPreset:"",telegramConfigured:false,session:null,page:1,pages:1,apiReviews:[]};
  const read=(key,fallback)=>{try{const value=localStorage.getItem(key);return value===null?fallback:JSON.parse(value);}catch{return fallback;}};
  const save=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
  const state={products:read(STORAGE.products,seedProducts),cart:read(STORAGE.cart,[]),wishlist:read(STORAGE.wishlist,[]),theme:read(STORAGE.theme,"dark"),lang:read(STORAGE.language,"ru"),user:backendMode?null:read(STORAGE.user,null),orders:read(STORAGE.orders,[]),reviews:read(STORAGE.reviews,{}),category:"all",search:"",favoritesOnly:false,sort:"newest",detailId:null,selectedSize:"",adminEditingProductId:null};
  if(!Array.isArray(state.products)||!state.products.length)state.products=seedProducts;
  if(!Array.isArray(state.cart))state.cart=[];if(!Array.isArray(state.wishlist))state.wishlist=[];
  if(!Array.isArray(state.orders))state.orders=[];if(!state.reviews||typeof state.reviews!=="object")state.reviews={};

  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
  async function apiRequest(path,{method="GET",body,headers={}}={},retry=true){
    const requestHeaders={...headers};
    if(runtime.session?.accessToken&&!requestHeaders.Authorization)requestHeaders.Authorization=`Bearer ${runtime.session.accessToken}`;
    if(body!==undefined)requestHeaders["Content-Type"]="application/json";
    const response=await fetch(`/api/${path}`,{method,headers:requestHeaders,body:body===undefined?undefined:JSON.stringify(body)});
    const payload=await response.json().catch(()=>({}));
    if(response.status===401&&retry&&runtime.session?.refreshToken&&path!=="auth/refresh"){
      try{
        const refreshed=await apiRequest("auth/refresh",{method:"POST",body:{refreshToken:runtime.session.refreshToken}},false);
        setSession(refreshed);return apiRequest(path,{method,body,headers},false);
      }catch(error){clearSession();throw new Error(`Сессия истекла. Войдите снова. (${error.message})`);}
    }
    if(!response.ok)throw new Error(payload.error||`Request failed (${response.status})`);
    return payload;
  }
  function setSession(session){
    runtime.session={accessToken:session.accessToken,refreshToken:session.refreshToken,user:session.user};
    sessionStorage.setItem("vv-session-v1",JSON.stringify(runtime.session));
    state.user={...session.user,token:session.accessToken};
  }
  function clearSession(){
    runtime.session=null;state.user=null;sessionStorage.removeItem("vv-session-v1");
    if(!backendMode)save(STORAGE.user,null);
  }
  function setAppStatus(message,type=""){
    const status=$("#appStatus");status.textContent=message;status.classList.toggle("hidden",!message);status.dataset.type=type;
  }
  function setBackendAvailability(available){
    if(!backendMode)return;
    ["#checkoutForm button[type='submit']","#visitForm button[type='submit']","#newsletterForm button[type='submit']","#authForm button[type='submit']","#productForm button[type='submit']"].forEach(selector=>{const button=$(selector);if(button)button.disabled=!available;});
    $("#checkoutOpen").disabled=false;
  }
  async function loadRemoteProducts(reset=true,isCurrent=()=>true){
    if(!runtime.configured)return;
    const page=reset?1:runtime.page+1;
    const params=new URLSearchParams({page:String(page),pageSize:"24",search:state.search,category:state.category,sort:state.sort});
    const previousProducts=state.products;
    if(reset)$("#productGrid").innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><div></div><i></i><i></i></div>').join("");
    try{
      const data=await apiRequest(`products?${params}`);
      if(!isCurrent())return;
      const incoming=Array.isArray(data.products)?data.products:[];
      state.products=reset?incoming:[...state.products,...incoming.filter(item=>!state.products.some(existing=>existing.id===item.id))];
      runtime.page=data.page||page;runtime.pages=data.pages||1;
      renderCatalog();
    }catch(error){if(reset){state.products=previousProducts;renderCatalog();}throw error;}
  }
  async function initializeBackend(){
    if(!backendMode)return;
    setBackendAvailability(false);
    setAppStatus("Подключаем сервер и базу данных…");
    $("#productGrid").innerHTML=Array.from({length:6},()=>'<div class="product-skeleton" aria-hidden="true"><div></div><i></i><i></i></div>').join("");
    try{
      const config=await apiRequest("config");
      if(!config.configured){renderCatalog();setAppStatus("Серверная база данных не настроена. Каталог открыт для просмотра; отправка форм и оформление заказов недоступны.","error");return;}
      runtime.configured=true;runtime.oauthProviders=config.oauthProviders||[];
      setBackendAvailability(true);
      runtime.telegramConfigured=Boolean(config.telegramConfigured);
      runtime.cloudinaryCloudName=config.cloudinaryCloudName||"";runtime.cloudinaryUploadPreset=config.cloudinaryUploadPreset||"";
      if(runtime.session?.accessToken){
        try{const response=await apiRequest("auth/me");state.user={...response.user,token:runtime.session.accessToken};}
        catch{clearSession();}
      }else{
        const savedSession=sessionStorage.getItem("vv-session-v1");
        if(savedSession){try{setSession(JSON.parse(savedSession));const response=await apiRequest("auth/me");state.user={...response.user,token:runtime.session.accessToken};}catch{clearSession();}}
      }
      const hash=new URLSearchParams(location.hash.slice(1));
      if(hash.has("access_token")){
        const session={accessToken:hash.get("access_token"),refreshToken:hash.get("refresh_token"),user:null};
        const userResponse=await apiRequest("auth/me",{headers:{Authorization:`Bearer ${session.accessToken}`}});
        session.user=userResponse.user;setSession(session);history.replaceState(null,"",location.pathname+location.search);
      }
      const oauth=$("#oauthActions");oauth.classList.toggle("hidden",!runtime.oauthProviders.length);
      $$(".oauth-provider").forEach(link=>link.classList.toggle("hidden",!runtime.oauthProviders.includes(link.dataset.oauthProvider)));
      const imageUpload=$('input[name="imageFile"]');imageUpload.closest("label").classList.toggle("hidden",!runtime.cloudinaryCloudName||!runtime.cloudinaryUploadPreset);
      await loadRemoteProducts();
      let reviewError="";
      try{const reviews=await apiRequest("reviews");runtime.apiReviews=Array.isArray(reviews)?reviews:[];}
      catch(error){reviewError=`Отзывы временно недоступны: ${error.message}`;console.error("Review loading failed",error);}
      renderCustomerReviews();renderUserState();setAppStatus(reviewError,reviewError?"error":"");
      if(location.pathname.replace(/\/+$/,"")==="/admin"||new URLSearchParams(location.search).has("admin")){if(state.user?.role==="admin")showAdmin();else openAuth(true);}
    }catch(error){runtime.configured=false;setBackendAvailability(false);state.products=seedProducts;renderCatalog();setAppStatus(`Не удалось подключиться к серверу: ${error.message} Каталог показан в демонстрационном режиме; оформление заказов и отправка форм недоступны.`,"error");}
  }
  const siteCopy={
    ru:{navReviews:"Отзывы",navFaq:"Вопросы",valuesEyebrow:"НАШ ПОДХОД",valuesTitle:"Продумано.<br><em>Сделано с чувством.</em>",valuesNote:"Не гнаться за количеством.<br>Выбирать то, что останется с вами.",valueLocalTitle:"Создано в Бишкеке",valueLocalText:"Работаем рядом с вами и бережно относимся к ремеслу, деталям и людям, которые создают наши вещи.",valueSmallTitle:"Небольшие тиражи",valueSmallText:"Выпускаем коллекции ограниченными партиями — чтобы выбирать осознанно и носить дольше.",valueAtelierTitle:"Внимание к посадке",valueAtelierText:"В ателье можно примерить вещи, посмотреть на ткани и подобрать силуэт в спокойной обстановке.",reviewsEyebrow:"ВАШИ ВПЕЧАТЛЕНИЯ",reviewsTitle:"Отзывы<br><em>наших покупателей.</em>",reviewsNote:"Честные отзывы покупателей,<br>оставленные на страницах изделий.",reviewsEmptyTitle:"Пока здесь тихо.",reviewsEmptyText:"Будьте первым, кто поделится впечатлением об изделии. Ваш отзыв появится здесь после публикации.",reviewsExplore:"Открыть коллекцию",reviewFor:"Отзыв об изделии",faqEyebrow:"ПОЛЕЗНО ЗНАТЬ",faqTitle:"Перед тем,<br><em>как выбрать.</em>",faqNote:"Коротко ответили на вопросы,<br>которые помогают сделать выбор.",faqSizeQuestion:"Как подобрать размер?",faqSizeAnswer:"Откройте карточку изделия и загляните в размерный гид. Там указаны ориентировочные мерки груди, талии и бёдер. Если сомневаетесь, запишитесь на примерку в ателье.",faqDeliveryQuestion:"Как получить заказ?",faqDeliveryAnswer:"Для заказов доступны курьерская доставка по Бишкеку за 300 сом и бесплатный самовывоз из ателье. Выберите удобный вариант при оформлении.",faqAtelierQuestion:"Можно ли сначала примерить вещь?",faqAtelierAnswer:"Да. Запишитесь на визит через форму на сайте: ателье находится по адресу ул. Токтогула, 125 и открыто со вторника по воскресенье, с 11:00 до 20:00.",faqReviewQuestion:"Как оставить отзыв?",faqReviewAnswer:"Откройте карточку изделия, выберите оценку, напишите впечатление и нажмите «Опубликовать отзыв». Отзывы появятся в этом разделе."},
    en:{navReviews:"Reviews",navFaq:"FAQ",valuesEyebrow:"OUR APPROACH",valuesTitle:"Considered.<br><em>Made with feeling.</em>",valuesNote:"Less chasing more.<br>More choosing what stays.",valueLocalTitle:"Made in Bishkek",valueLocalText:"We create close to home, with care for craft, thoughtful details and the people behind each piece.",valueSmallTitle:"Small-batch collections",valueSmallText:"We release limited runs to make more considered choices possible—and pieces worth wearing for longer.",valueAtelierTitle:"A considered fit",valueAtelierText:"Visit the atelier to try the collection, explore the fabrics and find a silhouette that feels right.",reviewsEyebrow:"YOUR IMPRESSIONS",reviewsTitle:"Customer<br><em>reviews.</em>",reviewsNote:"Customer reviews shared<br>on individual product pages.",reviewsEmptyTitle:"A quiet space—for now.",reviewsEmptyText:"Be the first to share your experience with a piece. Your review will appear here after you publish it.",reviewsExplore:"Explore the collection",reviewFor:"Review for",faqEyebrow:"GOOD TO KNOW",faqTitle:"Before<br><em>you choose.</em>",faqNote:"A few helpful answers<br>to make choosing easier.",faqSizeQuestion:"How do I choose my size?",faqSizeAnswer:"Open a product page and view its size guide for approximate bust, waist and hip measurements. If you are unsure, book a fitting at the atelier.",faqDeliveryQuestion:"How can I receive my order?",faqDeliveryAnswer:"Choose courier delivery in Bishkek for 300 KGS or free pickup at the atelier when checking out.",faqAtelierQuestion:"Can I try a piece on first?",faqAtelierAnswer:"Of course. Book a visit using the form on our website. The atelier is at 125 Toktogul Street and is open Tuesday through Sunday, 11:00–20:00.",faqReviewQuestion:"How can I leave a review?",faqReviewAnswer:"Open a product page, select a rating, share your thoughts and select “Publish review”. Published reviews appear in this section."},
    kg:{navReviews:"Пикирлер",navFaq:"Суроолор",valuesEyebrow:"БИЗДИН ЫКМАБЫЗ",valuesTitle:"Ойлонулган.<br><em>Сезим менен жасалган.</em>",valuesNote:"Көп нерсеге умтулбайбыз.<br>Сиз менен кала турганын тандайбыз.",valueLocalTitle:"Бишкекте жасалган",valueLocalText:"Кол өнөрчүлүккө, кылдат деталдарга жана буюмдарыбызды жараткан адамдарга аяр мамиле кылабыз.",valueSmallTitle:"Чектелген тираж",valueSmallText:"Коллекцияларды аз санда чыгарабыз — аң-сезимдүү тандоо жана узак кийүү үчүн.",valueAtelierTitle:"Ыңгайлуу отурушу",valueAtelierText:"Ательеге келип кийимдерди кийип көрүп, кездемелерди кармап, өзүңүзгө ылайык силуэт тандай аласыз.",reviewsEyebrow:"СИЗДИН ПИКИРИҢИЗ",reviewsTitle:"Сатып алуучулардын<br><em>пикирлери.</em>",reviewsNote:"Буюмдардын барагында<br>жазылган кардарлардын пикирлери.",reviewsEmptyTitle:"Бул жерде азырынча тынч.",reviewsEmptyText:"Буюм тууралуу таасириңизди биринчи болуп бөлүшүңүз. Пикириңиз жарыялангандан кийин ушул жерде көрүнөт.",reviewsExplore:"Коллекцияны көрүү",reviewFor:"Буюм тууралуу пикир",faqEyebrow:"БИЛИП АЛГАН ЖАКШЫ",faqTitle:"Тандоодон<br><em>мурун.</em>",faqNote:"Тандоого жардам берүүчү<br>кыска жооптор.",faqSizeQuestion:"Өлчөмдү кантип тандайм?",faqSizeAnswer:"Буюмдун барагын ачып, көкүрөк, бел жана жамбаштын болжолдуу өлчөмдөрүн көрүү үчүн өлчөмдөр боюнча колдонмону караңыз. Күмөн санасаңыз, ательеге кийип көрүүгө жазылыңыз.",faqDeliveryQuestion:"Буйрутманы кантип алам?",faqDeliveryAnswer:"Бишкек боюнча курьердик жеткирүү 300 сом турат, ательеден алып кетүү акысыз. Буйрутма берүүдө ылайыктуу вариантты тандаңыз.",faqAtelierQuestion:"Адегенде кийип көрсөм болобу?",faqAtelierAnswer:"Албетте. Сайттагы форма аркылуу жолугушууга жазылыңыз. Ателье Токтогул көчөсү, 125 дарегинде, шейшембиден жекшембиге чейин 11:00–20:00 иштейт.",faqReviewQuestion:"Пикирди кантип калтырам?",faqReviewAnswer:"Буюмдун барагын ачып, баа бериңиз, таасириңизди жазып, «Пикирди жарыялоо» баскычын басыңыз. Жарыяланган пикир бул бөлүмдө көрүнөт."},
    kz:{navReviews:"Пікірлер",navFaq:"Сұрақтар",valuesEyebrow:"БІЗДІҢ ҰСТАНЫМ",valuesTitle:"Ойластырылған.<br><em>Сезіммен жасалған.</em>",valuesNote:"Көпке ұмтылмаймыз.<br>Сізбен қалатынды таңдаймыз.",valueLocalTitle:"Бішкекте жасалған",valueLocalText:"Шеберлікке, ұқыпты бөлшектерге және бұйымдарымызды жасайтын адамдарға құрметпен қараймыз.",valueSmallTitle:"Шағын топтамалар",valueSmallText:"Саналы таңдау жасап, бұйымды ұзақ кию үшін топтамаларды шектеулі мөлшерде шығарамыз.",valueAtelierTitle:"Ыңғайлы қоным",valueAtelierText:"Ательеге келіп, киімдерді киіп көріп, маталарын байқап, өзіңізге үйлесетін үлгіні таба аласыз.",reviewsEyebrow:"СІЗДІҢ ӘСЕРІҢІЗ",reviewsTitle:"Сатып алушылардың<br><em>пікірлері.</em>",reviewsNote:"Бұйым беттеріне<br>жазылған сатып алушылар пікірлері.",reviewsEmptyTitle:"Әзірге тыныш.",reviewsEmptyText:"Бұйым туралы әсеріңізбен бірінші болып бөлісіңіз. Жариялаған соң пікіріңіз осында көрінеді.",reviewsExplore:"Топтаманы көру",reviewFor:"Бұйым туралы пікір",faqEyebrow:"БІЛЕ ЖҮРГЕН ЖАҚСЫ",faqTitle:"Таңдамас<br><em>бұрын.</em>",faqNote:"Таңдауға көмектесетін<br>қысқаша жауаптар.",faqSizeQuestion:"Өлшемді қалай таңдаймын?",faqSizeAnswer:"Бұйым бетін ашып, кеуде, бел және жамбас өлшемдерінің шамамен көрсеткіштері берілген өлшемдер кестесін қараңыз. Күмәндансаңыз, ательеге киіп көруге жазылыңыз.",faqDeliveryQuestion:"Тапсырысты қалай алуға болады?",faqDeliveryAnswer:"Бішкек бойынша курьерлік жеткізу — 300 сом, ал ательеден алып кету тегін. Тапсырысты рәсімдегенде өзіңізге ыңғайлысын таңдаңыз.",faqAtelierQuestion:"Алдымен киіп көруге бола ма?",faqAtelierAnswer:"Әрине. Сайттағы форма арқылы кездесуге жазылыңыз. Ателье Тоқтоғұл көшесі, 125 мекенжайында, сейсенбіден жексенбіге дейін 11:00–20:00 жұмыс істейді.",faqReviewQuestion:"Пікірді қалай қалдырамын?",faqReviewAnswer:"Бұйым бетін ашып, баға беріңіз, әсеріңізді жазып, «Пікір жариялау» түймесін басыңыз. Жарияланған пікірлер осы бөлімде көрінеді."}
  };
  const t=key=>siteCopy[state.lang]?.[key]??translations[state.lang]?.[key]??siteCopy.ru[key]??translations.ru[key]??key;
  const adminCopy={
    ru:{edit:"Изменить",delete:"Удалить",newProduct:"Новое изделие",editingProduct:"Редактирование изделия",cancelEdit:"Отменить",updateProduct:"Сохранить изменения",productUpdated:"Изменения товара сохранены.",badge:"Метка",noBadge:"Без метки",orders:"Заказы",noOrders:"Заказов пока нет.",order:"Заказ",customer:"Покупатель",payment:"Оплата",orderItems:"Состав заказа",visits:"Записи в ателье",noVisits:"Записей пока нет.",visit:"Визит",status:"Статус",phone:"Телефон",address:"Адрес",delivery:"Доставка",newStatus:"Новый",processingStatus:"В обработке",completedStatus:"Завершён",cancelledStatus:"Отменён",orderUpdated:"Статус заказа обновлён.",size:"Размеры",invalidCategory:"Выберите категорию из списка."},
    en:{edit:"Edit",delete:"Delete",newProduct:"New product",editingProduct:"Edit product",cancelEdit:"Cancel",updateProduct:"Save changes",productUpdated:"Product changes saved.",badge:"Label",noBadge:"No label",orders:"Orders",noOrders:"No orders yet.",order:"Order",customer:"Customer",payment:"Payment",orderItems:"Order items",visits:"Atelier appointments",noVisits:"No appointments yet.",visit:"Visit",status:"Status",phone:"Phone",address:"Address",delivery:"Delivery",newStatus:"New",processingStatus:"Processing",completedStatus:"Completed",cancelledStatus:"Cancelled",orderUpdated:"Order status updated.",size:"Sizes",invalidCategory:"Select a valid category."},
    kg:{edit:"Өзгөртүү",delete:"Өчүрүү",newProduct:"Жаңы буюм",editingProduct:"Буюмду өзгөртүү",cancelEdit:"Жокко чыгаруу",updateProduct:"Өзгөртүүлөрдү сактоо",productUpdated:"Буюм өзгөртүүлөрү сакталды.",badge:"Белги",noBadge:"Белгисиз",orders:"Буйрутмалар",noOrders:"Азырынча буйрутма жок.",order:"Буйрутма",customer:"Кардар",payment:"Төлөм",orderItems:"Буйрутманын курамы",visits:"Ательеге жазылуулар",noVisits:"Азырынча жазылуу жок.",visit:"Жолугушуу",status:"Абалы",phone:"Телефон",address:"Дарек",delivery:"Жеткирүү",newStatus:"Жаңы",processingStatus:"Иштетилүүдө",completedStatus:"Аяктады",cancelledStatus:"Жокко чыгарылды",orderUpdated:"Буйрутманын абалы жаңыртылды.",size:"Өлчөмдөр",invalidCategory:"Тизмеден туура категорияны тандаңыз."},
    kz:{edit:"Өзгерту",delete:"Жою",newProduct:"Жаңа бұйым",editingProduct:"Бұйымды өзгерту",cancelEdit:"Болдырмау",updateProduct:"Өзгерістерді сақтау",productUpdated:"Бұйым өзгерістері сақталды.",badge:"Белгі",noBadge:"Белгісіз",orders:"Тапсырыстар",noOrders:"Әзірге тапсырыс жоқ.",order:"Тапсырыс",customer:"Сатып алушы",payment:"Төлем",orderItems:"Тапсырыс құрамы",visits:"Ательеге жазылулар",noVisits:"Әзірге жазылу жоқ.",visit:"Кездесу",status:"Күйі",phone:"Телефон",address:"Мекенжай",delivery:"Жеткізу",newStatus:"Жаңа",processingStatus:"Өңделуде",completedStatus:"Аяқталды",cancelledStatus:"Болдырылмады",orderUpdated:"Тапсырыс күйі жаңартылды.",size:"Өлшемдер",invalidCategory:"Тізімнен дұрыс санатты таңдаңыз."}
  };
  const adminText=key=>adminCopy[state.lang]?.[key]??adminCopy.ru[key];
  const sizeGuideCopy={
    ru:{title:"Размерный гид",size:"Размер",bust:"Грудь",waist:"Талия",hips:"Бёдра",unit:"см",measure:"Измеряйте параметры по телу мягкой сантиметровой лентой, не затягивая её.",fit:"Это ориентировочные мерки тела. Посадка может отличаться в зависимости от модели и ткани. Если ваши мерки между размерами, выбирайте больший для более свободной посадки.",open:"Открыть размерный гид"},
    en:{title:"Size guide",size:"Size",bust:"Bust",waist:"Waist",hips:"Hips",unit:"cm",measure:"Measure around your body with a soft measuring tape, keeping it snug but not tight.",fit:"These are approximate body measurements. Fit may vary by style and fabric. If you fall between sizes, choose the larger size for a more relaxed fit.",open:"Open size guide"},
    kg:{title:"Өлчөмдөр боюнча колдонмо",size:"Өлчөм",bust:"Көкүрөк",waist:"Бел",hips:"Жамбаш",unit:"см",measure:"Денеңизди жумшак сантиметр лента менен өлчөңүз, лентаны катуу тартпаңыз.",fit:"Бул дене өлчөмдөрүнүн болжолдуу көрсөткүчтөрү. Кийимдин отурушу моделге жана кездемеге жараша өзгөрүшү мүмкүн. Эгер өлчөмдөрүңүз эки өлчөмдүн ортосунда болсо, кененирээк отурушу үчүн чоңураагын тандаңыз.",open:"Өлчөмдөр боюнча колдонмону ачуу"},
    kz:{title:"Өлшемдер кестесі",size:"Өлшем",bust:"Кеуде",waist:"Бел",hips:"Жамбас",unit:"см",measure:"Денеңізді жұмсақ сантиметрлік таспамен өлшеңіз, таспаны қатты тартпаңыз.",fit:"Бұл дене өлшемдерінің шамамен алынған көрсеткіштері. Киімнің отырысы үлгі мен матаға қарай өзгеруі мүмкін. Өлшемдеріңіз екі өлшемнің арасында болса, кеңірек отырыс үшін үлкенін таңдаңыз.",open:"Өлшемдер кестесін ашу"}
  };
  function sizeGuideMarkup(){
    const copy=sizeGuideCopy[state.lang]||sizeGuideCopy.ru;
    const rows=[["XS","78–82","60–64","86–90"],["S","83–87","65–69","91–95"],["M","88–92","70–74","96–100"],["L","93–97","75–79","101–105"]];
    return `<details class="size-guide"><summary>${safe(copy.open)} <span aria-hidden="true">↗</span></summary><div class="size-guide-content"><h3>${safe(copy.title)}</h3><div class="size-guide-table-wrap"><table><caption class="sr-only">${safe(copy.title)} (${safe(copy.unit)})</caption><thead><tr><th>${safe(copy.size)}</th><th>${safe(copy.bust)}</th><th>${safe(copy.waist)}</th><th>${safe(copy.hips)}</th></tr></thead><tbody>${rows.map(row=>`<tr>${row.map(value=>`<td>${value}</td>`).join("")}</tr>`).join("")}</tbody></table></div><small>${safe(copy.unit)}</small><p>${safe(copy.measure)}</p><p>${safe(copy.fit)}</p></div></details>`;
  }
  const safe=value=>String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const productText=(product,field)=>typeof product[field]==="object"?(product[field][state.lang]||product[field].ru||""):product[field];
  const getProduct=id=>state.products.find(product=>product.id===id);
  const formatPrice=price=>`${money.format(Number(price)||0)} сом`;
  const delay=ms=>new Promise(resolve=>window.setTimeout(resolve,ms));
  const fallbackImage="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=70";
  const unavailableJacketImage="https://images.unsplash.com/photo-1548624149-f322a9ec7c9f?auto=format&fit=crop&w=900&q=82";
  const jacketWithUnavailableImage=state.products.find(product=>product.image===unavailableJacketImage);
  if(jacketWithUnavailableImage){jacketWithUnavailableImage.image=fallbackImage;save(STORAGE.products,state.products);}
  async function mockApi(operation){await delay(350+Math.random()*350);return operation();}
  async function passwordDigest(password,salt){
    const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(password),"PBKDF2",false,["deriveBits"]);
    const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:new TextEncoder().encode(salt),iterations:120000,hash:"SHA-256"},key,256);
    return Array.from(new Uint8Array(bits),byte=>byte.toString(16).padStart(2,"0")).join("");
  }
  function createPasswordSalt(){return Array.from(crypto.getRandomValues(new Uint8Array(16)),byte=>byte.toString(16).padStart(2,"0")).join("");}
  function toast(message,type=""){const node=document.createElement("div");node.className=`toast ${type}`.trim();node.textContent=message;$("#toastRegion").append(node);window.setTimeout(()=>node.remove(),3600);}
  function persist(){save(STORAGE.products,state.products);save(STORAGE.cart,state.cart);save(STORAGE.wishlist,state.wishlist);save(STORAGE.orders,state.orders);save(STORAGE.reviews,state.reviews);save(STORAGE.theme,state.theme);save(STORAGE.language,state.lang);if(!backendMode)save(STORAGE.user,state.user);}
  function applyLanguage(){
    document.documentElement.lang=state.lang;$("#languageSelect").value=state.lang;
    $("#sortSelect").value=state.sort;
    $("#loadMoreProducts").textContent=({ru:"Загрузить ещё",en:"Load more",kg:"Дагы жүктөө",kz:"Тағы жүктеу"})[state.lang];
    $$("[data-i18n]").forEach(node=>{const value=t(node.dataset.i18n);if(value.includes("<"))node.innerHTML=value;else node.textContent=value;});
    $$("[data-i18n-placeholder]").forEach(node=>node.placeholder=t(node.dataset.i18nPlaceholder));
    renderCatalog();renderCustomerReviews();renderCart();renderWishlist();renderUserState();if(state.detailId)renderProductDetail(state.detailId);if(state.user?.role==="admin")renderAdmin();
  }
  function renderTheme(){document.body.classList.toggle("light",state.theme==="light");$("#themeIcon").textContent=state.theme==="light"?"☾":"☼";$("#themeToggle").title=state.theme==="light"?"Switch to dark theme":"Switch to light theme";}
  function setupMotion(){
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets=$$(".collection .section-heading,.manifesto-copy,.values-section,.reviews-section .section-heading,.faq-section .section-heading,.atelier-intro,.atelier-form,.newsletter>div,.newsletter-form");
    if(!reducedMotion&&"IntersectionObserver" in window){
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
        });
      },{threshold:.14});
      revealTargets.forEach(target=>{target.classList.add("reveal-on-scroll");observer.observe(target);});
    }
    const updateScrollState=()=>{
      const scrollable=document.documentElement.scrollHeight-window.innerHeight;
      const progress=scrollable>0?Math.min(100,Math.max(0,window.scrollY/scrollable*100)):0;
      document.body.style.setProperty("--scroll-progress",`${progress}%`);
      document.body.classList.toggle("is-scrolled",window.scrollY>12);
    };
    updateScrollState();
    window.addEventListener("scroll",updateScrollState,{passive:true});
    const hero=$(".hero");
    if(hero&&!reducedMotion&&window.matchMedia("(pointer: fine)").matches){
      hero.addEventListener("pointermove",event=>{
        const bounds=hero.getBoundingClientRect();
        hero.style.setProperty("--spot-x",`${event.clientX-bounds.left}px`);
        hero.style.setProperty("--spot-y",`${event.clientY-bounds.top}px`);
      });
      hero.addEventListener("pointerleave",()=>{hero.style.removeProperty("--spot-x");hero.style.removeProperty("--spot-y");});
    }
  }
  function filteredProducts(){
    const query=state.search.trim().toLocaleLowerCase();
    let list=state.products.filter(product=>{
      if(state.category!=="all"&&product.category!==state.category)return false;
      if(state.favoritesOnly&&!state.wishlist.includes(product.id))return false;
      if(!query)return true;
      const searchable=[productText(product,"name"),productText(product,"description"),product.category,...Object.values(product.name||{}),...Object.values(product.description||{})].join(" ").toLocaleLowerCase();
      return searchable.includes(query);
    });
    if(state.sort==="price-low")list.sort((a,b)=>a.price-b.price);
    if(state.sort==="price-high")list.sort((a,b)=>b.price-a.price);
    if(state.sort==="popular")list.sort((a,b)=>(b.rating||0)-(a.rating||0));
    return list;
  }
  function renderCatalog(){
    const products=filteredProducts();
    $("#productGrid").innerHTML=products.map((product,index)=>{
      const name=safe(productText(product,"name"));
      const sizes=product.sizes||["XS","S","M","L"];
      const sizeButtons=sizes.map(size=>{
        const quantity=state.cart.find(item=>item.id===product.id&&item.size===size)?.quantity||0;
        return `<button class="card-size-button ${quantity?"in-cart":""}" type="button" data-action="quick-size" data-id="${safe(product.id)}" data-size="${safe(size)}" aria-label="${safe(`${t("addToCart")}: ${productText(product,"name")} · ${size}`)}" ${quantity>=MAX_CART_QUANTITY?"disabled":""}>${safe(size)}${quantity?`<span aria-hidden="true">${quantity}</span>`:""}</button>`;
      }).join("");
      return `<article class="product-card" style="animation-delay:${Math.min(index*45,250)}ms" data-product-id="${safe(product.id)}"><div class="product-image-wrap"><img src="${safe(product.image)}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImage}'">${product.badge?`<span class="product-flag">${safe(t(product.badge))}</span>`:""}<button class="favorite-button ${state.wishlist.includes(product.id)?"active":""}" data-action="favorite" data-id="${safe(product.id)}" aria-label="${safe(t("favoritesOnly"))}" aria-pressed="${state.wishlist.includes(product.id)}">${state.wishlist.includes(product.id)?"♥":"♡"}</button><button class="quick-add" data-action="details" data-id="${safe(product.id)}">${safe(t("quickView"))} <span>↗</span></button></div><div class="product-info"><span class="product-category">${safe(t(product.category))}</span><h3 class="product-name" data-action="details" data-id="${safe(product.id)}">${name}</h3><span class="product-price">${formatPrice(product.price)}</span><div class="card-size-picker"><span>${safe(t("chooseSize"))}</span><div class="card-size-options">${sizeButtons}</div></div><div class="product-meta"><span class="product-rating">★ ${Number(product.rating||0).toFixed(1)} <span style="color:var(--soft)">(${Number(product.reviews||0)})</span></span></div></div></article>`;
    }).join("");
    const activeFilters=[];
    if(state.category!=="all")activeFilters.push({key:"category",label:t(state.category)});
    if(state.search.trim())activeFilters.push({key:"search",label:`${t("searchPlaceholder")}: ${state.search.trim()}`});
    if(state.favoritesOnly)activeFilters.push({key:"favorites",label:t("favoritesOnly")});
    if(state.sort!=="newest")activeFilters.push({key:"sort",label:t(({ "price-low":"sortPriceLow","price-high":"sortPriceHigh",popular:"sortPopular" })[state.sort])});
    $("#activeFilters").innerHTML=activeFilters.map(filter=>`<button class="filter-chip" type="button" data-action="clear-filter" data-filter="${filter.key}" aria-label="${safe(t("remove"))}: ${safe(filter.label)}"><span>${safe(filter.label)}</span><span aria-hidden="true">×</span></button>`).join("")+(activeFilters.length?`<button class="filter-reset" type="button" data-action="clear-filter" data-filter="all">${safe(t("resetFilters"))}</button>`:"");
    $("#activeFilters").classList.toggle("hidden",activeFilters.length===0);$("#emptyState").classList.toggle("hidden",products.length>0);$("#resultsLabel").textContent=`${products.length} ${t("units")}`;$("#activeFilterLabel").textContent="";$("#clearSearch").classList.toggle("visible",Boolean(state.search));
    $("#loadMoreProducts").classList.toggle("hidden",!backendMode||!runtime.configured||runtime.page>=runtime.pages);
    $$(".category-tab").forEach(button=>button.classList.toggle("active",button.dataset.category===state.category));$("#filterToggle").classList.toggle("active",state.favoritesOnly);
  }
  function refreshCatalog(){
    if(backendMode&&runtime.configured)loadRemoteProducts().catch(error=>toast(`Не удалось обновить каталог: ${error.message}`,"error"));
    else renderCatalog();
  }
  function renderCustomerReviews(){
    const localEntries=Object.entries(state.reviews).flatMap(([productId,reviews])=>
      Array.isArray(reviews)?reviews.map(review=>({productId,review})):[]
    );
    const remoteEntries=runtime.apiReviews.map(review=>({productId:review.product_id,review:{...review,date:review.created_at}}));
    const entries=[...(backendMode?remoteEntries:localEntries)].filter(({review})=>review&&typeof review.text==="string"&&review.text.trim()&&Number.isFinite(Number(review.rating))&&Number(review.rating)>=1&&Number(review.rating)<=5)
      .sort((a,b)=>Date.parse(b.review.date||0)-Date.parse(a.review.date||0)).slice(0,6);
    if(!entries.length){
      $("#customerReviews").innerHTML=`<div class="reviews-empty"><span aria-hidden="true">✳</span><h3>${safe(t("reviewsEmptyTitle"))}</h3><p>${safe(t("reviewsEmptyText"))}</p><a class="text-link" href="#collection">${safe(t("reviewsExplore"))}<span>↗</span></a></div>`;
      return;
    }
    const locale={ru:"ru-RU",en:"en-US",kg:"ky-KG",kz:"kk-KZ"}[state.lang]||"ru-RU";
    $("#customerReviews").innerHTML=entries.map(({productId,review})=>{
      const product=getProduct(productId);
      const date=review.date&&Number.isFinite(Date.parse(review.date))?new Intl.DateTimeFormat(locale,{dateStyle:"medium"}).format(new Date(review.date)):"";
      const rating=Number(review.rating);
      return `<article class="review-card"><div class="review-card-top"><span class="review-stars" aria-label="${rating} / 5">${"★".repeat(rating)}<span>${"★".repeat(5-rating)}</span></span><time>${safe(date)}</time></div><blockquote>${safe(review.text.trim())}</blockquote><div class="review-author"><span class="review-avatar" aria-hidden="true">${safe((review.name||"V").trim().charAt(0).toUpperCase())}</span><div><strong>${safe(review.name||"V&V")}</strong>${product?`<button class="review-product-link" data-action="details" data-id="${safe(productId)}">${safe(t("reviewFor"))}: ${safe(productText(product,"name"))} ↗</button>`:""}</div></div></article>`;
    }).join("");
  }
  function cartCount(){return state.cart.reduce((sum,item)=>sum+item.quantity,0);}
  function updateCardSizeState(id,size){
    const button=$$(".card-size-button").find(item=>item.dataset.id===id&&item.dataset.size===size);
    if(!button)return;
    const quantity=state.cart.find(item=>item.id===id&&item.size===size)?.quantity||0;
    button.classList.toggle("in-cart",quantity>0);button.disabled=quantity>=MAX_CART_QUANTITY;button.textContent=size;
    if(quantity){const badge=document.createElement("span");badge.setAttribute("aria-hidden","true");badge.textContent=quantity;button.append(badge);}
  }
  function renderCounts(){$("#cartCount").textContent=cartCount();$("#wishlistCount").textContent=state.wishlist.length;$("#drawerCartCount").textContent=`(${cartCount()})`;$("#drawerWishlistCount").textContent=`(${state.wishlist.length})`;}
  function renderCart(){
    const valid=state.cart.filter(item=>{const product=getProduct(item.id);return product&&Number.isInteger(Number(item.quantity))&&Number(item.quantity)>0&&Number(item.quantity)<=20&&(product.sizes||[]).includes(item.size);});
    if(valid.length!==state.cart.length){state.cart=valid;save(STORAGE.cart,state.cart);}
    $("#cartItems").innerHTML=valid.length?valid.map(item=>{const product=getProduct(item.id);return `<div class="cart-line"><img src="${safe(product.image)}" alt="${safe(productText(product,"name"))}" onerror="this.onerror=null;this.src='${fallbackImage}'"><div><h4>${safe(productText(product,"name"))}</h4><p class="cart-size">${safe(t("chooseSize"))}: ${safe(item.size)}</p><span class="cart-line-price">${formatPrice(product.price)}</span><div class="quantity-controls"><button data-action="quantity" data-id="${safe(item.id)}" data-size="${safe(item.size)}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-action="quantity" data-id="${safe(item.id)}" data-size="${safe(item.size)}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-action="remove-cart" data-id="${safe(item.id)}" data-size="${safe(item.size)}" aria-label="${safe(t("remove"))}">×</button></div>`;}).join(""):`<div class="drawer-empty drawer-empty-action"><p>${safe(t("emptyCart"))}</p><a class="button" href="#collection" data-close><span>${safe(t("continueShopping"))}</span><span>↗</span></a></div>`;
    const subtotal=valid.reduce((sum,item)=>sum+getProduct(item.id).price*item.quantity,0),progress=Math.min(100,subtotal/FREE_SHIPPING_THRESHOLD*100),copy=shippingCopy[state.lang]||shippingCopy.ru;
    $("#cartSubtotal").textContent=formatPrice(subtotal);$("#shippingProgressBar").style.width=`${progress}%`;$("#shippingProgressMessage").textContent=subtotal>=FREE_SHIPPING_THRESHOLD?copy.unlocked:copy.remaining(money.format(FREE_SHIPPING_THRESHOLD-subtotal));$(".shipping-progress").classList.toggle("is-unlocked",subtotal>=FREE_SHIPPING_THRESHOLD);$("#cartFooter").classList.toggle("hidden",!valid.length);renderCounts();
  }
  function renderWishlist(){
    const valid=state.wishlist.filter(id=>getProduct(id));if(valid.length!==state.wishlist.length){state.wishlist=valid;save(STORAGE.wishlist,state.wishlist);}
    $("#wishlistItems").innerHTML=valid.length?valid.map(id=>{const product=getProduct(id);return `<div class="wishlist-line"><img src="${safe(product.image)}" alt="${safe(productText(product,"name"))}" onerror="this.onerror=null;this.src='${fallbackImage}'"><div><h4>${safe(productText(product,"name"))}</h4><p>${formatPrice(product.price)}</p></div><button class="remove-item" data-action="favorite" data-id="${safe(id)}" aria-label="${safe(t("remove"))}">×</button><button class="button" data-action="details" data-id="${safe(id)}">${safe(t("quickView"))} ↗</button></div>`;}).join(""):`<div class="drawer-empty drawer-empty-action"><p>${safe(t("emptyWishlist"))}</p><a class="button" href="#collection" data-close><span>${safe(t("continueShopping"))}</span><span>↗</span></a></div>`;renderCounts();
  }
  function openPanel(id){closePanels(false);$("#overlay").classList.add("open");$("#overlay").setAttribute("aria-hidden","false");const panel=document.getElementById(id);if(panel){panel.classList.add("open");panel.setAttribute("aria-hidden","false");}document.body.style.overflow="hidden";}
  function closePanels(hideOverlay=true){$$(".drawer.open").forEach(panel=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true");});$$(".modal.open").forEach(panel=>{panel.classList.remove("open");panel.setAttribute("aria-hidden","true");});if(hideOverlay){$("#overlay").classList.remove("open");$("#overlay").setAttribute("aria-hidden","true");document.body.style.overflow="";}}
  function addToCart(id,size){if(!size){toast(t("chooseSize"),"error");return false;}const product=getProduct(id);if(!product||(product.sizes||[]).length&&!product.sizes.includes(size))return false;const line=state.cart.find(item=>item.id===id&&item.size===size);if(line&&line.quantity>=MAX_CART_QUANTITY){toast(cartLimitCopy[state.lang]||cartLimitCopy.ru,"error");return false;}if(line)line.quantity+=1;else state.cart.push({id,size,quantity:1});persist();renderCart();updateCardSizeState(id,size);toast(t("addedToCart"));return true;}
  function toggleFavorite(id){if(!getProduct(id))return;if(state.wishlist.includes(id)){state.wishlist=state.wishlist.filter(item=>item!==id);toast(t("removedFromWishlist"));}else{state.wishlist.push(id);toast(t("addedToWishlist"));}persist();renderCatalog();renderWishlist();}
  function openProductDetail(id){if(!getProduct(id))return;state.detailId=id;state.selectedSize="";renderProductDetail(id);openPanel("productModal");}
  function renderProductDetail(id){
    const product=getProduct(id);if(!product)return;const reviews=backendMode?runtime.apiReviews.filter(review=>review.product_id===id).map(review=>({...review,date:review.created_at})):state.reviews[id]||[];
    $("#productDetail").innerHTML=`<img class="product-detail-image" src="${safe(product.image)}" alt="${safe(productText(product,"name"))}" onerror="this.onerror=null;this.src='${fallbackImage}'"><div class="product-detail-copy"><p class="eyebrow"><span class="eyebrow-line"></span>${safe(t(product.category))}</p><h2>${safe(productText(product,"name"))}</h2><span class="detail-price">${formatPrice(product.price)}</span><p class="detail-description">${safe(productText(product,"description"))}</p><strong style="font-size:9px;color:var(--muted)">${safe(t("chooseSize"))}</strong><div class="detail-sizes">${(product.sizes||["XS","S","M","L"]).map(size=>`<button class="size-button ${state.selectedSize===size?"active":""}" data-action="size" data-size="${safe(size)}" aria-pressed="${state.selectedSize===size}">${safe(size)}</button>`).join("")}</div>${sizeGuideMarkup()}<button class="button button-full detail-add-button" data-action="add-detail" data-id="${safe(id)}" ${state.selectedSize?"":"disabled"}><span>${safe(state.selectedSize?t("addToCart"):t("chooseSize"))}</span><span>↗</span></button><div class="reviews-heading"><h3>${safe(t("reviewTitle"))}</h3><span class="product-rating">★ ${Number(product.rating||0).toFixed(1)}</span></div><div class="review-list">${reviews.length?reviews.map(review=>`<div class="review-item"><strong>${safe(review.name)} · <span class="product-rating">${"★".repeat(review.rating)}</span></strong><p>${safe(review.text)}</p></div>`).join(""):`<div class="review-item">${safe(t("noReviews"))}</div>`}</div><h3 style="font-size:15px;margin:17px 0 8px">${safe(t("writeReview"))}</h3><form class="review-form" id="reviewForm" data-id="${safe(id)}"><label style="display:flex;align-items:center;gap:12px">${safe(t("rating"))}<select name="rating" required><option value="5">★★★★★</option><option value="4">★★★★☆</option><option value="3">★★★☆☆</option><option value="2">★★☆☆☆</option><option value="1">★☆☆☆☆</option></select></label><textarea name="text" required maxlength="500" placeholder="${safe(t("reviewPlaceholder"))}"></textarea><button class="button" type="submit" ${backendMode&&!runtime.configured?"disabled":""}>${safe(t("submitReview"))} ↗</button></form></div>`;
  }
  function checkoutShipping(){
    if($('select[name="delivery"]',$("#checkoutForm")).value==="pickup")return 0;
    const subtotal=state.cart.reduce((sum,item)=>sum+(getProduct(item.id)?.price||0)*item.quantity,0);
    return subtotal>=FREE_SHIPPING_THRESHOLD?0:COURIER_SHIPPING;
  }
  function updateCheckoutAddress(){
    const address=$('input[name="address"]',$("#checkoutForm"));
    const pickup=$('select[name="delivery"]',$("#checkoutForm")).value==="pickup";
    address.required=!pickup;
    address.closest("label").classList.toggle("hidden",pickup);
  }
  function renderCheckout(){const items=state.cart.filter(item=>getProduct(item.id));const subtotal=items.reduce((sum,item)=>sum+getProduct(item.id).price*item.quantity,0),copy=shippingCopy[state.lang]||shippingCopy.ru;$("#checkoutItems").innerHTML=items.map(item=>`<div class="checkout-summary-item"><span>${safe(productText(getProduct(item.id),"name"))} · ${safe(item.size)} × ${item.quantity}</span><strong>${formatPrice(getProduct(item.id).price*item.quantity)}</strong></div>`).join("");$('option[value="courier"]',$("#checkoutForm")).textContent=subtotal>=FREE_SHIPPING_THRESHOLD?copy.courierFree:copy.courier;$("#checkoutSubtotal").textContent=formatPrice(subtotal);$("#checkoutShipping").textContent=checkoutShipping()===0?copy.free:formatPrice(checkoutShipping());$("#checkoutTotal").textContent=formatPrice(subtotal+checkoutShipping());}
  function renderUserState(){const logged=Boolean(state.user);$("#accountSession").classList.toggle("hidden",!logged);$("#authForm").classList.toggle("hidden",logged);if(logged)$("#accountSession").innerHTML=`<p>${safe(t("signedInAs"))} <strong>${safe(state.user.name||state.user.email)}</strong></p><p>${safe(state.user.email)} ${state.user.role==="admin"?"· ADMIN":""}</p><button class="button button-full" id="accountLogout">${safe(t("logout"))}</button>${state.user.role==="admin"?'<button class="text-button" id="accountAdmin" style="margin-top:12px">Open admin panel</button>':""}`;}
  function setAuthMode(mode){$$(".auth-tab").forEach(button=>button.classList.toggle("active",button.dataset.authMode===mode));const register=mode==="register";$(".auth-name").classList.toggle("hidden",!register);$('input[name="name"]',$(".auth-name")).required=register;$("#authSubmitLabel").textContent=t(register?"register":"login");$('input[name="password"]',$("#authForm")).autocomplete=register?"new-password":"current-password";}
  function openAuth(admin=false){$("#authForm").reset();renderUserState();setAuthMode("login");$("#authHelp").textContent=backendMode?"Войдите или создайте аккаунт через защищённую базу пользователей.":t("authDemoNote");$("#oauthActions").classList.toggle("hidden",!backendMode||!runtime.oauthProviders.length);if(admin&&!backendMode)$('input[name="email"]',$("#authForm")).value="admin@velvet.com";openPanel("authModal");}
  function renderAdmin(){
    $("#adminStats").innerHTML=`<div class="stat-card"><span>${safe(t("productsMetric"))}</span><strong>${state.products.length}</strong></div><div class="stat-card"><span>${safe(t("salesMetric"))}</span><strong>${state.orders.length}</strong></div><div class="stat-card"><span>${safe(t("viewOrders"))}</span><strong>${formatPrice(state.orders.reduce((sum,order)=>sum+(Number(order.total)||0),0))}</strong></div>`;
    $("#adminProductList").innerHTML=state.products.map(product=>`<div class="admin-product-row"><img src="${safe(product.image)}" alt="" onerror="this.onerror=null;this.src='${fallbackImage}'"><span>${safe(productText(product,"name"))}<small>${formatPrice(product.price)} · ${safe(t(product.category))} · ${safe((product.sizes||[]).join(", "))}</small></span><button class="admin-edit-button" data-action="edit-product" data-id="${safe(product.id)}">${safe(adminText("edit"))}</button><button data-action="delete-product" data-id="${safe(product.id)}" aria-label="${safe(adminText("delete"))}">×</button></div>`).join("")||`<p class="admin-empty">${safe(t("emptyCatalog"))}</p>`;
    const dateLocale={ru:"ru-RU",en:"en-US",kg:"ky-KG",kz:"kk-KZ"}[state.lang]||"ru-RU";
    $("#adminOrderList").innerHTML=state.orders.length?state.orders.slice().reverse().map(order=>{
      const date=order.date&&Number.isFinite(Date.parse(order.date))?new Intl.DateTimeFormat(dateLocale,{dateStyle:"medium",timeStyle:"short"}).format(new Date(order.date)):"";
      const items=Array.isArray(order.items)?order.items.map(item=>`${safe(item.name||productText(getProduct(item.id)||{name:{ru:""}}, "name"))} · ${safe(item.size)} × ${Number(item.quantity)||1}`).join("<br>"):"";
      const orderStatus=["new","processing","completed","cancelled"].includes(order.status)?order.status:"new";
      return `<article class="admin-order-card"><div class="admin-order-heading"><strong>${safe(adminText("order"))} ${safe(order.displayId||order.id)}</strong><span>${safe(date)}</span></div><p>${safe(adminText("customer"))}: ${safe(order.customer)} · ${safe(order.email)}</p>${order.phone?`<p>${safe(adminText("phone"))}: ${safe(order.phone)}</p>`:""}${order.address?`<p>${safe(adminText("address"))}: ${safe(order.address)}</p>`:""}<p>${safe(adminText("delivery"))}: ${safe(order.delivery==="pickup"?t("pickup"):t("courier"))}</p><p>${safe(adminText("payment"))}: ${safe(paymentLabel(order.payment))}</p><p>${safe(adminText("orderItems"))}:<br>${items||"—"}</p><div class="admin-order-footer"><strong class="admin-order-total">${formatPrice(order.total)}</strong><label>${safe(adminText("status"))}<select data-order-status data-order-id="${safe(order.id)}"><option value="new" ${orderStatus==="new"?"selected":""}>${safe(adminText("newStatus"))}</option><option value="processing" ${orderStatus==="processing"?"selected":""}>${safe(adminText("processingStatus"))}</option><option value="completed" ${orderStatus==="completed"?"selected":""}>${safe(adminText("completedStatus"))}</option><option value="cancelled" ${orderStatus==="cancelled"?"selected":""}>${safe(adminText("cancelledStatus"))}</option></select></label></div></article>`;
    }).join(""):`<p class="admin-empty">${safe(adminText("noOrders"))}</p>`;
    $("#adminOrdersTitle").textContent=`${adminText("orders")} · ${state.orders.length}`;
    const visits=read(STORAGE.visits,[]);
    $("#adminVisitList").innerHTML=Array.isArray(visits)&&visits.length?visits.slice().reverse().map(visit=>`<article class="admin-order-card"><div class="admin-order-heading"><strong>${safe(adminText("visit"))}</strong><span>${safe(visit.date)} · ${safe(visit.time)}</span></div><p>${safe(visit.name)} · ${safe(visit.phone)}</p></article>`).join(""):`<p class="admin-empty">${safe(adminText("noVisits"))}</p>`;
    $("#adminVisitsTitle").textContent=`${adminText("visits")} · ${Array.isArray(visits)?visits.length:0}`;
    $("#productFormTitle").textContent=state.adminEditingProductId?adminText("editingProduct"):t("addProduct");
    $("#productSubmitLabel").textContent=state.adminEditingProductId?adminText("updateProduct"):t("saveProduct");
    $("#cancelProductEdit").classList.toggle("hidden",!state.adminEditingProductId);
    $("#adminOrdersTitle").textContent=`${adminText("orders")} · ${state.orders.length}`;
    $("#adminVisitsTitle").textContent=`${adminText("visits")} · ${Array.isArray(visits)?visits.length:0}`;
    $("#productBadgeLabel").textContent=adminText("badge");
    const badgeSelect=$('select[name="badge"]',$("#productForm"));
    badgeSelect.options[0].textContent=adminText("noBadge");
    badgeSelect.options[1].textContent=t("new");
    badgeSelect.options[2].textContent=t("sale");
    $("#cancelProductEdit").textContent=adminText("cancelEdit");
  }
  function renderAdminChart(orders){
    const recent=orders.slice(0,7).reverse();
    if(!recent.length){$("#adminChart").innerHTML="";return;}
    const values=recent.map(order=>Number(order.total)||0),max=Math.max(...values,1);
    const points=values.map((value,index)=>`${24+index*52},${104-value/max*82}`).join(" ");
    $("#adminChart").innerHTML=`<svg viewBox="0 0 360 128" role="img" aria-label="Последние заказы"><polyline points="${points}" fill="none" stroke="var(--gold)" stroke-width="2"/>${values.map((value,index)=>`<circle cx="${24+index*52}" cy="${104-value/max*82}" r="3" fill="var(--gold)"><title>${safe(formatPrice(value))}</title></circle>`).join("")}</svg>`;
  }
  async function loadAdminData(){
    if(!backendMode){renderAdmin();return;}
    if(!runtime.configured)throw new Error("Серверная база данных не настроена.");
    const [stats,orders,visits,firstPage]=await Promise.all([
      apiRequest("admin/stats"),apiRequest("admin/orders"),apiRequest("admin/bookings"),apiRequest("products?page=1&pageSize=24&category=all")
    ]);
    let allProducts=firstPage.products||[];
    for(let page=2;page<=(firstPage.pages||1);page++){
      const next=await apiRequest(`products?page=${page}&pageSize=24&category=all`);
      allProducts=allProducts.concat(next.products||[]);
    }
    state.products=allProducts;renderCatalog();
    state.orders=orders.map(order=>({
      id:order.id,displayId:order.order_number||order.id,date:order.created_at,customer:order.customer,email:order.email,phone:order.phone,
      address:order.address,delivery:order.delivery,payment:order.payment,total:order.total,status:order.status==="complete"?"completed":order.status,
      items:Array.isArray(order.items)?order.items.map(item=>({...item,name:typeof item.name==="object"?(item.name[state.lang]||item.name.ru||""):item.name})):[],
    }));
    save(STORAGE.orders,state.orders);
    renderAdmin();
    $("#adminStats").innerHTML=`<div class="stat-card"><span>${safe(t("productsMetric"))}</span><strong>${Number(stats.products)||0}</strong></div><div class="stat-card"><span>${safe(t("salesMetric"))}</span><strong>${Number(stats.orders)||0}</strong></div><div class="stat-card"><span>${safe(t("viewOrders"))}</span><strong>${safe(formatPrice(stats.revenue))}</strong></div>`;
    renderAdminChart(state.orders);
    const mappedVisits=visits.map(visit=>({date:visit.visit_date,time:visit.visit_time,name:visit.name,phone:visit.phone}));
    $("#adminVisitList").innerHTML=mappedVisits.length?mappedVisits.map(visit=>`<article class="admin-order-card"><div class="admin-order-heading"><strong>${safe(adminText("visit"))}</strong><span>${safe(visit.date)} · ${safe(visit.time)}</span></div><p>${safe(visit.name)} · ${safe(visit.phone)}</p></article>`).join(""):`<p class="admin-empty">${safe(adminText("noVisits"))}</p>`;
    $("#adminVisitsTitle").textContent=`${adminText("visits")} · ${mappedVisits.length}`;
  }
  function startProductEdit(id){
    if(state.user?.role!=="admin")return;
    const product=getProduct(id);if(!product)return;
    state.adminEditingProductId=id;
    const form=$("#productForm");
    $('input[name="name"]',form).value=productText(product,"name");
    $('textarea[name="description"]',form).value=productText(product,"description");
    $('input[name="price"]',form).value=product.price;
    $('select[name="category"]',form).value=product.category;
    $('input[name="image"]',form).value=product.image;
    $('input[name="sizes"]',form).value=(product.sizes||[]).join(", ");
    $('select[name="badge"]',form).value=product.badge||"";
    renderAdmin();
    $('input[name="name"]',form).focus();
  }
  function cancelProductEdit(){
    state.adminEditingProductId=null;
    $("#productForm").reset();
    $('input[name="sizes"]',$("#productForm")).value="XS, S, M, L";
    renderAdmin();
  }
  function showAdmin(){if(state.user?.role!=="admin"){toast(t("adminAccess"),"error");return;}renderAdmin();openPanel("adminModal");loadAdminData().catch(error=>toast(`Не удалось загрузить данные панели: ${error.message}`,"error"));}
  async function deleteProduct(id){
    if(state.user?.role!=="admin")throw new Error(t("adminAccess"));
    if(backendMode)await apiRequest(`products/${encodeURIComponent(id)}`,{method:"DELETE"});
    state.products=state.products.filter(product=>product.id!==id);
    state.cart=state.cart.filter(item=>item.id!==id);
    state.wishlist=state.wishlist.filter(item=>item!==id);
    if(state.adminEditingProductId===id)cancelProductEdit();
    if(state.detailId===id)state.detailId=null;
    persist();renderAdmin();renderCatalog();renderCart();renderWishlist();toast(t("productDeleted"));
  }

  document.addEventListener("click",event=>{
    const clicked=event.target.closest("button");
    const clickedId=clicked?.id;
    const target=event.target.closest("[data-action]");
    if(target){
      const {action,id}=target.dataset;
      if(action==="favorite")toggleFavorite(id);
      if(action==="details")openProductDetail(id);
      if(action==="quick-size")addToCart(id,target.dataset.size);
      if(action==="clear-filter"){
        const filter=target.dataset.filter;
        if(filter==="all"){state.category="all";state.search="";state.favoritesOnly=false;state.sort="newest";$("#searchInput").value="";$("#sortSelect").value=state.sort;}
        if(filter==="category")state.category="all";
        if(filter==="search"){state.search="";$("#searchInput").value="";}
        if(filter==="favorites")state.favoritesOnly=false;
        if(filter==="sort"){state.sort="newest";$("#sortSelect").value=state.sort;}
        refreshCatalog();
      }
      if(action==="size"){state.selectedSize=target.dataset.size;$$(".size-button",$("#productDetail")).forEach(button=>{const selected=button.dataset.size===state.selectedSize;button.classList.toggle("active",selected);button.setAttribute("aria-pressed",String(selected));});const addButton=$(".detail-add-button",$("#productDetail"));addButton.disabled=false;$("span:first-child",addButton).textContent=t("addToCart");}
      if(action==="add-detail")addToCart(id,state.selectedSize);
      if(action==="quantity"){const line=state.cart.find(item=>item.id===id&&item.size===target.dataset.size);if(line){if(Number(target.dataset.delta)>0&&line.quantity>=MAX_CART_QUANTITY){toast(cartLimitCopy[state.lang]||cartLimitCopy.ru,"error");return;}line.quantity+=Number(target.dataset.delta);if(line.quantity<=0)state.cart=state.cart.filter(item=>item!==line);persist();renderCart();updateCardSizeState(id,target.dataset.size);}}
      if(action==="remove-cart"){state.cart=state.cart.filter(item=>!(item.id===id&&item.size===target.dataset.size));persist();renderCart();updateCardSizeState(id,target.dataset.size);toast(t("removedFromCart"));}
      if(action==="edit-product")startProductEdit(id);
      if(action==="delete-product"&&state.user?.role==="admin")deleteProduct(id).catch(error=>toast(`Не удалось удалить товар: ${error.message}`,"error"));
    }
    if(event.target.closest("[data-close]"))closePanels();
    if(event.target.id==="overlay")closePanels();
    if(clickedId==="cartOpen"){renderCart();openPanel("cartDrawer");}
    if(clickedId==="wishlistToggle"){renderWishlist();openPanel("wishlistDrawer");}
    if(clickedId==="accountOpen")openAuth();
    if(clickedId==="themeToggle"){state.theme=state.theme==="dark"?"light":"dark";save(STORAGE.theme,state.theme);renderTheme();}
    if(clickedId==="checkoutOpen"){
      if(!state.cart.length){toast(t("emptyCart"));return;}
      if(backendMode&&!runtime.configured){toast("Оформление временно недоступно: сервер магазина не подключён. Попробуйте позже.","error");return;}
      const form=$("#checkoutForm");form.reset();if(state.user)$('input[name="name"]',form).value=state.user.name||"";updateCheckoutAddress();renderCheckout();openPanel("checkoutModal");
    }
    if(clickedId==="filterToggle"){state.favoritesOnly=!state.favoritesOnly;renderCatalog();}
    if(clickedId==="clearSearch")clearCatalogSearch();
    if(clickedId==="resetCatalog"){state.search="";state.category="all";state.favoritesOnly=false;state.sort="newest";$("#searchInput").value="";$("#sortSelect").value=state.sort;refreshCatalog();}
    if(clickedId==="loadMoreProducts"){
      clicked.disabled=true;loadRemoteProducts(false).catch(error=>toast(`Не удалось загрузить товары: ${error.message}`,"error")).finally(()=>{clicked.disabled=false;});
    }
    if(clickedId==="menuToggle"){const open=$("#mainNav").classList.toggle("open");clicked.setAttribute("aria-expanded",String(open));}
    if(clickedId==="adminLogout"||clickedId==="accountLogout"){if(state.adminEditingProductId)cancelProductEdit();if(backendMode)clearSession();else state.user=null;persist();renderUserState();closePanels();toast(t("logoutSuccess"));}
    if(clickedId==="accountAdmin")showAdmin();
    if(clickedId==="cancelProductEdit")cancelProductEdit();
    if(clickedId==="printReceipt")window.print();
  });
  $("#adminOrderList").addEventListener("change",async event=>{
    const select=event.target.closest("[data-order-status]");
    if(!select)return;
    if(state.user?.role!=="admin"){toast(t("adminAccess"),"error");return;}
    if(!["new","processing","completed","cancelled"].includes(select.value)){renderAdmin();return;}
    const order=state.orders.find(item=>item.id===select.dataset.orderId);
    if(!order){renderAdmin();return;}
    const previousStatus=order.status;
    order.status=select.value;
    try{
      if(backendMode){
        if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");
        await apiRequest(`admin/orders/${encodeURIComponent(order.id)}`,{method:"PATCH",body:{status:select.value}});
      }else save(STORAGE.orders,state.orders);
      toast(adminText("orderUpdated"));
    }catch(error){order.status=previousStatus;renderAdmin();toast(`Не удалось обновить заказ: ${error.message}`,"error");}
  });
  $("#categoryTabs").addEventListener("click",event=>{const button=event.target.closest("[data-category]");if(button){state.category=button.dataset.category;refreshCatalog();}});
  $("#sortSelect").addEventListener("change",event=>{state.sort=event.currentTarget.value;refreshCatalog();});
  let searchTimer,searchRequest=0;
  function clearCatalogSearch(){
    state.search="";$("#searchInput").value="";$("#searchInput").focus();refreshCatalog();
  }
  $("#searchInput").addEventListener("input",event=>{
    state.search=event.target.value;
    const request=++searchRequest;
    if(backendMode&&runtime.configured){
      window.clearTimeout(searchTimer);
      searchTimer=window.setTimeout(()=>loadRemoteProducts(true,()=>request===searchRequest).catch(error=>{if(request===searchRequest)toast(`Не удалось обновить каталог: ${error.message}`,"error");}),250);
    }else renderCatalog();
  });
  $("#searchInput").addEventListener("keydown",event=>{if(event.key==="Escape"&&event.currentTarget.value){clearCatalogSearch();}});
  let languageEffectTimer;
  $("#languageSelect").addEventListener("change",event=>{if(translations[event.target.value]){state.lang=event.target.value;persist();document.body.classList.remove("language-changing");void document.body.offsetWidth;document.body.classList.add("language-changing");applyLanguage();window.clearTimeout(languageEffectTimer);languageEffectTimer=window.setTimeout(()=>document.body.classList.remove("language-changing"),500);}});
  $$(".main-nav a").forEach(link=>link.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));
  $$(".auth-tab").forEach(button=>button.addEventListener("click",()=>setAuthMode(button.dataset.authMode)));

  $("#authForm").addEventListener("submit",async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
    const data=new FormData(form),mode=$(".auth-tab.active").dataset.authMode,email=String(data.get("email")).trim().toLowerCase(),password=String(data.get("password")),button=$('button[type="submit"]',form);
    button.disabled=true;
    try{
      if(backendMode){
        if(!runtime.configured)throw new Error("Сервер авторизации не настроен.");
        const name=String(data.get("name")||"").trim();
        const result=await apiRequest(mode==="register"?"auth/signup":"auth/login",{method:"POST",body:mode==="register"?{name,email,password}:{email,password}});
        setSession(result);toast(mode==="register"?t("registerSuccess"):result.user.role==="admin"?t("adminAccess"):t("loginSuccess"));
        persist();renderUserState();form.reset();
        if(state.user.role==="admin"){closePanels();showAdmin();}else closePanels();
      }else{
      await mockApi(()=>true);const users=read("vv-users-v1",[]);
      if(mode==="register"){
        const name=String(data.get("name")).trim();
        if(users.some(user=>user.email===email)){toast("An account with this email already exists.","error");return;}
        const salt=createPasswordSalt(),digest=await passwordDigest(password,salt);
        users.push({name,email,salt,passwordDigest:digest});save("vv-users-v1",users);
        state.user={name,email,role:"user",token:btoa(unescape(encodeURIComponent(JSON.stringify({sub:email,role:"user",iat:Date.now()}))))};toast(t("registerSuccess"));
      }else{
        const admin=email==="admin@velvet.com",found=users.find(user=>user.email===email);
        const validUser=found?.salt&&found?.passwordDigest&&await passwordDigest(password,found.salt)===found.passwordDigest;
        if(!admin&&!validUser){toast("Email or password is incorrect.","error");return;}
        const user=found||{email,name:"VELVET & VOID Admin"},role=admin?"admin":"user";
        state.user={name:user.name||user.email,email,role,token:btoa(unescape(encodeURIComponent(JSON.stringify({sub:email,role,iat:Date.now()}))))};toast(admin?t("adminAccess"):t("loginSuccess"));
      }
      persist();renderUserState();form.reset();
      if(state.user.role==="admin"){closePanels();showAdmin();}else closePanels();
      }
    }catch(error){console.error("Authentication failed",error);toast(`Не удалось войти: ${error.message}`,"error");}
    finally{button.disabled=false;}
  });
  $("#checkoutForm").addEventListener("change",event=>{if(event.target.name==="delivery"){updateCheckoutAddress();renderCheckout();}});
  $("#checkoutForm").addEventListener("submit",async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
    if(!state.cart.length){toast(t("emptyCart"),"error");closePanels();return;}
    const data=new FormData(form),items=state.cart.filter(item=>getProduct(item.id)).map(item=>({...item,name:productText(getProduct(item.id),"name"),price:getProduct(item.id).price}));
    const subtotal=items.reduce((sum,item)=>sum+item.price*item.quantity,0),shipping=checkoutShipping();
    let order={id:`VV-${Date.now().toString(36).toUpperCase()}`,items,subtotal,shipping,total:subtotal+shipping,payment:data.get("payment"),delivery:data.get("delivery"),customer:String(data.get("name")),email:String(data.get("email")),phone:String(data.get("phone")),address:String(data.get("address")),date:new Date().toISOString(),status:"new"};
    const button=$('button[type="submit"]',form);button.disabled=true;
    try{
      if(backendMode){
        if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");
        const response=await apiRequest("orders",{method:"POST",body:{customer:order.customer,email:order.email,phone:order.phone,address:order.address,delivery:order.delivery,payment:order.payment,items:state.cart.map(item=>({id:item.id,size:item.size,quantity:item.quantity}))}});
        order={...order,id:response.order.order_number||response.order.id,total:Number(response.order.total)||order.total};
        order.subtotal=order.total-shipping;
        if(response.order.notification?.configured&&!response.order.notification.sent)toast("Заказ сохранён, но уведомление Telegram не отправлено.","error");
      }else await mockApi(()=>{state.orders.push(order);save(STORAGE.orders,state.orders);});
      $("#receiptMessage").textContent=t("orderThanks");
      $("#receiptDetails").innerHTML=`<div>${safe(t("orderId"))}: <strong>${safe(order.id)}</strong></div><div>${safe(t("yourName"))}: <strong>${safe(order.customer)}</strong></div><div>${safe(t("payment"))}: <strong>${safe(paymentLabel(order.payment))}</strong></div><div>${safe(t("subtotal"))}: <strong>${safe(formatPrice(order.subtotal))}</strong></div><div>${safe(t("shipping"))}: <strong>${safe(formatPrice(shipping))}</strong></div><div>${safe(t("total"))}: <strong>${safe(formatPrice(order.total))}</strong></div>`;
      state.cart=[];persist();renderCart();closePanels(false);openPanel("receiptModal");form.reset();if(backendMode&&state.user?.role==="admin")loadAdminData().catch(error=>toast(error.message,"error"));else renderAdmin();
    }catch(error){console.error("Checkout failed",error);toast(`Не удалось оформить заказ: ${error.message}`,"error");}
    finally{button.disabled=false;}
  });
  function paymentLabel(value){return value==="stripe"?"Stripe (demo)":value==="mbank"?"MBANK / O!Деньги":"Cash / terminal";}
  async function uploadProductImage(file){
    if(!runtime.configured||!runtime.cloudinaryCloudName||!runtime.cloudinaryUploadPreset)throw new Error("Загрузка изображений не настроена.");
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>8*1024*1024)throw new Error("Выберите JPG, PNG или WebP размером до 8 МБ.");
    const formData=new FormData();formData.append("file",file);formData.append("upload_preset",runtime.cloudinaryUploadPreset);
    const response=await fetch(`https://api.cloudinary.com/v1_1/${encodeURIComponent(runtime.cloudinaryCloudName)}/image/upload`,{method:"POST",body:formData});
    const result=await response.json().catch(()=>({}));
    if(!response.ok||!result.secure_url)throw new Error(result.error?.message||"Cloudinary не принял изображение.");
    return result.secure_url;
  }
  $('input[name="imageFile"]').addEventListener("change",async event=>{
    const file=event.target.files?.[0];if(!file)return;
    const input=event.target,form=$("#productForm");
    try{input.disabled=true;$('input[name="image"]',form).value=await uploadProductImage(file);toast("Изображение загружено.");}
    catch(error){toast(`Не удалось загрузить изображение: ${error.message}`,"error");}
    finally{input.disabled=false;}
  });
  $("#productForm").addEventListener("submit",async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;
    if(state.user?.role!=="admin"){toast(t("adminAccess"),"error");return;}
    const data=new FormData(form),image=String(data.get("image")).trim();let parsed;
    try{parsed=new URL(image);}catch{toast(t("invalidImage"),"error");return;}
    if(parsed.protocol!=="https:"){toast(t("invalidImage"),"error");return;}
    const name=String(data.get("name")).trim(),description=String(data.get("description")).trim(),price=Number(data.get("price")),category=String(data.get("category")),badge=String(data.get("badge")),sizes=[...new Set(String(data.get("sizes")).split(",").map(size=>size.trim().toUpperCase()).filter(Boolean))];
    if(!name||!description||!Number.isInteger(price)||price<=0||!sizes.length||sizes.some(size=>!["XS","S","M","L"].includes(size))){toast(t("fillRequired"),"error");return;}
    if(!["outerwear","suits","knitwear"].includes(category)){toast(adminText("invalidCategory"),"error");return;}
    if(!["","new","sale"].includes(badge)){toast(t("fillRequired"),"error");return;}
    const editingProduct=getProduct(state.adminEditingProductId);
    const product=editingProduct?{...editingProduct,category,name:{...(typeof editingProduct.name==="object"?editingProduct.name:{}),[state.lang]:name},description:{...(typeof editingProduct.description==="object"?editingProduct.description:{}),[state.lang]:description},price,image:parsed.href,sizes,badge}:{id:`custom-${Date.now()}`,category,name:{ru:name,en:name,kg:name,kz:name},description:{ru:description,en:description,kg:description,kz:description},price,image:parsed.href,sizes,badge:badge||"new",rating:0,reviews:0};
    const button=$('button[type="submit"]',form);button.disabled=true;
    try{
      if(backendMode){
        if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");
        const result=await apiRequest(editingProduct?`products/${encodeURIComponent(editingProduct.id)}`:"products",{method:editingProduct?"PATCH":"POST",body:product});
        product.id=result.id;
        if(editingProduct){const index=state.products.findIndex(item=>item.id===editingProduct.id);if(index<0)throw new Error("Товар больше не найден.");state.products[index]=result;}
        else state.products.unshift(result);
      }else await mockApi(()=>{
        if(editingProduct){const index=state.products.findIndex(item=>item.id===editingProduct.id);if(index<0)throw new Error("Product no longer exists");state.products[index]=product;}
        else state.products.unshift(product);
      });
      const wasEditing=Boolean(editingProduct);state.adminEditingProductId=null;persist();renderAdmin();renderCatalog();renderCart();form.reset();$('input[name="sizes"]',form).value="XS, S, M, L";if(state.detailId===product.id)renderProductDetail(product.id);toast(wasEditing?adminText("productUpdated"):t("productSaved"));
    }
    catch(error){console.error("Catalog save failed",error);toast(`Не удалось сохранить товар: ${error.message}`,"error");}
    finally{button.disabled=false;}
  });
  $("#visitForm").addEventListener("submit",async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=new FormData(form),date=String(data.get("date"));
    if(date<new Date().toISOString().slice(0,10)){toast("Please choose a future date.","error");return;}
    const visit={name:String(data.get("name")),phone:String(data.get("phone")),date,time:String(data.get("time")),createdAt:new Date().toISOString()},button=$('button[type="submit"]',form);button.disabled=true;
    try{if(backendMode){if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");const response=await apiRequest("bookings",{method:"POST",body:{name:visit.name,phone:visit.phone,date:visit.date,time:visit.time}});if(response.notification?.configured&&!response.notification.sent)toast("Запись сохранена, но уведомление Telegram не отправлено.","error");}else await mockApi(()=>{const visits=read(STORAGE.visits,[]);visits.push(visit);save(STORAGE.visits,visits);});form.reset();toast(t("visitSuccess"));if(backendMode&&state.user?.role==="admin")loadAdminData().catch(error=>toast(error.message,"error"));}
    catch(error){console.error("Atelier booking failed",error);toast(`Не удалось записать вас: ${error.message}`,"error");}
    finally{button.disabled=false;}
  });
  $("#newsletterForm").addEventListener("submit",async event=>{
    event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const email=String(new FormData(form).get("email")).trim().toLowerCase(),button=$('button[type="submit"]',form);button.disabled=true;
    try{if(backendMode){if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");await apiRequest("newsletter",{method:"POST",body:{email}});}else await mockApi(()=>{const subscribers=read("vv-subscribers-v1",[]);if(!subscribers.includes(email)){subscribers.push(email);save("vv-subscribers-v1",subscribers);}});form.reset();toast(t("newsletterSuccess"));}
    catch(error){console.error("Newsletter subscription failed",error);toast(`Не удалось подписать на рассылку: ${error.message}`,"error");}
    finally{button.disabled=false;}
  });
  $("#productDetail").addEventListener("submit",async event=>{
    if(event.target.id!=="reviewForm")return;event.preventDefault();const form=event.target;if(!form.reportValidity())return;
    const data=new FormData(form),id=form.dataset.id,text=String(data.get("text")).trim();if(!state.reviews[id])state.reviews[id]=[];
    try{
      const review={name:state.user?.name||"Guest",rating:Number(data.get("rating")),text,date:new Date().toISOString()};
      if(backendMode){
        if(!runtime.configured)throw new Error("Сервер базы данных не настроен.");
        const saved=await apiRequest("reviews",{method:"POST",body:{productId:id,name:review.name,rating:review.rating,text}});
        runtime.apiReviews.unshift({...saved,product_id:id,date:saved.created_at});
        const productReviews=runtime.apiReviews.filter(item=>item.product_id===id);
        const product=getProduct(id);if(product){product.reviews=productReviews.length;product.rating=Number((productReviews.reduce((sum,item)=>sum+Number(item.rating),0)/productReviews.length).toFixed(1));}
      }else{
        state.reviews[id].unshift(review);
        const product=getProduct(id);if(product){const reviews=state.reviews[id];product.reviews=reviews.length;product.rating=Number((reviews.reduce((sum,item)=>sum+item.rating,0)/reviews.length).toFixed(1));}
        persist();
      }
      renderProductDetail(id);renderCatalog();renderCustomerReviews();toast(t("reviewSaved"));
    }catch(error){toast(`Не удалось сохранить отзыв: ${error.message}`,"error");}
  });
  document.addEventListener("keydown",event=>{if(event.key==="Escape"){closePanels();$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}});
  const visitDate=$('input[name="date"]',$("#visitForm"));if(visitDate)visitDate.min=new Date().toISOString().slice(0,10);
  window.addEventListener("error",event=>{setAppStatus(`Ошибка интерфейса: ${event.message||"Неизвестная ошибка"}`,"error");});
  window.addEventListener("unhandledrejection",event=>{const message=event.reason instanceof Error?event.reason.message:"Неизвестная ошибка";setAppStatus(`Не удалось выполнить действие: ${message}`,"error");});
  setupMotion();renderTheme();applyLanguage();renderCart();renderWishlist();renderUserState();
  if(!backendMode&&(window.location.pathname.replace(/\/+$/,"")==="/admin"||new URLSearchParams(window.location.search).has("admin"))){
    if(state.user?.role==="admin")showAdmin();
    else openAuth(true);
  }
  initializeBackend();
  window.setTimeout(()=>$("#loadingScreen").classList.add("done"),650);
})();
