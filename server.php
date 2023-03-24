<?php
$_POST = json_decode(file_get_contents("php://input"), true); // закомментировать, если используем без json
echo var_dump($_POST);