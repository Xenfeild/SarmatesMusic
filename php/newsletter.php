<?php

require_once 'pdo.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $checkNewsletter = isset($_POST['checkNewsletter']) ? $_POST['checkNewsletter'] : '';

    if (empty($email)) {
        echo "Veuillez entrer une adresse e-mail.";
    } elseif (!$checkNewsletter) {
        echo "Veuillez accepter les conditions pour vous inscrire à la newsletter.";
    } else {
        $query = "INSERT INTO newsletter (mail) VALUES (:mail)";
        $insertData = $pdo->prepare($query);
        $insertData->bindParam(':mail', $email);
        $insertData->execute();

        echo "Vous êtes inscrit à la newsletter.";

        header('Location: ../index.html');
    }
}
