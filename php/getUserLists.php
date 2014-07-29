<?php

	include 'connect.php';

  session_start();
  $userName = $_SESSION['username'];

	/* Create a prepared statement */
  if($stmt = $mysqli->prepare("SELECT name FROM `inkubator_npclists` WHERE userName = ?")){

    /* Bind parameters : s - string, b - blob, i - int, etc */
    $stmt->bind_param('s', $userName);

    /* Execute it */
    $stmt -> execute();

    $stmt->bind_result($name);

    header('Content-Type: application/text; charset=utf-8');
    // Must convert to a json object or someting else because writing html here is so ugly
    while($stmt->fetch()) {
        echo '<option value="'.$name.'">'.$name.'</options>';
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
