import {renderSearchMusic, renderSongs } from "./ui.js";

//* Inputa girilen veriye göre aratacağımız api key
const options = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260",
        "x-rapidapi-host": "shazam.p.rapidapi.com",
    },
};
const optionsTop = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "92f8a72de5msh9603ca7bfc2c56fp1356f9jsn1db464323983",
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
};

export class API {
    constructor() {
        this.songs = [];
    }
    //* searchMusic metoduna dışarıdan query paremetresi gönderdik
    async searchMusic(query) {
        try{
            //* dışarıdan gönderilen değere göre apiye istek attık
            const res = await fetch(
               `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&limit=5`,
                options
            );
            //* gelen cevabı jsona çevirdik
            const data = await res.json();
            let newData = data.tracks.hits;

            newData = newData.map((song) => ({...song.track}))
            this.songs = newData;

            renderSearchMusic(this.songs);
        } catch (error) {
            //* hata olursa yakalar
            console.log(error);
        }
    }

    async topPopular() {
        const url = 
       "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry";

        try {
            const res = await fetch(url, optionsTop);
            const result = await res.json();
            this.songs = result.tracks;
            renderSongs(this.songs);
        } catch (error) {
            console.log(error);
        }
    }
              
}
    

