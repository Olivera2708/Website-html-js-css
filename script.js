let url_korisnici = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/korisnici.json";
let url_pozorista = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/pozorista.json";
let url_predstave = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/predstave.json";


// Dobavljanje podataka sa firebase
let request_korisnici = new XMLHttpRequest();
request_korisnici.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      korisnici = JSON.parse(this.responseText);
      if (document.URL.includes("admin.html")) {
        prikazi_sve_korisnike(korisnici);
      }
      if (document.URL.includes("/profil.html")){
        prikazi_korisnika(korisnici, sessionStorage.getItem("izabrani_korisnik"));
      }
      if (document.URL.includes("edit-profil.html")){
        prikazi_edit_profil(korisnici, sessionStorage.getItem("izabrani_korisnik"));
      }
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
      sessionStorage.setItem("predsatve", predstave);
      if (document.URL.includes("pozoriste.html")){
        prikazi_predstave(predstave, sessionStorage.getItem("izabrano_pozoriste"));
      }
      if (document.URL.includes("predstava.html")){
        prikazi_predstavu(predstave, sessionStorage.getItem("izabrana_predstava"));
      }
      if (document.URL.includes("edit-predstavu.html")){
        izmeni_predstavu(predstave, sessionStorage.getItem("izabrana_predstava"), sessionStorage.getItem("izabrano_pozoriste"));
      }
    }
  }
};
request_predstave.open("GET", url_predstave);
request_predstave.send();


//index.html
function prikazi_pozorista(pozorista){
  kartice = document.getElementsByClassName("cards-lg")[0]

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
      sessionStorage.setItem("izabrana_predstava", predstava_dat);
    })
    predstava.href = "predstava.html";

    //postavljanje adrese
    let adresa = document.getElementsByClassName("footer-text")[0];
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

    let opis_predstave = document.createElement("p");
    opis_predstave.className = "opis-predstave";
    opis_predstave.innerHTML = predstave[sifra_predstava][predstava_dat].kratakOpis;
    predstava_sredina.appendChild(opis_predstave);

    predstava.appendChild(predstava_sredina);

    //vl
    let vl = document.createElement("div");
    vl.className = "vl";

    predstava.appendChild(vl);

    //predstava-info
    let predstava_info = document.createElement("div");
    predstava_info.className = "predstava-info";

    let opis = document.createElement("p");
    opis.innerHTML = "Žanr: " + predstave[sifra_predstava][predstava_dat].zanr +
                      "<br>Trajanje: " +  predstave[sifra_predstava][predstava_dat].trajanje + " minuta" +
                      "<br>Cena: " + predstave[sifra_predstava][predstava_dat].cena + " dinara" +
                      "<br>Ocena: " + predstave[sifra_predstava][predstava_dat].ocena;

    predstava_info.appendChild(opis);

    predstava.appendChild(predstava_info);
    repertoar.appendChild(predstava);
  }
}

//predstava.html
function prikazi_predstavu(predstave, izabrana_predstava){
  sessionStorage.setItem("izabrana_predstava", izabrana_predstava);

  let naziv_predstave = document.getElementsByClassName("naziv-predstave-info")[0];
  let opis_predstave = document.getElementsByClassName("veliki-opis-predstave")[0];
  let predsatva_slika = document.getElementsByClassName("predstava-info-slika")[0];
  let predstava_podaci = document.getElementsByClassName("predstava-podaci")[0];

  let izabrano_pozoriste = sessionStorage.getItem("izabrano_pozoriste");
  let sifra_predstava = pozorista[izabrano_pozoriste].idPredstava;

  naziv_predstave.innerHTML = predstave[sifra_predstava][izabrana_predstava].naziv;
  opis_predstave.innerHTML = predstave[sifra_predstava][izabrana_predstava].opis;
  predsatva_slika.src = predstave[sifra_predstava][izabrana_predstava].slika;
  predstava_podaci.innerHTML = "Žanr: " + predstave[sifra_predstava][izabrana_predstava].zanr +
                                "<br>Trajanje: " + predstave[sifra_predstava][izabrana_predstava].trajanje + " minuta" +
                                "<br>Cena: " + predstave[sifra_predstava][izabrana_predstava].cena + " dinara" +
                                "<br>Maksimalan broj osoba: " + predstave[sifra_predstava][izabrana_predstava].maxOsobe;
}

//admin.html
function prikazi_sve_korisnike(korisnici){
  let user_list = document.getElementsByClassName("user-list")[0];

  for (let korisnik in korisnici){
    let user_card = document.createElement("a");
    user_card.className = "user-card col-lg-3 col-md-4";
    user_card.addEventListener("click", function(e){
      sessionStorage.setItem("izabrani_korisnik", korisnik);
    });
    user_card.href = "profil.html";

    let user_name = document.createElement("h3");
    user_name.className = "user-name";
    user_name.innerHTML = korisnici[korisnik].ime + " " + korisnici[korisnik].prezime;
    user_card.appendChild(user_name);

    let user_hr = document.createElement("hr");
    user_hr.className = "user-hr";
    user_card.appendChild(user_hr);

    let user_email = document.createElement("h4");
    user_email.className = "user-email";
    user_email.innerHTML = korisnici[korisnik].email;
    user_card.appendChild(user_email);

    let deaktiviraj = document.createElement("button");
    deaktiviraj.className = "btn btn-outline-danger btn-deaktiviraj";
    deaktiviraj.innerHTML = "Deaktiviraj";
    user_card.appendChild(deaktiviraj);

    user_list.appendChild(user_card);
  }
}

