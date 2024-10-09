
export async function GET(request) {
    const code = [
        { src: '/images/img.png', alt: '이미지 1' },
        { src: '/images/img2.png', alt: '이미지 2' },
        { src: '/images/img4.png', alt: '이미지 3' },
        { src: '/images/img3.png', alt: '이미지 4' },
        { src: '/images/img2.png', alt: '이미지 5' },
    ];
    return new Response(JSON.stringify({ message: 'Hello, world!', code }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }