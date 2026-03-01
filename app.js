const API_KEY = "6f505250cde44efc851142411260103"
const BASE_URL= "http://api.weatherapi.com/v1/current.json"


const kinput = document.querySelector('#input')
const araButon = document.querySelector('#button')
const form = document.querySelector('.form')
const sonucEkrani = document.querySelector('.sonuc-wrapper')
let arananSehirler =JSON.parse(localStorage.getItem('kayitliSehirler')) || []

form.addEventListener('submit', async function havaDurumuGetir(e) {
    e.preventDefault();
    const sehirAdi=kinput.value.trim();
    if(!sehirAdi){
        console.log("şehir adı boş");
        return;
    }
    if(arananSehirler.includes(sehirAdi)){
        alert("bu şehir zaten ekranda");
        return;
    }
    arananSehirler.push(sehirAdi)
    localStorage.setItem('kayitliSehirler', JSON.stringify(arananSehirler))
    sehirKartiOlustur(sehirAdi)
})

async function sehirKartiOlustur(sehirAdi) {
    const url= `${BASE_URL}?key=${API_KEY}&q=${sehirAdi}&aqi=no`
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`hata. kod: ${response.status}`)
        }

        const data = await response.json();
        
        const div = document.createElement('div')
        div.className="card";
        div.innerHTML=`<h3> ${data.location.name}</h3>
        <p>Sıcaklık: ${data.current.temp_c}°C</p>
        `
        const silButon= document.createElement('button')
        silButon.innerHTML=`Sil`

        div.appendChild(silButon)
        sonucEkrani.appendChild(div)

        silButon.addEventListener('click',()=>{
            div.remove();
            const index = arananSehirler.indexOf(sehirAdi);
            if(index>-1){
                    arananSehirler.splice(index,1)
                    localStorage.setItem('kayitliSehirler',JSON.stringify(arananSehirler))
            }
        })
    } catch (hata) {
        console.error(hata.message)
        
    }
}

function baslangictaKartlariYukle(){
    const div = document.createElement('div')
    div.className="baslik"
    div.innerHTML=`<h2>Önceden baktıkığınız şehirler...</h2>`
    sonucEkrani.appendChild(div)
    arananSehirler.forEach((sehirAdi) => {
        sehirKartiOlustur(sehirAdi)
    });
}

baslangictaKartlariYukle();

console.log(arananSehirler);
