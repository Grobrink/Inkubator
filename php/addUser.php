<?php

	include 'connect.php';

	$name = htmlentities(($_POST['nickname']));
	$pw = $_POST['password'] . $securityString;
	$uniqid = uniqid('', false);
	$userExists = false;

	// Determine whether an account exists matching this username and password
 	if($stmt = $mysqli->prepare("SELECT id FROM inkubator_users WHERE nickname = ?")){

		// Bind the input parameters to the prepared statement
		$stmt->bind_param('s', $name);

		// Execute the query
		$stmt->execute();

		// Store the result so we can determine how many rows have been returned
		$stmt->store_result();

		if ($stmt->num_rows == 1) {

			$userExists = true;

	      	/* Close statement */
			$stmt->close();
		}
	}

	// Check if user nickname already exists before creating a new one
	if($userExists) {
		echo 'Nickname already exists';
	}
	else {

		/* Create a prepared statement */
		if($stmt = $mysqli->prepare("INSERT INTO inkubator_users (id, nickname, password, creation_date) VALUES (?, ?, md5(?), NOW())")){

			/* Bind parameters : s - string, b - blob, i - int, etc */
			$stmt->bind_param('sss', $uniqid, $name, $pw);

			/* Execute it */
			$stmt -> execute();

			session_start();
			$_SESSION['username'] = $name;

			echo 'user added';

			/* Close statement */
			$stmt->close();
	  	}
		else {
			/* Error */
			printf("(Add user) Prepared Statement Error: %s\n", $mysqli->error);
		}
	}


	$mysqli->close();
?>
