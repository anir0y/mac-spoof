(function(){
    function addComputer(class_name,name,mac,disable_input){
        let tmp_img = document.createElement('IMG');
        tmp_img.src = 'img/computer.png';
        let tmp_span = document.createElement('SPAN');
        tmp_span.innerHTML = name;
        let tmp_div = document.createElement('DIV');
        tmp_div.innerHTML = 'MAC Address';
        let tmp_input = document.createElement('INPUT');
        tmp_input.value = mac;
        if( disable_input ){
            tmp_input.disabled = true;
        }else{
            tmp_input.id='mac';
        }
        document.getElementsByClassName(class_name)[0].appendChild(tmp_img);
        document.getElementsByClassName(class_name)[0].appendChild(tmp_span);
        document.getElementsByClassName(class_name)[0].appendChild(tmp_div);
        document.getElementsByClassName(class_name)[0].appendChild(tmp_input);
        if( !disable_input ){
            let tmp_button = document.createElement('BUTTON');
            tmp_button.innerHTML='Request Site';
            tmp_button.id='packet';
            tmp_button.classList.add('thm_button');
            document.getElementsByClassName(class_name)[0].appendChild(tmp_button);
        }
    }
    addComputer('computer1','Ravan','04:9E:44:99:A3:12',false);
    addComputer('computer2','Ram','00:12:32:2F:33:39',true);
    setInterval(function(){
        let packet = document.createElement('DIV');
        packet.classList.add('packet');
        packet.style.left='410px';
        packet.style.top='-3px';
        packet.packet_data = {
            'mac'   :   '00:12:32:2F:33:39',
            'hop'   :   0
        };
        document.getElementsByClassName('computer1')[0].appendChild(packet);
        packet.addEventListener('transitionend',function(){
            if( this.packet_data.hop === 2 ){
                this.remove();
            }
            if( this.packet_data.hop === 1 ){
                this.packet_data.hop = 2;
                this.style.top='-550px';
                this.style.left='260px';
                this.style.zIndex='1';
            }
            if( this.packet_data.hop === 0 ){
                this.packet_data.hop = 1;
            }
        });
        setTimeout(function(p){
            packet.style.left='260px';
            p.style.top='-270px';
        },100,packet);
    },1500);
    document.getElementById('packet').addEventListener('click',function(){
        let packet = document.createElement('DIV');
        packet.classList.add('packet');
        packet.style.left='75px';
        packet.style.top='0px';
        packet.style.backgroundColor='#3f59ff';
        packet.packet_data = {
            'mac'   :   document.getElementById('mac').value,
            'hop'   :   0
        };
        document.getElementsByClassName('computer1')[0].appendChild(packet);
        packet.addEventListener('transitionend',function(){
            if( this.packet_data.hop === 4 ){
                this.remove();
            }
            if( this.packet_data.hop === 2 ){
                this.packet_data.hop = 3;
                if( this.packet_data.mac === '00:12:32:2F:33:39' ) {
                    this.remove();
                    alert('ARISHTI{YOU-SPOOFED-MAC}');
                }
            }
            if( this.packet_data.hop === 1 ){
                this.packet_data.hop = 2;
                if( this.packet_data.mac === '00:12:32:2F:33:39' ){
                    this.style.top='-550px';
                    this.style.left='260px';
                }else{
                    this.style.left=( Math.random() * (50 - 1) + 1) + 'px';
                    this.style.top='-' + ( Math.random() * (220 - 300) + 300) + 'px';
                    setTimeout(function(p){
                        p.packet_data.hop = 4;
                        p.style.opacity='0';
                    },5000,this)
                }
                this.style.zIndex='1';
            }
            if( this.packet_data.hop === 0 ){
                this.packet_data.hop = 1;
            }
        });
        setTimeout(function(p){
            packet.style.left='260px';
            p.style.top='-270px';
        },100,packet);
    });
})();