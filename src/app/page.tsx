'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';
import File from './components/File';


export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const { push } = useRouter();



  return (
    <Layout>
      <div className="flex justify-center items-center  ">
        <File />
      </div>
    </Layout>
  );
}
