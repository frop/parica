<?php

require_once('../CometServer.php');

$server = new CometServer(isset($_GET['multipart']));

$server->header();

$server->run(function($s){
    $file = '/tmp/parica';
	if (is_file($file)){
	    $s->send(file_get_contents($file));
	    unlink($file);
	}
});

