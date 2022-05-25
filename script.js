let prijava_popup = document.getElementById('pop-up-prijava');
let registracija_popup = document.getElementById('pop-up-reg')
let pozadina = document.getElementById('transparent')

var pozorista = null;

kartice = document.getElementsByClassName("cards-lg")[0]

let url_korisnici = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/korisnici.json";
let url_pozorista = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/pozorista.json";
let url_predstave = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/predstave.json";


// Dobavljanje podataka sa firebase
let request_korisnici = new XMLHttpRequest();
request_korisnici.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      korisnici = JSON.parse(this.responseText);
    }
  }
};
request_korisnici.open("GET", url_korisnici);
request_korisnici.send();

let request_pozorista = new XMLHttpRequest();
request_pozorista.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      pozorista = JSON.parse(this.responseText);
      if (document.URL.includes("index.html")) {
        prikazi_pozorista(pozorista);
      }
    }
  }
};
request_pozorista.open("GET", url_pozorista);
request_pozorista.send();

let request_predstave = new XMLHttpRequest();
request_predstave.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      predstave = JSON.parse(this.responseText);
    }
  }
};
request_predstave.open("GET", url_predstave);
request_predstave.send();


//index.hmtl
console.log(pozorista); //NE RADI MI KAO GLOBAL

function prikazi_pozorista(pozorista){
  for (let element in pozorista){
    pozoriste_card = document.createElement("a", "col-4");
    pozoriste_card.classList.add("card");
    pozoriste_card.addEventListener("click", function() {
      localStorage.setItem("pozoriste", element)
    })
    pozoriste_card.href = "pozoriste.html"

    pozoriste_slika = document.createElement("img");
    pozoriste_slika.className = "card-img-top";
    pozoriste_slika.src = pozorista[element].slika;
    pozoriste_card.appendChild(pozoriste_slika);

    pozoriste_izgled = document.createElement("div");
    pozoriste_izgled.className = "card-body";
    pozoriste_card.appendChild(pozoriste_izgled);

    card_ime_pozorista = document.createElement("h4");
    card_ime_pozorista.innerHTML = pozorista[element].naziv;
    pozoriste_izgled.appendChild(card_ime_pozorista);

    card_opis_pozorista = document.createElement("p");
    card_opis_pozorista.innerHTML = pozorista[element].adresa + "<br>Broj predstava: " + pozorista[element].brojPredstava;
    pozoriste_izgled.appendChild(card_opis_pozorista);

    kartice.appendChild(pozoriste_card);
  }
}


// Pop-up za registraciju i za prijavu
dugme_prijava = document.getElementById('dugme-prijava');
dugme_prijava.addEventListener('click', function(e){
  registracija_popup.style.display = 'none';
  prijava_popup.style.display = 'block';
  pozadina.style.opacity = '0.7';
})

dugme_registracija = document.getElementById('dugme-reg');
dugme_registracija.addEventListener('click', function(e){
  prijava_popup.style.display = 'none';
  registracija_popup.style.display = 'block';
  pozadina.style.opacity = '0.7';
})

dugme_izlaz_prij = document.getElementById('button-close-prijava');
dugme_izlaz_prij.addEventListener('click', function(e){
  prijava_popup.style.display = 'none';
  if (window.getComputedStyle(registracija_popup).display === 'none')
    pozadina.style.opacity = '1';
})

dugme_izlaz_reg = document.getElementById('button-close-registracija');
dugme_izlaz_reg.addEventListener('click', function(e){
  registracija_popup.style.display = 'none';
  if (window.getComputedStyle(prijava_popup).display === 'none')
    pozadina.style.opacity = '1';
})
