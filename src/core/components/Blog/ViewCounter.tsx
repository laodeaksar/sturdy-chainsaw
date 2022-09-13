import React from 'react';

import { trpc } from '~/utils/trpc';

const ViewCounter = ({ slug }: { slug: string }) => {
  const { data } = trpc.useQuery(['posts.get-views', { slug }]);

  const views = new Number(data);

  React.useEffect(() => {
    const { mutate } = trpc.useMutation(['posts.set-views']);

    if (process.env.NODE_ENV === 'production') {
      mutate(slug as any);
    }
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '---'} views`}</span>;
};

export default ViewCounter;
