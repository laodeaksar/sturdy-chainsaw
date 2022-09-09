import React from 'react';
import { useForm } from '@mantine/form';

import { Button, Flex, Text, TextInput } from '@laodeaksarr/design-system';
import { trpc } from '~/utils/trpc';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';

function GuestbookForm() {
  const form = useForm({
    initialValues: {
      body: '',
    },
  });

  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.useMutation(['guestbook.add'], {
    onSuccess: () => {
      form.reset();
      updateNotification({
        id: 'creating-message',
        color: 'teal',
        title: 'Message created',
        message: 'Message created successfully',
        icon: <IconCheck />,
        autoClose: 2000,
      });
      utils.invalidateQueries(['guestbook.all']);
    },
  });

  const handleSubmit = async (data: any) => {
    showNotification({
      id: 'creating-message',
      loading: true,
      title: 'Creating messanges',
      message: 'You will be redirected when your message has been created',
      autoClose: false,
      disallowClose: true,
    });
    
    return mutate(data);
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex
          alignItems="flex-start"
          gap={3}
          direction={{
            '@initial': 'row',
            '@media (max-width: 500px)': 'column',
          }}
        >
          <TextInput
            aria-label="Message"
            disabled={isLoading}
            placeholder="Your message..."
            id="input-message"
            {...form.getInputProps('body')}
          />
          <Button
            aria-label="Send message"
            disabled={isLoading}
            isLoading={isLoading}
            title="Send message"
            type="submit"
            variant="primary"
          >
            {!isLoading && 'Send'}
          </Button>
        </Flex>
      </form>
      <Text
        as="p"
        size={1}
        css={{
          marginTop: '$2',
          marginBottom: 0,
        }}
      >
        Your information is only used to display your name and reply by email.
      </Text>
    </>
  );
}

export default GuestbookForm;

export const Message = ({
  children,
  isError,
}: React.PropsWithChildren<{ isError?: boolean }>) => (
  <Text
    as="p"
    size={2}
    css={{
      marginTop: '$2',
      marginBottom: 0,
    }}
    variant={isError ? 'danger' : 'success'}
  >
    {children}
  </Text>
);