//profil.html
function prikazi_korisnika(korisnici, izabran_korisnik) {
  let korisnicko_ime = document.getElementsByClassName("profil-korisnicko-ime")[0];
  korisnicko_ime.innerHTML = korisnici[izabran_korisnik].korisnickoIme;

  let email = document.getElementsByClassName("profil-email")[0];
  email.innerHTML = korisnici[izabran_korisnik].email;

  let ime = document.getElementsByClassName("profil-unos ime")[0];
  ime.innerHTML = korisnici[izabran_korisnik].ime;

  let prezime = document.getElementsByClassName("profil-unos prezime")[0];
  prezime.innerHTML = korisnici[izabran_korisnik].prezime

  let datum_dat = korisnici[izabran_korisnik].datumRodjenja.split("-")

  let datum = document.getElementsByClassName("profil-unos datum")[0];
  datum.innerHTML = datum_dat[2] + "." + datum_dat[1] + "." + datum_dat[0] + ".";

  let broj = document.getElementsByClassName("profil-unos brojtel")[0];
  broj.innerHTML = korisnici[izabran_korisnik].telefon;

  let adresa_dat = korisnici[izabran_korisnik].adresa.split(", ");

  let adresa = document.getElementsByClassName("profil-unos adresa")[0];
  adresa.innerHTML = adresa_dat[0];

  let grad = document.getElementsByClassName("profil-unos grad")[0];
  grad.innerHTML = adresa_dat[1];
}

//edit-profil.html
function prikazi_edit_profil(korisnici, izabran_korisnik){
  let ime = document.getElementsByClassName("box ime-box")[0];
  ime.value = korisnici[izabran_korisnik].ime;

  let prezime = document.getElementsByClassName("box prezime-box")[0];
  prezime.value = korisnici[izabran_korisnik].prezime;

  let korisniko_ime = document.getElementsByClassName("box korisnicko-box")[0];
  korisniko_ime.value = korisnici[izabran_korisnik].korisnickoIme;

  let lozinka = document.getElementsByClassName("box password-box")[0];
  lozinka.value = korisnici[izabran_korisnik].lozinka;

  let email = document.getElementsByClassName("box email-box")[0];
  email.value = korisnici[izabran_korisnik].email;

  let datum = document.getElementsByClassName("box datum-box")[0];
  datum.value = korisnici[izabran_korisnik].datumRodjenja;

  let adresa_dat = korisnici[izabran_korisnik].adresa.split(", ");

  let adresa = document.getElementsByClassName("box adresa-box")[0];
  adresa.value = adresa_dat[0];

  let mesto = document.getElementsByClassName("box mesto-box")[0];
  mesto.value = adresa_dat[1];

  let telefon = document.getElementsByClassName("box telefon-box")[0];
  telefon.value = korisnici[izabran_korisnik].telefon;

  let sacuvaj = document.getElementsByClassName("btn btn-danger btn-profil-sacuvaj");
}

//edit-predsatvu.html
function izmeni_predstavu(predstave, izabrana_predstava, id_pozorista){
  sifra_predstava = pozorista[id_pozorista].idPredstava;

  let slika = document.getElementsByClassName("img-izmena-predstava")[0];
  slika.src = predstave[sifra_predstava][izabrana_predstava].slika;

  let naziv = document.getElementsByClassName("box-izmena naziv")[0];
  naziv.value = predstave[sifra_predstava][izabrana_predstava].naziv;

  let trajanje = document.getElementsByClassName("box-izmena trajanje")[0];
  trajanje.value = predstave[sifra_predstava][izabrana_predstava].trajanje;

  let zanr = document.getElementsByClassName("box-izmena zanr")[0];
  zanr.value = predstave[sifra_predstava][izabrana_predstava].zanr;

  let cena = document.getElementsByClassName("box-izmena cena")[0];
  cena.value = predstave[sifra_predstava][izabrana_predstava].cena;

  let osoba = document.getElementsByClassName("box-izmena osoba")[0];
  osoba.value = predstave[sifra_predstava][izabrana_predstava].maxOsobe;

  let kratak_opis = document.getElementsByClassName(".form-control box-izmena-text mali")[0];
  kratak_opis.innerHTML = predstave[sifra_predstava][izabrana_predstava].kratakOpis;

  let opis = document.getElementsByClassName(".form-control box-izmena-text veliki")[0];
  opis.innerHTML = predstave[sifra_predstava][izabrana_predstava].opis;

  obrisi = document.getElementsByClassName("btn btn-danger btn-predstava")[0];

  sacuvaj = document.getElementsByClassName("btn btn-outline-dark btn-predstava")[0];
}


// Pop-up za registraciju i za prijavu
let prijava_popup = document.getElementById('pop-up-prijava');
let registracija_popup = document.getElementById('pop-up-reg');
let pozadina = document.getElementsByClassName('transparent')[0];

dugme_prijava = document.getElementById('dugme-prijava');
dugme_prijava.addEventListener('click', function(e){
  pozadina.style.pointerEvents = 'none';
  document.body.style.overflowY = 'hidden'
  prijava_popup.style.display = 'block';
  pozadina.style.opacity = '0.5';
})

dugme_registracija = document.getElementById('dugme-reg');
dugme_registracija.addEventListener('click', function(e){
  pozadina.style.pointerEvents = 'none';
  document.body.style.overflowY = 'hidden'
  registracija_popup.style.display = 'block';
  pozadina.style.opacity = '0.5';
})

dugme_izlaz_prij = document.getElementById('button-close-prijava');
dugme_izlaz_prij.addEventListener('click', function(e){
  prijava_popup.style.display = 'none';
  pozadina.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'auto'
  pozadina.style.opacity = '1';
})

dugme_izlaz_reg = document.getElementById('button-close-registracija');
dugme_izlaz_reg.addEventListener('click', function(e){
  registracija_popup.style.display = 'none';
  pozadina.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'auto'
  pozadina.style.opacity = '1';
})
