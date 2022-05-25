let prijava_popup = document.getElementById('pop-up-prijava');
let registracija_popup = document.getElementById('pop-up-reg')
let pozadina = document.getElementById('transparent')

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
      sessionStorage.setItem("pozorista", JSON.stringify(pozorista));
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
      if (document.URL.includes("pozoriste.html")){
        prikazi_predstave(predstave, sessionStorage.getItem("izabrano_pozoriste"));
      }
    }
  }
};
request_predstave.open("GET", url_predstave);
request_predstave.send();


//index.html
function prikazi_pozorista(pozorista){
  for (let element in pozorista){
    pozoriste_card = document.createElement("a", "col-4");
    pozoriste_card.classList.add("card");
    pozoriste_card.addEventListener("click", function() {
      sessionStorage.setItem("izabrano_pozoriste", element)
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

//pozoriste.html
function prikazi_predstave(predstave, id_pozorista){
  let pozorista = JSON.parse(sessionStorage.getItem("pozorista"));
  sifra_predstava = pozorista[id_pozorista].idPredstava;

  //postavljanje slike i imena pozorista
  let pozoriste_ime = document.getElementsByClassName("pozoriste-ime")[0];
  pozoriste_ime.innerHTML = pozorista[id_pozorista].naziv;
  let slika_pozoriste = document.getElementsByClassName("slika-pozoriste")[0];
  slika_pozoriste.src = pozorista[id_pozorista].slika;
  slika_pozoriste.alt = pozorista[id_pozorista].naziv;

  //listanje svih predstava
  let repertoar = document.getElementsByClassName("repertoar")[0];
  for (let predstava_dat in predstave[sifra_predstava]){
    let predstava = document.createElement("a");
    predstava.className = "predstava";
    predstava.addEventListener("click", function() {
      sessionStorage.setItem("izabrana_predstava", predstave[sifra_predstava][predstava_dat]);
    })
    predstava.href = "predstava.html";

    //postavljanje adrese
    adresa = document.getElementsByClassName("footer-text")[0];
    adresa.innerHTML = "Adresa<br>" + pozorista[id_pozorista].adresa;

    //slika predstva
    let slika_predstava = document.createElement("img");
    slika_predstava.className = "slika-predstave";
    slika_predstava.src = predstave[sifra_predstava][predstava_dat].slika;
    slika_predstava.alt = predstave[sifra_predstava][predstava_dat].naziv;
    predstava.appendChild(slika_predstava);

    //predstava-sredina
    let predstava_sredina = document.createElement("div");
    predstava_sredina.className = "predstava-sredina";

    let naziv_prestave = document.createElement("h3");
    naziv_prestave.className = "naziv-predstave";
    naziv_prestave.innerHTML = predstave[sifra_predstava][predstava_dat].naziv;
    predstava_sredina.appendChild(naziv_prestave);

    opis_predstave = document.createElement("p");
    opis_predstave.className = "opis-predstave";
    opis_predstave.innerHTML = predstave[sifra_predstava][predstava_dat].kratakOpis;
    predstava_sredina.appendChild(opis_predstave);

    predstava.appendChild(predstava_sredina);

    //vl
    let vl = document.createElement("div");
    vl.className = "vl";

    predstava.appendChild(vl);

    //predstava-info
    predstava_info = document.createElement("div");
    predstava_info.className = "predstava-info";

    opis = document.createElement("p");
    opis.innerHTML = "Žanr: " + predstave[sifra_predstava][predstava_dat].zanr +
                      "<br>Trajanje: " +  predstave[sifra_predstava][predstava_dat].tajanje + " minuta" +
                      "<br>Cena: " + predstave[sifra_predstava][predstava_dat].cena + " dinara" +
                      "<br>Ocena: " + predstave[sifra_predstava][predstava_dat].ocena;

    predstava_info.appendChild(opis);

    predstava.appendChild(predstava_info);
    repertoar.appendChild(predstava);
  }
}

//predstava


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
