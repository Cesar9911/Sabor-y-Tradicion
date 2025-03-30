<?php
$host = 'dpg-cvjkidh5pdvs73ffik5g-a';
$dbname = 'sabor_tradicion_db';
$user = 'sabor_tradicion_db_user';
$password = '5ryRuoqKZyrUWOjJPdWjmpFk9pd1QZTn';

try {
    $db = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>