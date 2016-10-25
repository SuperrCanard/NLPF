$(document).ready(function () {

	});

	function surligne(champ, erreur)
	{
	   if(erreur)
	      champ.style.backgroundColor = "#fba";
	   else
	      champ.style.backgroundColor = "";
	}


	function verifName(champ)
	{
	   if(champ.value.length < 2 || champ.value.length > 40)
		   {
		      surligne(champ, true);
		      alert("Veuillez entrer un nom ne dépassant pas les 40 charactères");
		      return false;
		   }
		   else
		   {
		      surligne(champ, false);
		      return true;
		   }
	}

	function verifMail(champ)
	{
	   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
	   if(!regex.test(champ.value))
	   {
	      surligne(champ, true);
	      alert("Veuillez entrer une adresse mail valide");
	      return false;
	   }
	   else
	   {
	      surligne(champ, false);
	      return true;
	   }
	}

	function verifPassword(champ)
	{
	   var amount = parseInt(champ.value);
	   if(isNaN(amount) || amount < 1)
	   {
	      surligne(champ, true);
	      alert("Veuillez entrer un password valide");
	      return false;
	   }
	   else
	   {
	      surligne(champ, false);
	      return true;
	   }
	}