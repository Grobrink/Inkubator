<?php

	include 'connect.php';

   session_start();

   $name = ($_POST['name']);
   $userName = $_SESSION['username'];

	/* Create a prepared statement */
   if($stmt = $mysqli->prepare("DELETE FROM inkubator_npclists WHERE name = ? AND userName = ?")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('ss', $name, $userName);

      	/* Execute it */
      	$stmt -> execute();

      	/* Close statement */
      	$stmt->close();
  	}
	else {
		/* Error */
		printf("(Delete list) Prepared Statement Error: %s\n", $mysqli->error);
	}

   $mysqli->close();
?>
