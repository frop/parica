function Parica(url){
    var $P = this;

    if( window.XMLHttpRequest ){
	    $P.xhr = new XMLHttpRequest();
    }else if( window.ActiveXObject ){
	    $P.xhr = new ActiveXObject(Microsoft.XMLHTTP);
    }
    
    this.xhr.url = url;
    
    this.start = function(){
        $P.xhr.abort();
        if( $P.xhr.multipart != null ){
	        $P.xhr.multipart = true; 
	        $P.xhr.open('GET', $P.xhr.url+"?multipart=1", true);
        }else{
	        $P.xhr.open('GET', $P.xhr.url, true);
        }
        $P.xhr.onreadystatechange = $P.listen;
        $P.xhr.send(null);
    }

    this.listen = function(){
        if( $P.xhr.readyState == 4 ){
	        if( $P.xhr.status == 200 ){
		        $P.trigger_event($P.xhr.responseText);
	        }
	        if( ! $P.xhr.multipart ){
		        $P.start();
	        }
        }
    }
    
    this.trigger_event = function(data){
        var eventName = 'parica_received';

        var event = new CustomEvent(eventName, { 'detail': data });

        element = document;
        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
         element.fireEvent("on" + event.eventType, event);
        }
    }
}

