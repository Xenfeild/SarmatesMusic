    <?php
    // cnx BDD -> user et mots de passe à définir

    $dest = 'mon.mail@mail.com';
    $dbName = 'Nom_BdD';
    $table = 'table_de_la_Base';

    $user = 'user_name';
    $pwd = 'passW0rd';    
    
    // retourne l'adresse IP du client
    // Paramètres :
    // Entrée : Aucun
    // Sortie : string
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

    date_default_timezone_set('Europe/Paris');
    $userIp = getUserIpAddr();
    $dateReq = $_SERVER['REQUEST_TIME'];
    // date autorisation : $dateReq + 5 minutes
    $dateAut = $dateReq + (5*60);

    // Variables par défaut réponse Js fetch
    $rep = [];
    $status = 200;
    $srvMsg = "Le message est transmis";

    try {
        $db = new PDO('mysql:host=localhost;dbname='.$dbName, $user, $pwd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $e) {
        print "<br>Error: " . $e->getMessage()."<br>";
        die;
    }

    // Lecture des IP et des dates dans la BDD
    $historique = $db->query('SELECT ip, authTime FROM '.$table.' WHERE ip="'.$userIp.'" AND authTime>"'.$dateReq.'";');
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
        $req = $db->prepare('INSERT INTO .$table.(ip, authTime, prenom, nom, mail, tel, msg)
         VALUES(:userIp, :dateAut, :prenom, :nom, :mail, :tel, :msg)');
        //Ecriture dans la BDD
        $req->execute(array(
	        'userIp' => $userIp,
            'dateAut' => $dateAut,
	        'prenom' => trim(htmlspecialchars($_POST['prenom'])),
            'nom' => trim(htmlspecialchars($_POST['nom'])),
	        'mail' => trim(htmlspecialchars($_POST['email'])),
	        'tel' => trim(htmlspecialchars($_POST['tel'])),
            'msg' => trim(htmlspecialchars($_POST['message']))
	    ));
        //Envoie mail
        ini_set( 'display_errors', 1 );
        error_reporting( E_ALL );
        
        $to = $dest;
        
        $subject = "Nouveau contact de : ".trim(htmlspecialchars($_POST['prenom']));
        $message = "Formulaire : " .$_POST['prenom']." a envoyé ce message :\n";
        $message = $message.$_POST['prenom']." ".$_POST['nom']."\n";
        $message = $message.$_POST['email']." ".$_POST['tel']."\n";
        $message = $message.$_POST['message']."\n";
        $message = $message."\nNe pas répondre à ce message.\n\n++";
        $headers = 'From: contact@dark.pajor.go.yn.fr' . "\r\n" .
                    'Reply-To: contact@dark.pajor.go.yn.fr' . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();
        mail($to, $subject, $message, $headers);
    }

    $rep = ["status" => $status];
    $rep += ["message" => $srvMsg];


    // Retour pour requette Js fetch
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json");
    echo json_encode($rep, JSON_UNESCAPED_UNICODE);

    ?>
