<?php

	include 'connect.php';

	$id = htmlentities(($_POST['id']),ENT_QUOTES,'UTF-8');
	$userId = htmlentities(($_POST['userId']),ENT_QUOTES,'UTF-8');

	/* Create a prepared statement */
   	if($stmt = $mysqli->prepare("SELECT list FROM `inkubator_npclists` WHERE id = ? AND userId = ?")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('ss', $id, $userId);

      	/* Execute it */
      	$stmt -> execute();

    	$stmt->bind_result($x);
    	header('Content-Type: application/text; charset=utf-8');
        while($stmt->fetch()) {
            echo $x;
        }
      	/* Close statement */
      	$stmt->close();
  	}
	else {
		/* Error */
		printf("(Load npc list) Prepared Statement Error: %s\n", $mysqli->error);
	}

	$mysqli->close();
?>
