<?php

class CometServer{
	static $delimiter = '//';
	private $_multipart;
	
	public function __construct($multipart = true){
		set_time_limit(0);
		$this->_multipart = $multipart;
	}
	
	public function header(){
		if ($this->_multipart){
			header("Content-type: multipart/x-mixed-replace;boundary=".self::$delimiter);
			echo '--'.self::$delimiter."\n";
		}
	}
	
	public function run($fn, $params = NULL){
		while( true ){
			$fn($this, $params);
			sleep(1);
		}
	}
	
	public function send($data){
		if ($this->_multipart){
			echo "Content-type: text/plain\n\n";
		}
		
		echo $data."\n";
		
		if ($this->_multipart){
			echo '--'.self::$delimiter."\n";
			ob_flush();
			flush();
		}else{
			sleep(1);
			$this->close();
		}
	}
	
	public function close(){
		if ($this->_multipart){
			echo '--'.self::$delimiter."-\n";
		}
		exit();
	}
}

