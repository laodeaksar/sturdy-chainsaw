import { Button, Input } from '@mantine/core';
import { GetServerSideProps } from 'next';
import {
  getCsrfToken,
  getProviders,
  signIn,
  getSession,
} from 'next-auth/react';

export default function SignIn({ csrfToken, providers }: any) {
  return (
    <>
      <form method="post" action="/api/auth/signin/email">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>Email address </label>
        <Input type="email" id="email" name="email" />
        <Button type="submit">Sign in with Email</Button>
      </form>
      {Object.values(providers).map((provider: any) => {
        if (provider.name === 'Email') {
          return;
        }

        return (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </Button>
          </div>
        );
      })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();

  return {
    props: {
      csrfToken,
      providers,
    },
  };
};
