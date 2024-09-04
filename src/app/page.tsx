'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Layout from './components/Layout';


export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const { push } = useRouter();

  const handleLogin = () => {
    push('/api/auth/login');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">

        {isLoading && <p>Loading profile...</p>}

        {error && (
          <div>
            <p>An error occurred: {error.message}</p>
            <button onClick={() => push('/api/auth/login')}>Log in</button>
          </div>
        )}

        {user && (
          <div>
            {/* <img src={user.picture} alt={user.name} className="rounded-full" /> */}
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            <button onClick={() => push('/api/auth/logout')}>Log out</button>
            {/*  */}
          </div>
        )}

        {!isLoading && !user && (
          <div>
            <p>You are not logged in!</p>
            <button onClick={handleLogin}>Log in</button>
          </div>
        )}


      </div>
    </Layout>
  );
}
