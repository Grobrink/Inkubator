<?php

	/* Create a new mysqli object with database connection parameters */
	$sqlHost = 'localhost';
	$sqlUser = 'root';
	$sqlPass = '';
	$db = 'inkubator';
   	$mysqli = new mysqli($sqlHost, $sqlUser, $sqlPass, $db);

	if(mysqli_connect_errno()) {
	    echo "Connection Failed: " . mysqli_connect_errno();
	    exit();
    }

?>
