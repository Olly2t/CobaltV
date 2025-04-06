<?php
// Restrict to localhost
if ($_SERVER['REMOTE_ADDR'] !== '192.168.7.1') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = htmlspecialchars($_POST['title']);
    $description = htmlspecialchars($_POST['description']);

    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) mkdir($uploadDir);

    $thumbnailPath = $uploadDir . uniqid() . '_' . basename($_FILES['thumbnail']['name']);
    $filePath = $uploadDir . uniqid() . '_' . basename($_FILES['file']['name']);

    move_uploaded_file($_FILES['thumbnail']['tmp_name'], $thumbnailPath);
    move_uploaded_file($_FILES['file']['tmp_name'], $filePath);

    $item = [
        "title" => $title,
        "description" => $description,
        "thumbnail" => $thumbnailPath,
        "file" => $filePath
    ];

    $dataFile = 'data.json';
    $data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : [];
    $data[] = $item;
    file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

    header("Location: index.html");
}
?>
