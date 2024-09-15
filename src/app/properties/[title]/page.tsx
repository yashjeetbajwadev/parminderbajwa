'use client';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    router.push('/properties');
    return null;
}

export default Page