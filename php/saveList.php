<?php

	include 'connect.php';

   session_start();

   $name = ($_POST['name']);
   $list = ($_POST['list']);
   $userName = $_SESSION['username'];
   $uniqid = uniqid('', false);

	/* Create a prepared statement */
   if($stmt = $mysqli->prepare("INSERT INTO inkubator_npclists (userName, name, id, list, creation_date) VALUES (?, ?, ?, ?, NOW())")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('ssss', $userName, $name, $uniqid, $list);

      	/* Execute it */
      	$stmt -> execute();

      	/* Close statement */
      	$stmt->close();
  	}
	else {
		/* Error */
		printf("(Save list) Prepared Statement Error: %s\n", $mysqli->error);
	}

   $mysqli->close();
?>
