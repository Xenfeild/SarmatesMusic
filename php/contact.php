<?php
require_once 'pdo.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $prenom = isset($_POST['name']) ? $_POST['name'] : '';
    $nom = isset($_POST['surename']) ? $_POST['surename'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $societe = isset($_POST['society']) ? $_POST['society'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    if (empty($prenom) || empty($nom) || empty($email) || empty($message)) {
        echo "Veuillez remplir tous les champs obligatoires.";
    } else {
        $query = "INSERT INTO contacts (ip, authTime, prenom, nom, mail, society, msg, dateMsg) VALUES (:ip, :authTime, :prenom, :nom, :mail, :society, :msg, :dateMsg)";
        $insertData = $pdo->prepare($query);
        $insertData->bindParam(':ip', $_SERVER['REMOTE_ADDR']);
        $insertData->bindParam(':authTime', $_SERVER['REQUEST_TIME']);
        $insertData->bindParam(':prenom', $prenom);
        $insertData->bindParam(':nom', $nom);
        $insertData->bindParam(':mail', $email);
        $insertData->bindParam(':society', $societe);
        $insertData->bindParam(':msg', $message);
        $insertData->bindValue(':dateMsg', date('Y-m-d H:i:s'));
        
        // request execution
        $insertData->execute();

        echo "Votre message à été envoyé avec succés.";

        header('Location: ../index.html');
    }
}
?>