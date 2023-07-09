window.onload = function () {
 
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth-15;
    canvas.height = window.innerHeight-15;
   
    balls=[];
    ballNumber = 6;
   
    class Ball{
      constructor(x,y){ // ball의 기본 속성들을 정의 
        this.x = x;
        this.y = y;
        this.c = 'rgba(255,255,255,1)'; // 공의 색깔을 random으로 설정
        this.size = 24+Math.random()*100;
        this.angle = (Math.random()*(Math.PI*2));
        this.power = Math.random()*3+2;
        this.directionX = this.power * Math.cos(this.angle);
        this.directionY = this.power * Math.sin(this.angle);
      }
      update(){ // 프레임마다 속성들을 변화시킴 
        this.y += this.directionY; 
        this.x += this.directionX;
        if(this.y+this.size>canvas.height || this.y-this.size<0){ // 바운드 처리
          this.directionY *= -1;
          }
        if(this.x>canvas.width-this.size ) {
          this.x = canvas.width-this.size;
          this.directionX *= -1;
        } else if (this.x-this.size < 0){
          this.directionX *= -1;
        }
      }
      draw() {
        ctx.fillStyle = this.c;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'; // 내부 그림자의 색깔
        ctx.shadowBlur = 20; // 내부 그림자의 흐림 정도
        ctx.shadowOffsetX = 5; // 내부 그림자의 X축 오프셋
        ctx.shadowOffsetY = 5; // 내부 그림자의 Y축 오프셋
      
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.lineWidth = 0.1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
      
        // 그림자 속성 초기화
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }
   
    function init(){ // 공의 갯수만큼 공의 객체 생성
        for(i=0;i<ballNumber;i++){
          balls[i] = new Ball(canvas.width*0.5, canvas.height*0.5)
        }
    }
   
    function animate(){ // 매 프레임마다 벌어지는 일들
      ctx.fillStyle='rgba(255,255,255,1)'; // 전체 화면 지우기. 하얀색의 alpha값을 변경함에 따라 공의 잔상이 달라진다.
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for(i=0;i<ballNumber;i++){
        balls[i].update();
        balls[i].draw();
      }
   
      window.addEventListener('resize',function(){ // 화면 크기가 변하면 캔버스 크기도 변경해줌
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
      })
      requestAnimationFrame(animate);
    }
   
    init();
    animate();
   
    }
  