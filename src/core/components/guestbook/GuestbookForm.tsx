import React from 'react';

import { Button, Flex, Text, TextInput } from '@laodeaksarr/design-system';
import { Guestbook } from 'constants/schemas';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { trpc } from '~/utils/trpc';

function GuestbookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Guestbook>();
  const { mutate, error, isLoading } = trpc.useMutation(['guestbook.add'], {
    async onSuccess() {
      toast.success('Thank you for your comment!');
    },
    async onError() {
      toast.error('Something went wrong. Please try again later.');
    },
    async onMutate() {
      toast.loading('Posting your comment...');
    }
  });

  const onSubmit: SubmitHandler<Guestbook> = async (data) => {
    mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          alignItems="flex-start"
          gap={3}
          direction={{
            '@initial': 'row',
            '@media (max-width: 500px)': 'column'
          }}
        >
          <TextInput
            aria-label="Message"
            disabled={isLoading}
            placeholder="Your message..."
            id="input-message"
            // onChange={() => {}}
            {...register('body')}
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
      {errors ? (
        <Message isError>{errors.body?.message}</Message>
      ) : (
        /*) : form.state === Form.Success ? (
        <Message>{form?.message as string}</Message>*/
        <Text
          as="p"
          size={1}
          css={{
            marginTop: '$2',
            marginBottom: 0
          }}
        >
          Your information is only used to display your name and reply by email.
        </Text>
      )}
      <Toaster />
    </>
  );
}

export default GuestbookForm;

export const Message = ({
  children,
  isError
}: React.PropsWithChildren<{ isError?: boolean }>) => (
  <Text
    as="p"
    size={2}
    css={{
      marginTop: '$2',
      marginBottom: 0
    }}
    variant={isError ? 'danger' : 'success'}
  >
    {children}
  </Text>
);
