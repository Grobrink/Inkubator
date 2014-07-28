<?php

	include 'connect.php';

   $name = ($_POST['name']);
   $list = ($_POST['list']);
   $userId = ($_POST['userId']);
   $uniqid = uniqid('', false);

	/* Create a prepared statement */
   if($stmt = $mysqli->prepare("INSERT INTO inkubator_npclists (userId, name, id, list) VALUES (?, ?, ?, ?)")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('ssss', $userId, $name, $uniqid, $list);

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
