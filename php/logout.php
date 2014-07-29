<?php
	session_start();
	unset($_SESSION['username']);

	echo 'session nettoyée';
?>
