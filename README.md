Vanilla JS Hava Durumu Arama Uygulaması

Bu proje, kullanıcının girdiği şehir adları için anlık hava durumu bilgisini gösteren, tamamen Vanilla JavaScript, HTML ve CSS ile yazılmış tek sayfalık bir web uygulamasıdır. Hiçbir framework veya ek kütüphane kullanılmamıştır; asenkron veri akışı, state yönetimi, veri kalıcılığı ve DOM manipülasyonu doğrudan tarayıcı API’leri üzerinden yönetilir.

Çözdüğü Problem

Tekrarlı API istekleri ve gereksiz ağ trafiği, aranan şehirlerin hafızada tutulması ve validasyonla engellenir.
Sayfa yenilendiğinde kaybolan veri problemi, localStorage ile çözülür; kullanıcı daha önce baktığı şehirleri yeniden yazmak zorunda kalmaz.
DOM ile veri modelinin kopuk olması problemi, closure tabanlı silme mantığıyla çözülür; karttan silinen şehir aynı anda state’ten ve localStorage’dan da silinir.

Proje Mimarisi

.├── index.html   # Basit form ve sonuç alanı├── style.css    # Modern, gradient tabanlı arayüz stilleri└── app.js       # Tüm iş mantığı ve DOM etkileşimi (Vanilla JS)
Tüm iş mantığı app.js içinde, tek bir giriş noktası (index.html > app.js) üzerinden yönetilir. Arayüz, sadece temel form ve sonuç alanından oluşan, tek sayfalık bir yapıdadır.

Öne Çıkan Mühendislik Hamleleri

1. Asenkron Veri Akışı ve Hata Yönetimi
Hava durumu verisi, doğrudan fetch API’si ile asenkron olarak çekilir.
HTTP hata kodları response.ok kontrolü ile manuel olarak doğrulanır; başarısız isteklerde throw new Error(...) kullanılarak hata kontrollü biçimde fırlatılır.
try...catch bloğu ile istek sürecindeki tüm hatalar merkezi olarak yakalanır ve yönetilir. Bu yaklaşım, framework kullanmadan, yalnızca yerel tarayıcı API’leri ile asenkron veri akışının kontrollü yönetimini gösterir.

2. State Management (Durum Yönetimi)
Aranan şehirler, bellek içinde tutulan bir array (arananSehirler) ile yönetilir.
Input’tan gelen şehir adı trim() ile temizlenir, boş string girişleri engellenir ve böylece gereksiz API istekleri kesilir.
Aynı şehir ikinci kez girildiğinde, dizi içinde includes kontrolü yapılarak kullanıcı uyarılır ve ek istek atılmaz. Böylece hem gereksiz istekler engellenir hem de arayüzde tekrar eden kartlar oluşmaz.

3. Veri Kalıcılığı (Persistence)
arananSehirler array’i, localStorage üzerinde kayitliSehirler anahtarıyla saklanır.
Sayfa yenilendiğinde, ilk satırlarda localStorage’dan okuma yapılır ve state bu veriye göre yeniden kurulur.
baslangictaKartlariYukle fonksiyonu, bu state’i kullanarak DOM’u baştan render eder ve kullanıcıya daha önce aradığı şehirleri tekrar gösterir. Böylece state ve UI, sayfa yenilemelerine karşı dayanıklı, kalıcı bir yapıya kavuşur.

4. Kusursuz DOM Manipülasyonu
Her şehir için kartlar, document.createElement ve innerHTML ile dinamik olarak oluşturulur; silme butonu programatik olarak eklenir.
Silme işlemi, her kartın kendi şehir adını closure ile saklayan click event handler’ı üzerinden yapılır.
Sil butonuna basıldığında:
İlgili kart DOM’dan silinir,
Aynı şehir, arananSehirler array’inden çıkarılır,
Güncel dizi tekrar localStorage içine yazılır.
Bu yapı sayesinde DOM, bellek içi state ve localStorage tam senkron tutulur; tek bir kullanıcı aksiyonu ile üç katmanda da tutarlı bir silme işlemi gerçekleşir.

Kurulum ve Çalıştırma

Herhangi bir build aracı veya paket yöneticisi gerekmez.
Depoyu indirin veya dosyaları yerel bir klasöre alın.
index.html dosyasını modern bir tarayıcıda açmanız yeterlidir.
Kendi WeatherAPI anahtarınızı kullanmak için app.js içindeki API_KEY sabitini kendi anahtarınızla değiştirin.

Kullanım

Arama alanına şehir adını yazın ve Ara butonuna tıklayın.
Şehir için anlık sıcaklık bilgisi kart olarak listelenir.
Aynı şehri tekrar aramaya çalıştığınızda, uygulama bunu tespit eder ve yeni istek atmaz.
Sayfayı yenilediğinizde, daha önce aradığınız şehirler otomatik olarak yeniden yüklenir.
İstemediğiniz bir şehri Sil butonuyla kaldırdığınızda, veri hem ekrandan hem bellekten hem de localStorage’dan temizlenir.

Teknik Notlar

Proje, tamamen Vanilla JS ile, herhangi bir framework veya üçüncü parti state yönetim kütüphanesi olmadan geliştirilmiştir.
Asenkron veri yönetimi, hata kontrolü, state yönetimi, veri kalıcılığı ve DOM manipülasyonu yalnızca tarayıcı API’leri ile çözümlenmiştir.
Amaç, küçük bir hava durumu uygulaması üzerinden temel ama önemli frontend mühendisliği prensiplerini yalın bir kod tabanında göstermek ve framework bağımlılığı olmadan da temiz bir mimari kurulabileceğini kanıtlamaktır.