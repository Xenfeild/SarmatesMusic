<?php
require_once 'pdo.php';

$dtest = "contact@sarmates-music.com";
$table = "contacts";

function getUserIpAddr(){
    if(!empty($_SERVER['HTTP_CLIENT_IP'])){
        //ip from share internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        //ip pass from proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }else{
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

// timer
date_default_timezone_set('Europe/Paris');
$userIp = getUserIpAddr();
$dateReq = $_SERVER['REQUEST_TIME'];
// date autorisation : $dateReq + 5 minutes
$dateAut = $dateReq +(5*60);

// Variables default response Js fetch
$rep = [];
$status = 200;
$srvMsg = "Le message est transmis";

// reading IP and  date in the database
$historique = $pdo->query('SELECT ip, authTime FROM '.$table.' WHERE ip="'.$userIp.'" AND authTime>"'.$dateReq.'";');
while ($donnees = $historique->fetch())
{
    if(($donnees['ip'] == $userIp) && ($donnees['authTime'] > $dateReq)) {
        $srvMsg= "SECURITE : Vous avez déjà envoyé un message il y a moins de 5 minutes, merci de patienter.";
        $status = 429;
    }
}

$historique->closeCursor(); // Fin de traitement historique

if($status == 200){
    //préparation requette écriture
    $req = $pdo->prepare("INSERT INTO $table (ip, authTime, prenom, nom, mail, society, message)
        VALUES(:userIp, :dateAut, :prenom, :nom, :mail, :society, :message)");
    //Ecriture dans la BDD
    $req->execute(array(
        'userIp' => $userIp,
        'dateAut' => $dateAut,
        'prenom' => trim(htmlspecialchars($_POST['name'])),
        'nom' => trim(htmlspecialchars($_POST['surename'])),
        'mail' => trim(htmlspecialchars($_POST['email'])),
        'society' => trim(htmlspecialchars($_POST['society'])),
        'message' => trim(htmlspecialchars($_POST['message']))
    ));
    //Sending mail
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $to = $dtest;

    $subject = "Nouveau contact de : ".trim(htmlspecialchars($_POST['name']));
    $message = "Formulaire : ".$_POST['name']." a envoyé ce message :\n";
    $message .= $_POST['name']." ".$_POST['surename']."\n";
    $message .= $_POST['email']." ".$_POST['society']."\n";
    $message .= $_POST['message']."\n";
    $message .= "\nNe pas répondre à ce message.\n\n++";
    $headers = 'From: contact@sarmates-music.com' . "\r\n" .
        'Reply-To: contact@sarmates-music.com' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);
}

$rep = ["status" => $status];
$rep += ["message" => $srvMsg];

// back for request fetch
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json");
echo json_encode($rep, JSON_UNESCAPED_UNICODE);

?>