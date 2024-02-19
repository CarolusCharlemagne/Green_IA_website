<?php
$host = "localhost";
$username = "carolus";
$password = "AgfT14657@&";
$dbname = "GreenIA";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$pseudo = $_POST['pseudo'];

$stmt = $conn->prepare("SELECT utilisateur_id FROM utilisateur WHERE utilisateur_pseudo = ?");
$stmt->bind_param("s", $pseudo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(array("isUnique" => false));
} else {
    $insert = $conn->prepare("INSERT INTO utilisateur (utilisateur_pseudo) VALUES (?)");
    $insert->bind_param("s", $pseudo);
    $insert->execute();

    if ($insert->affected_rows > 0) {
        echo json_encode(array("isUnique" => true));
    } else {
        echo json_encode(array("isUnique" => false, "error" => "Impossible d'enregistrer le pseudo."));
    }
}

$stmt->close();
$conn->close();
?>
