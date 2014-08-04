<?php

	include 'connect.php';

	$name = htmlentities(($_POST['nickname']));
	$pw = $_POST['password'] . $securityString;

	// Determine whether an account exists matching this username and password
 	if($stmt = $mysqli->prepare("SELECT id FROM inkubator_users WHERE nickname = ? and password = md5(?)")){

		// Bind the input parameters to the prepared statement
		$stmt->bind_param('ss', $name, $pw);

		// Execute the query
		$stmt->execute();

		// Store the result so we can determine how many rows have been returned
		$stmt->store_result();

		if ($stmt->num_rows == 1) {

			// Bind the returned user ID to the $id variable
			$stmt->bind_result($id);
			$stmt->fetch();

			// Update the account's last_login column
			$stmt = $mysqli->prepare("UPDATE inkubator_users SET last_login = NOW() WHERE nickname = ?");
			$stmt->bind_param('s', $name);
			$stmt->execute();

			session_start();
			$_SESSION['username'] = $name;

			echo 'authentified';

	      	/* Close statement */
			$stmt->close();
		}
	}
	else {
		/* Error */
		printf("(Login) Prepared Statement Error: %s\n", $mysqli->error);
	}
?>
