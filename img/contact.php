<?php

require_once('./echo.php');
require_once('./bibli.php');
// bufferisation des sorties
ob_start();

// démarrage de la session
session_start();
fd_nav("..",'class="nav1"');
fd_entete('Contact - Eponine GRAVIER','Developpeur', '..', '../css/style.css');

$form_action = '';

// copie ? (envoie une copie au visiteur)
$copie = 'non';

$destinataire = 'contact@eponinegravier.fr';

// Messages de confirmation du mail
$message_envoye = "Votre message nous est bien parvenu !";
$message_non_envoye = "L'envoi du mail a échoué, veuillez réessayer SVP.";

// Message d'erreur du formulaire
$message_formulaire_invalide = "Vérifiez que tous les champs soient bien remplis et que l'email soit sans erreur.";


// formulaire envoyé, on récupère tous les champs.
$nom     = (isset($_POST['nom']))     ? Rec($_POST['nom'])     : '';
$email   = (isset($_POST['email']))   ? Rec($_POST['email'])   : '';
$objet   = (isset($_POST['objet']))   ? Rec($_POST['objet'])   : '';
$message = (isset($_POST['message'])) ? Rec($_POST['message']) : '';

// On va vérifier les variables et l'email ...
$email = (IsEmail($email)) ? $email : ''; // soit l'email est vide si erroné, soit il vaut l'email entré
$err_formulaire = false; // sert pour remplir le formulaire en cas d'erreur si besoin

if (isset($_POST['envoi']))
{
	if (($nom != '') && ($email != '') && ($objet != '') && ($message != ''))
	{
		
		$headers  = 'From:'.$nom.' <'.$email.'>' . "\r\n";
		//$headers .= 'Reply-To: '.$email. "\r\n" ;
		//$headers .= 'X-Mailer:PHP/'.phpversion();

		// envoyer une copie au visiteur ?
		if ($copie == 'oui')
		{
			$cible = $destinataire.';'.$email;
		}
		else
		{
			$cible = $destinataire;
		};

		// Remplacement de certains caractères spéciaux
		$caracteres_speciaux     = array('&#039;', '&#8217;', '&quot;', '<br>', '<br />', '&lt;', '&gt;', '&amp;', '…',   '&rsquo;', '&lsquo;');
		$caracteres_remplacement = array("'",      "'",        '"',      '',    '',       '<',    '>',    '&',     '...', '>>',      '<<'     );

		$objet = html_entity_decode($objet);
		$objet = str_replace($caracteres_speciaux, $caracteres_remplacement, $objet);

		$message = html_entity_decode($message);
		$message = str_replace($caracteres_speciaux, $caracteres_remplacement, $message);

		// Envoi du mail
		$num_emails = 0;
		$tmp = explode(';', $cible);
		foreach($tmp as $email_destinataire)
		{
			if (mail($email_destinataire, $objet, $message, $headers))
				$num_emails++;
		}

		if ((($copie == 'oui') && ($num_emails == 2)) || (($copie == 'non') && ($num_emails == 1)))
		{
			echo '<main id="pg_cont">',
            '<section class="main animated fadeInUp" id="contact">',
            '<p>'.$message_envoye.'</p>',
            '</section>',
            '</main>';
		}
		else
		{
      echo '<main id="pg_cont">',
            '<section class="main animated fadeInUp" id="contact">',
            '<p>'.$message_non_envoye.'</p>',
            '</section>',
            '</main>';
		};
	}
	else
	{
		// une des 3 variables (ou plus) est vide ...
    // afficher le formulaire

		$err_formulaire = true;
	};
}; // fin du if (!isset($_POST['envoi']))

if (($err_formulaire) || (!isset($_POST['envoi'])))
{
	// afficher le formulaire
  echo  '<main id="pg_cont">',
        '<section class="main animated fadeInUp">',
        '<div class="title"><h2>Formulaire de contact</h2></div>',
				'<div id="contact">';
        if($err_formulaire) {
          	echo '<p style="color: red;">'.$message_formulaire_invalide.'</p>';
        }


  echo  '<form id="contact" action="'.$form_action.'" method="post">',
        '<label for="nom">Votre nom :</label>',
        '<input type="text" name="nom" id="nom" value="'.stripslashes($nom).'">',
        '<label for="email">Votre mail :</label>',
        '<input type="text" name="email" id="email" value="'.stripslashes($email).'">',
        '<label for="objet">Objet :</label>',
				'<select name="objet" id="objet">',
		    '<option value="Création de site">Création de site</option>',
				'<option value="Création d\'un site E-commerce">Création d\'un site E-commerce</option>',
		    '<option value="Souscription à un forfait mensuel de maintenance">Souscription à un forfait mensuel de maintenance</option>',
				'<option value="Maintenance sur un site fonctionnel">Maintenance sur un site fonctionnel</option>',
				'<option value="Autre">Autre</option>',
				'</select>',
        '<label for="message">Votre message :</label>',
        '<textarea name="message" cols="28" rows="8">'.stripslashes($message).'</textarea>',
        '<input type="submit" name="envoi" value="Envoyer">',
        '</form>',
				'</div>';


  echo      '</section>';
	fd_pied("..");
  echo       '</main>';
};
fdl_contenu();



ob_end_flush();


function fdl_contenu() {



}

function Rec($text)
{
	$text = htmlspecialchars(trim($text), ENT_QUOTES);
	if (1 === get_magic_quotes_gpc())
	{
		$text = stripslashes($text);
	}

	$text = nl2br($text);
	return $text;
};

function IsEmail($email)
{
	$value = preg_match('/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!\.)){0,61}[a-zA-Z0-9_-]?\.)+[a-zA-Z0-9_](?:[a-zA-Z0-9_\-](?!$)){0,61}[a-zA-Z0-9_]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/', $email);
	return (($value === 0) || ($value === false)) ? false : true;
}
?>
