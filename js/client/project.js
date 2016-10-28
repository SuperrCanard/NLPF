$(document).ready(function () {

		$("#submitCompensation").click(createCompensation);
		$("#submitProject").click(submit);
	});

    var index = 1;
    var listCompensation = [];
    var compName = false;
    var compAmount = false;
    var compDesc = false;
    var projName = false;
    var projAuthor = false;
    var projDesc = false;
    var projContact = false;
    var projImage = false;

    function Delete(champ)
    {
    	champ.parentElement.parentElement.remove();
    }

	function createCompensation()
	{
		var compensationName = document.getElementById("compensationname").value;
		console.log($(compensationName));
		$("#displayCompensation").after($('<span id="compensation' + index + '"></span>'));
		displayCompensationDetails("#compensation" + index, $("#compensationname").val(),
								 $("#compensationdesc").val(), $("#amount").val(), index);
		var compensation = {
			id : index,
			name : $("#compensationname").val(),
			description : $("#compensationdesc").val(),
			amount : $("#amount").val()
		};
		listCompensation.push(compensation);
		++index;
		 verifProject();
	}

	function submit()
	{
		var projectName = $('#projectname').val();
		var projectDesc = $('#projectdesc').val();
		var projectAuthor = $('#authorname').val();
		var projectContact = $('#contact').val();
		var projectImage = "./images/" + $('#projectimage').val();
		var date = new Date();

		
		var myproject = {
			name : projectName, 
			gain : 0, 
			date : date, 
			description : projectDesc, 
			author : projectAuthor, 
			contact : projectContact,
            image: projectImage, 
			compensations : listCompensation
			};

		socket.emit('newProject', myproject);
		 window.location = './index.html';
	}

	function submitCompensation()
	{
		var projectName = $('#projectname').val();
		var projectDesc = $('#projectdesc').val();
		var projectAuthor = $('#authorname').val();
		var projectContact = $('#contact').val();
		var date = new Date();
		var myproject = {
			name : projectName, 
			gain : 0, 
			date : date, 
			description : projectDesc, 
			author : projectAuthor, 
			contact : projectContact,
            image: "" 
		};

		socket.emit('newProject', myproject);
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

	   if(champ.value.length < 2 || champ.value.length >= 40)
	   {
	      surligne(champ, true);
	      alert("Veuillez entrer un nom ne dépassant pas les 40 caractères");
	      switch(champ.id)
	      {
	      	case 'compensationname':
	      		compName = false;
	      		break;
	      	case 'projectname':
	      		projName = false;
	      		break;
	      	case 'authorname':
	      		projAuthor = false;
	      		break;
	      	default:
	      		return false;
	      }
	      
	   }
	   else
	   {
	      surligne(champ, false);
	      switch(champ.id)
		  {
	      	case 'compensationname':
	      		compName = true;
	      		break;
  			case 'projectname':
	      		projName = true;
	      		break;
	      	case 'authorname':
	      		projAuthor = true;
	      		break;
	      	default:
	      		return true;
	      }
	   }
	   verifCompensation();
	   verifProject();
	}

	function verifDesc(champ)
	{
		if (champ.value.length < 140)
		{
			surligne(champ, true);
		    alert("Veuillez entrer une description supérieur à 140 caractères");
		    projDesc = false;
		}
		else
		{
			surligne(champ, false);
    		projDesc = true;
	
		}
		verifCompensation();
	    verifProject();
	}

	function verifDescCompensation(champ)
	{
		if (champ.value.length < 40)
		{
			surligne(champ, true);
		    alert("Veuillez entrer une description supérieur à 40 caractères");
		    compDesc = false;
		}
		else
		{
			surligne(champ, false);
    		compDesc = true;
		}
		verifCompensation();
	    verifProject();
	}

	function verifMail(champ)
	{
	   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
	   if(!regex.test(champ.value))
	   {
	      surligne(champ, true);
	      alert("Veuillez entrer une adresse mail valide");
	      projContact = false;
	   }
	   else
	   {
	      surligne(champ, false);
	      projContact = true;
	   }
	   verifProject();
	}


	function verifUrl(champ)
	{
	   if(champ.value.length <= 1)
	   {
	      surligne(champ, true);
	      alert("Veuillez entrer une url valide");
	      projImage = false;
	   }
	   else
	   {
	      surligne(champ, false);
	      projImage = true;
	   }
	   verifProject();
	}

	function verifAmount(champ)
	{
	   var amount = parseInt(champ.value);
	   if(isNaN(amount) || amount < 1)
	   {
	      surligne(champ, true);
	      alert("Veuillez indiquer un montant positif");
	      compAmount = false;
	   }
	   else
	   {
	      surligne(champ, false);
	      compAmount = true;
	   }
	   verifCompensation();
	   verifProject();
	}

	function verifCompensation()
	{
	   if(compAmount && compDesc && compName)
	   {
   			document.getElementById('submitCompensation').disabled = '';
	   }
	   else
	   {
	    	document.getElementById('submitCompensation').disabled = 'disabled';  
	   }
	}

	function verifProject()
	{
		console.log(projAuthor, projDesc, projName, projContact, index);
	   if(projAuthor && projDesc && projName && projImage && projContact && index > 1)
	   {
   			document.getElementById('submitProject').disabled = '';
	   }
	   else
	   {
	    	document.getElementById('submitProject').disabled = 'disabled';  
	   }
	}
