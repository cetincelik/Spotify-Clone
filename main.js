import {API} from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayInfo, updateTitle } from "./js/ui.js";


//* API clasının bir örneğini oluştur
const api = new API();

elements.form.addEventListener("submit", (e) => {
    //* Form gönderildiği anda sayfanın yenilenmesini engeller
    e.preventDefault();
    //* Inputun içerisinde ki değeri event üzerinden erişip değişkin aktardık
    const query = e.target[0].value;

    //* Inputun içerisinde herhangi bir veri yoksa ekrana bir alert bas
    //* ve fonksiyonu burda durdur
    if(!query) {
        alert("Lütfen bir müzik ismi giriniz!");
        return;
    }
    //* Inputa girilen paremetreyi updateTitle fonksiyonuna gönderir ve günceller
    updateTitle(`${query} İçin Sonuçlar`);

    api.searchMusic(query);
});
//* Sayfa yüklendiği anda popüler müzükleri ekrana aktarır
document.addEventListener("DOMContentLoaded", async () => {
    await api.topPopular();
});

const playMusic = (url) => {
    //* müziğin urlini htmle aktarma
    elements.audioSource.src = url;
    //* audio elementinin müziği yüklemesini sağladık
    elements.audio.load();
    //* audio elementinin müzüği oynatmasını sağlar
    elements.audio.play();
};

const handleClick = (e) => {
    //* Tıkladığımız etiketin idsi play-btn ise bu blok çalışır
    if(e.target.id === "play-btn") {
        const prent = e.target.closest(".card"); //* parentElement yerine kullanırız en yakın parent a götürür
        renderPlayInfo(prent.dataset);
        //* müziği çalar
        playMusic(prent.dataset.url); 
    }
};
//* fotoğrafa animate classını ekler
const animatePhoto = () => {
    const img = document.querySelector(".info img");
    img.className = "animate";
};
//* fotoğrafa animate classını kaldırır
const stopAnimation = () => {
  const img = document.querySelector(".info img");
  img.classList.remove("animate");  
};

//* sayfada tıklanma olaylarını izler
document.addEventListener("click", handleClick);
//* Müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);