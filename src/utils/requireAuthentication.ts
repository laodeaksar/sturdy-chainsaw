import { authOptions } from '~/pages/api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

export const requireAuthentication = async (context: any, cb: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/unauthenticated',
        permanent: false,
      },
    };
  }

  return cb();
};
