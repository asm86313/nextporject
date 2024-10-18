// pages/bouncing-balls.js
'use client';
import { useEffect, useRef, useState } from 'react';

export default function BouncingBalls() {
    const canvasRef = useRef(null);
    const [balls, setBalls] = useState([]);
    const [nextId, setNextId] = useState(0); // 다음 공의 ID를 관리

    // Ball 객체 생성
    class Ball {
        constructor(id, x, y, radius, dx, dy) {
            this.id = id; // 각 공의 고유 ID
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'blue';
            ctx.fill();
            ctx.closePath();

            // 공의 ID를 표시
            ctx.fillStyle = 'white'; // 텍스트 색상
            ctx.font = '12px Arial';
            ctx.fillText(this.id, this.x - this.radius / 2, this.y + this.radius / 2); // 공의 중앙에 ID 표시
        }

        update(canvas, splitBall) {
            this.x += this.dx;
            this.y += this.dy;

            // 벽에 부딪혔을 때 방향을 바꾸고 공을 나누기
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
                splitBall(this);
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
                splitBall(this);
            }
        }
    }

    // 공을 나누는 함수
    function splitBall(ball) {
        // 기존 공을 기준으로 새로운 공 두 개를 생성
        const newBall1 = new Ball(
          nextId,
          ball.x,
          ball.y,
          ball.radius,
          ball.dx,
          ball.dy
        );
        
        setBalls(prevBalls => {
            if (prevBalls.length < 5) {
                return [...prevBalls, newBall1];
            } else {
                return [...prevBalls];
            }
        });

        // 다음 ID 업데이트
        setNextId(prevId => prevId + 1); // 두 개의 새로운 공이 생성되므로 2를 더함
    }

    // 애니메이션 함수
    const animate = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balls.forEach(ball => {
            ball.draw(ctx);
            ball.update(canvas, splitBall);
        });

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        // 초기 공 추가
        setBalls([new Ball(0, 100, 100, 20, 2, 3)]); // 첫 번째 공에 ID 0을 부여
        setNextId(1); // 다음 공의 ID를 1로 초기화
    }, []);

    useEffect(() => {
        if (balls.length < 5) {
            animate();
        }
    }, [balls]);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Bouncing Balls</h1>
            <canvas
                ref={canvasRef}
                width="800"
                height="600"
                style={{ border: '1px solid black' }}
            />
        </div>
    );
}
