let prijava_popup = document.getElementById('pop-up-prijava');
let registracija_popup = document.getElementById('pop-up-reg')
let pozadina = document.getElementById('transparent')

let url_korisnici = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/korisnici.json";
let url_pozorista = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/pozorista.json";
let url_predstave = "https://web-dizajn-a94be-default-rtdb.firebaseio.com/predstave.json";


// Dobavljanje podataka sa firebase
let request_korisnici = new XMLHttpRequest();
request_korisnici.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let korisnici = JSON.parse(this.responseText);
    }
  }
};
request_korisnici.open("GET", url_korisnici);
request_korisnici.send();

let request_pozorista = new XMLHttpRequest();
request_pozorista.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let pozorista = JSON.parse(this.responseText);
    }
  }
};
request_pozorista.open("GET", url_pozorista);
request_pozorista.send();

let request_predstave = new XMLHttpRequest();
request_predstave.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {
      let predstave = JSON.parse(this.responseText);
    }
  }
};
request_predstave.open("GET", url_predstave);
request_predstave.send();


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
