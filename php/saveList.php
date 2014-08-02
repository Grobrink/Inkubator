<?php

	include 'connect.php';

   session_start();

   $name = ($_POST['name']);
   $list = ($_POST['list']);
   $userName = $_SESSION['username'];
   $uniqid = uniqid('', false);

   if($stmt = $mysqli->prepare("SELECT id FROM inkubator_npclists WHERE name = ? AND userName = ?")){

      /* Bind parameters : s - string, b - blob, i - int, etc */
      $stmt -> bind_param('ss', $name, $userName);

      $stmt -> execute();

      $stmt->store_result();

      if ($stmt->num_rows == 1) {

         if($stmt = $mysqli->prepare("UPDATE inkubator_npclists SET list = ?, creation_date = NOW() WHERE name = ? AND userName = ?")){

            /* Bind parameters : s - string, b - blob, i - int, etc */
            $stmt -> bind_param('sss', $list, $name, $userName);

            $stmt -> execute();

            $stmt -> close();
         }
         else {
            printf("(Update list) Prepared Statement Error: %s\n", $mysqli->error);
         }
      }
      else {
         if($stmt = $mysqli->prepare("INSERT INTO inkubator_npclists (userName, name, id, list, creation_date) VALUES (?, ?, ?, ?, NOW())")){

            /* Bind parameters : s - string, b - blob, i - int, etc */
            $stmt -> bind_param('ssss', $userName, $name, $uniqid, $list);

            $stmt -> execute();

            $stmt -> close();
         }
         else {
            printf("(Save list) Prepared Statement Error: %s\n", $mysqli->error);
         }
      }
   }
   else {
      printf("(Search existing list) Prepared Statement Error: %s\n", $mysqli->error);
   }

   $mysqli->close();
?>
