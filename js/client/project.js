$(document).ready(function () {

		$("#submitCompensation").click(createCompensation);
	});

    var index = 1;
	function createCompensation()
	{
		var compensationName = document.getElementById("compensationname").value;
		console.log($(compensationName));
		$("#displayCompensation").prepend($('<span id="compensation' + index + '"></span>'));
		displayCompensationDetails("#compensation" + index, $("#compensationname").val(),
								 $("#compensationdesc").val(), $("#amount").val());
		++index;
	}

	function submit()
	{
		var projectName = $('#projectname').val();
		var projectDesc = $('#projectdesc').val();
		var projectAuthor = $('#authorname').val();
		var projectContact = $('contact').val();
		var date = new Date();
		var myproject = Project.create(projectName, 0, date, projectDesc, projectAuthor, projectContact);

		socket.emit('newProject', {
			project : myproject
		});
		 window.location = '../index.html';
	}

	function submitCompensation()
	{
		var projectName = $('#projectname').val();
		var projectDesc = $('#projectdesc').val();
		var projectAuthor = $('#authorname').val();
		var projectContact = $('contact').val();
		var date = new Date();
		var myproject = Project.create(projectName, 0, date, projectDesc, projectAuthor, projectContact);

		socket.emit('newProject', {
			project : myproject
		});
		 window.location = '../index.html';
	}

	function surligne(champ, erreur)
	{
	   if(erreur)
	      champ.style.backgroundColor = "#fba";
	   else
	      champ.style.backgroundColor = "";
	}

	function verifName(champ)
	{
	   if(champ.value.length < 2 || champ.value.length > 25)
		   {
		      surligne(champ, true);
		      alert("Veuillez entrer un nom ne dépassant pas les 25 charactères");
		      return false;
		   }
		   else
		   {
		      surligne(champ, false);
		      return true;
		   }
	}

	function verifDesc(champ)
	{
		if (champ.value.length < 140)
		{
			surligne(champ, true);
		    alert("Veuillez entrer une description supérieur à 140 charactères");
		    return false
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

	function verifAmount(champ)
	{
	   var amount = parseInt(champ.value);
	   if(isNaN(amount) || amount < 1)
	   {
	      surligne(champ, true);
	      alert("Veuillez indiquer un montant positif");
	      return false;
	   }
	   else
	   {
	      surligne(champ, false);
	      return true;
	   }
	}

	function verifForm(f)
	{
	   var nameOk = verifName(f.name);
	   var mailOk = verifMail(f.email);
	   var amoutOk = verifAmount(f.amount);
	   if(nameOk && mailOk && amountOk)
	      return true;
	   else
	   {
	      alert("Veuillez remplir correctement tous les champs");
	      return false;
	   }
	   submit();
	}
