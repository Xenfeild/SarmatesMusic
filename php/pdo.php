<?php
// connect to data base
$user = "root";
$password = '';

//  PDO METHOD
try {
    $pdo = new PDO('mysql:host=localhost;dbname=sarmatesnew', $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage();
}
?>