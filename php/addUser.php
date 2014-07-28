<?php

	include 'connect.php';

	$name = htmlentities(($_POST['nickname']));
	$pw = $_POST['password'];
	$uniqid = uniqid('', false);

	/* Create a prepared statement */
   	if($stmt = $mysqli->prepare("INSERT INTO inkubator_users (id, nickname, password, creation_date) VALUES (?, ?, md5(?), NOW())")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('sss', $uniqid, $name, $pw);

      	/* Execute it */
      	$stmt -> execute();

      	/* Close statement */
      	$stmt->close();
  	}
	else {
		/* Error */
		printf("(Add user) Prepared Statement Error: %s\n", $mysqli->error);
	}

	$mysqli->close();
?>
