'use client';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    router.push('/blogs');
    return null;
}

export default Page