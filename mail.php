<?php
$name = $_POST['name'];
$email = $_POST['email'];
$email_admin =  'shatskyat@mail.ru,svilake@gmail.com';
$message = $_POST['message'];


$from =  'сайт GLORY & CO.';
$subject='Заявка'; 
$msg = "<b>Ім'я</b>: $name<br />
<b>E-mail</b>: $email<br />
<b>Повідомлення</b>: $message<br />

";
$mail = $email_admin; 
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= "Content-transfer-encoding: 8bit\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";
$headers .= "From: $from\r\n";
$headers .='From: '.$email;
$headers .=' Reply to:'.$mail;
	 
$mail_sent= mail($mail,$subject,$msg,$headers);
?>