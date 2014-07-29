<?php

	include 'connect.php';

  session_start();
  $userName = $_SESSION['username'];
	$name = htmlentities(($_POST['name']),ENT_QUOTES,'UTF-8');

	/* Create a prepared statement */
   	if($stmt = $mysqli->prepare("SELECT list FROM `inkubator_npclists` WHERE userName = ? AND name = ?")){

      	/* Bind parameters : s - string, b - blob, i - int, etc */
      	$stmt->bind_param('ss', $userName, $name);

      	/* Execute it */
      	$stmt -> execute();

        header('Content-Type: application/text; charset=utf-8');

        /* store result */
        $stmt->store_result();

        $stmt->bind_result($list);

        while ($stmt->fetch()) {
          echo $list;
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
