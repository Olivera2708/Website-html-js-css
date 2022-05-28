let url_korisnici = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/korisnici.json";
let url_pozorista = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/pozorista.json";
let url_predstave = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/predstave.json";


// Dobavljanje podataka sa firebase
let request_korisnici = new XMLHttpRequest();
request_korisnici.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      korisnici = JSON.parse(this.responseText);
      sessionStorage.setItem("korisnici", JSON.stringify(korisnici));
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
let alert_prijava = document.getElementById('alert');

let navbar_prijava = document.getElementById('dugme-prijava');
let navbar_registracija = document.getElementById('dugme-reg');
let navbar_odjava = document.getElementById('dugme-odjava');
let navbar_profil = document.getElementById('dugme-profil');

//navbar
function prijavljen_navbar(){
  navbar_odjava.style.display = "block";
  navbar_profil.style.display = "block";
  navbar_prijava.style.display = "none";
  navbar_registracija.style.display = "none";
}

function odjavljen_navbar(){
  navbar_odjava.style.display = "none";
  navbar_profil.style.display = "none";
  navbar_prijava.style.display = "block";
  navbar_registracija.style.display = "block";
}

//info
function info_alert(string){
  let navbar = document.getElementById("navbar");
  let info = document.createElement("div");
  info.classList.add("alert",  "alert-success", "alert-dismissible", "fade", "show");
  info.setAttribute("role", "alert");
  info.width = "500px"
  info.innerHTML = string;
  info.style.display = "block";
  info.style.position = "absolute";
  info.style.top = "15vh";
  info.style.right = "5vw";

  let dugme = document.createElement("button");
  dugme.type = "button";
  dugme.className = "close";
  dugme.setAttribute("data-dismiss", "alert");
  dugme.ariaLabel = "close";

  let span = document.createElement("span");
  span.ariaHidden = "true";
  span.innerHTML = "&times;"

  dugme.appendChild(span);
  info.appendChild(dugme);

  //insert to absolute position
  document.body.appendChild(info);
}

if (sessionStorage.getItem("navbar") == "prijavljen"){
  prijavljen_navbar();
}
else {
  odjavljen_navbar();
}

//prijava
let korisnicko_ime_box = document.getElementsByClassName('box korisnicko-box')[0];
let lozinka_box = document.getElementsByClassName('box password-box')[0];

let prijavi_me = document.getElementsByClassName('btn btn-dark btn-login')[0];
prijavi_me.addEventListener('click', function(e){
  let lozinka = lozinka_box.value.trim();
  let korisnicko_ime = korisnicko_ime_box.value.trim();
  //regex porvera ispravnosti
  let korisnici = JSON.parse(sessionStorage.getItem("korisnici"));
  let uspeh = 0;
  for (let korisnik in korisnici){
    if (korisnici[korisnik].korisnickoIme == korisnicko_ime && korisnici[korisnik].lozinka == lozinka){
      sessionStorage.setItem("ulogovani_korisnik", korisnicko_ime);
      //promeni navbar
      sessionStorage.setItem("navbar", "prijavljen");
      prijavljen_navbar();
      //skloni pop-up
      reset_value();
      prijava_popup.style.display = 'none';
      pozadina.style.pointerEvents = 'auto';
      document.body.style.overflowY = 'auto'
      pozadina.style.opacity = '1';
      //sacuvaj ako ode u moj profil
      sessionStorage.setItem("izabrani_korisnik", korisnik);
      uspeh = 1
    }
  }
  if (uspeh == 0){
    alert_prijava.style.color = "red";
    alert_prijava.style.textAlign = "center"
    alert_prijava.innerHTML = "Ne postoji korsnik sa ovim korisničkim imenom i lozinkom"
  }
});

//registracija
ime_box = document.getElementsByClassName("box ime-box")[0];
prezime_box = document.getElementsByClassName("box prezime-box")[0];
korisnicko_ime_box_reg = document.getElementsByClassName("box korisnicko-box-reg")[0];
lozinka_box_reg = document.getElementsByClassName("box password-box-reg")[0];
email_box = document.getElementsByClassName("box email-box")[0];
datum_box = document.getElementsByClassName("box datum-box")[0];
adresa_box = document.getElementsByClassName("box adresa-box")[0];
grad_box = document.getElementsByClassName("box mesto-box")[0];
telefon_box = document.getElementsByClassName("box telefon-box")[0];
let alert_reg = document.getElementById('alert-reg');

