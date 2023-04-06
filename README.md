## Задание:

Реализовать приложение на React-Native CLI (iOS, Android)  
 Приложение:  
делает запрос на простейший API  
выводит список полученных элементов  
по нажатию на элемент списка - дополнительная информация об элементе списка отображается на следующем экране.  
Обновление списка необходимо реализовать по времени или по действию пользователя.  
API:  
 https://docs.github.com/en/rest/reference/activity#list-public-events  
Требования:  
Должен быть предоставлен прокручиваемый список (экран №1) с элементами, по нажатию на которые должна производиться навигация на экран деталей сущности списка (экран №2).  
На экране №1 отобразить 25 элементов из API и обновлять их каждые 60 секунд.  
При прокрутке списка - обновление приостанавливается.  
Пользователь может обновить список на экране №1, если с времени последнего обновления прошло более 15 секунд.  
Когда переходим на экран №2, обновление элементов на экране №1 прекращается и отсчет времени до обновления списка сбрасывается. Когда возвращаемся на экран №1 с экрана №2 список обновляется немедленно. Отсчет времени до возможности ручного обновления списка также начинается заново.  
Обязательны к использованию: react-navigation, redux  
Результат должен быть в публичном репозитории с readme.