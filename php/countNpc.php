<?php

	include 'connect.php';

	$count = 0;

	/* Create a prepared statement */
	if($stmt = $mysqli->prepare("SELECT quantity FROM inkubator_npcCount")){

		/* Execute it */
		$stmt -> execute();

        /* store result */
        $stmt->store_result();

        $stmt->bind_result($value);

        while ($stmt->fetch()) {
          $count = $value + 1;
        }

		/* Close statement */
		$stmt->close();
	}
	else {
		/* Error */
		printf("(Get count) Prepared Statement Error: %s\n", $mysqli->error);
	}

	/* Create a prepared statement */
	if($stmt = $mysqli->prepare("UPDATE inkubator_npcCount SET quantity = ?")){

		/* Bind parameters : s - string, b - blob, i - int, etc */
		$stmt->bind_param('i', $count);

		/* Execute it */
		$stmt -> execute();

		/* Close statement */
		$stmt->close();
		}
	else {
		/* Error */
		printf("(Update count) Prepared Statement Error: %s\n", $mysqli->error);
	}


	$mysqli->close();
?>