let registruj_me = document.getElementsByClassName('btn btn-dark btn-reg')[0];
registruj_me.addEventListener('click', function(e){
  alert_reg.style.color = "red";
  alert_reg.style.textAlign = "center"
  let uspeh = 1;
  //provera imena
  reg_ime_prz = RegExp("^(?=.{1,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$");
  if (!reg_ime_prz.test(ime_box.value.trim())){
    uspeh = 0
    alert_reg.innerHTML = "Potrebno je uneti ime";
  }
  //provera prezimena
  if (!reg_ime_prz.test(prezime_box.value.trim())){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti prezime";
  }
  //provera korisnickog imena
  if ((korisnicko_ime_box_reg.value.trim()).length < 5){
    alert_reg.innerHTML = "Korisnicko ime mora imati vise od 4 karaktera";
  }
  for (let korisnik in korisnici){
    if (korisnicko_ime_box_reg.value.trim() == korisnici[korisnik].korisnickoIme){
      uspeh = 0
      alert_reg.innerHTML = "Izabrano korisnicko ime je zauzeto";
    }
  }
  //lozinka
  if (lozinka_box_reg.value.length < 7){
    uspeh = 0;
    alert_reg.innerHTML = "Lozinka mora sadrzati bar 7 karaktera";
  }
  //datum rodjenja
  if (!datum_box.value){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti datum"
  }
  let danas = new Date().toISOString().slice(0, 10);
  if (datum_box.value > danas){
    uspeh = 0;
    alert_reg.innerHTML = "Datum mora biti u prošlosti";
  }
  //adresa
  if (adresa_box.value.trim() == ""){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti adresu";
  }
  //mesto
  if (grad_box.value.trim() == ""){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti grad";
  }
  //broj telefona
  let reg_tel = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
  if (!reg_tel.test(telefon_box.value.trim())){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti broj telefona";
  }
  //email
  let reg_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!reg_email.test(email_box.value.trim())){
    uspeh = 0;
    alert_reg.innerHTML = "Potrebno je uneti validnu email adresu"
  }

  //provera jel sve uspesno
  if (uspeh == 1){
    sessionStorage.setItem("navbar", "prijavljen");
    prijavljen_navbar();
    console.log("USPEH");
    reset_value()
  }
});

function reset_value(){
  //prijava
  alert_prijava.innerHTML= "";
  korisnicko_ime_box.value = "";
  lozinka_box.value = "";

  //registracija
  alert_reg.innerHTML="";
  ime_box.value = "";
  korisnicko_ime_box_reg.value = "";
  lozinka_box_reg.value = "";
  prezime_box.value = "";
  email_box.value = "";
  datum_box.value = "";
  adresa_box.value = "";
  grad_box.value = "";
  telefon_box.value = "";
}

navbar_odjava.addEventListener('click', function(e){
  sessionStorage.setItem("navbar", "odjavljen");
  odjavljen_navbar();
  info_alert("Uspešno ste se izlogovali!");
})


navbar_prijava.addEventListener('click', function(e){
  pozadina.style.pointerEvents = 'none';
  document.body.style.overflowY = 'hidden'
  prijava_popup.style.display = 'block';
  pozadina.style.opacity = '0.5';
});

navbar_registracija.addEventListener('click', function(e){
  pozadina.style.pointerEvents = 'none';
  document.body.style.overflowY = 'hidden'
  registracija_popup.style.display = 'block';
  pozadina.style.opacity = '0.5';
});

let dugme_izlaz_prij = document.getElementById('button-close-prijava');
dugme_izlaz_prij.addEventListener('click', function(e){
  reset_value()
  prijava_popup.style.display = 'none';
  pozadina.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'auto'
  pozadina.style.opacity = '1';
});

let dugme_izlaz_reg = document.getElementById('button-close-registracija');
dugme_izlaz_reg.addEventListener('click', function(e){
  reset_value()
  registracija_popup.style.display = 'none';
  pozadina.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'auto'
  pozadina.style.opacity = '1';
});
