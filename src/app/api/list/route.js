
export async function GET(request) {
    const code = [
        { src: '/images/banner/banner_1.jpg', alt: '이미지 1' },
        { src: '/images/banner/banner_2.png', alt: '이미지 2' },
        { src: '/images/banner/banner_3.png', alt: '이미지 3' },
        { src: '/images/banner/banner_4.png', alt: '이미지 4' },
        { src: '/images/banner/banner_5.png', alt: '이미지 5' },
        { src: '/images/banner/banner_6.png', alt: '이미지 6' },
        { src: '/images/banner/banner_7.png', alt: '이미지 7' },
        { src: '/images/banner/banner_8.png', alt: '이미지 8' },
        { src: '/images/banner/banner_9.png', alt: '이미지 9' },
    ];
    return new Response(JSON.stringify({ message: 'Hello, world!', code }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }