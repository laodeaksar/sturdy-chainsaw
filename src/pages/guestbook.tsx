import { signIn, signOut, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  H2,
  Icon,
  Spinner,
  Text,
  TextInput,
} from "@laodeaksarr/design-system";

import Layout from "../core/layout";
import { trpc } from "../utils/trpc";
import { Guestbook } from "../constants/schemas";

function GuestbookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Guestbook>();
  const { mutate, error } = trpc.useMutation(["guestbook.add"], {
    async onSuccess() {
      toast.success("Thank you for your comment!");
    },
    async onError() {
      toast.error("Something went wrong. Please try again later.");
    },
    async onMutate(){
      toast.loading("Posting your comment...");
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
            "@initial": "row",
            "@media (max-width: 500px)": "column",
          }}
        >
          <TextInput
            {...register("body", {
              required: "Don't forget to write something",
              maxLength: 200,
            })}
            aria-label="Your message"
            disabled={isSubmitting}
            placeholder="Your message..."
            id="input-message"
          />
          <Button
            aria-label="Send message"
            disabled={isSubmitting}
            title="Send message"
            type="submit"
            variant="primary"
          >
            {isSubmitting ? <Spinner /> : "Send"}
          </Button>
        </Flex>
      </form>
      {errors ? (
        <Text
          size={2}
          variant="danger"
          css={{
            marginTop: "$2",
            marginBottom: 0,
          }}
        >
          {errors.body?.message}
        </Text>
      ) : (
        <Text
          size={1}
          css={{
            marginTop: "$2",
            marginBottom: 0,
          }}
        >
          Your information is only used to display your name and reply by email.
        </Text>
      )}
    </>
  );
}

function LogInWithGithub() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/signin/github"
      onClick={(e) => {
        e.preventDefault();
        signIn("github");
      }}
    >
      <Button variant="primary" endIcon={<Icon.Github />}>
        Signup with Github
      </Button>
    </a>
  );
}

function GuestbookBody() {
  const { status } = useSession();

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "unauthenticated") return <LogInWithGithub />;

  return <GuestbookForm />;
}

function Entry({ entry }: { entry: Guestbook }) {
  const { data } = useSession();
  const { mutate, error } = trpc.useMutation(["guestbook.delete"]);

  const handleDelete = async (id: any) => {
    mutate(id);
  };

  return (
    <Box
      css={{
        "&:not(:last-child)": {
          paddingBottom: "2rem",
          marginBottom: "2rem",
          borderBottom: "1px solid var(--laodeaksar-border-color)",
        },
      }}
    >
      <Text size={4} weight={3} css={{ marginBottom: 2 }}>
        {entry.created_by}
      </Text>
      <Flex css={{ marginBottom: 2 }}>{entry.body}</Flex>
      <Grid gapX={2} flow="column" align="center" justify="between" mt={3}>
        <time>
          {new Date(entry.updated_at).toLocaleDateString("en", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </time>
        {data?.user?.email === entry.email && (
          <Button
            css={{
              $$background: "transparent !important",
              $$color: "var(--laodeaksar-colors-typeface-tertiary)",

              "&:hover": {
                "&:not(:disabled)": {
                  $$border: "var(--laodeaksar-colors-danger)",
                  $$color: "var(--laodeaksar-colors-danger)",
                },
              },

              "&:focus-visible": {
                $$border: "var(--laodeaksar-colors-danger)",
                $$color: "var(--laodeaksar-colors-danger)",
              },
            }}
            onClick={handleDelete}
            variant="icon"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            }
          />
        )}
      </Grid>
    </Box>
  );
}

function GuestbookEntries() {
  const { data: session } = useSession();
  const { data: entries } = trpc.useQuery(["guestbook.all"]);

  return (
    <Card css={{ marginTop: "$4" }}>
      <Card.Header css={{ fontSize: "$3" }}>
        All Message
        {session && (
          <Button
            variant="icon"
            css={{ my: 4, $$background: "transparent !important" }}
            onClick={() => signOut()}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            }
          />
        )}
      </Card.Header>
      <Card.Body>
        {entries?.map((entry) => (
          <Entry key={entry.id} entry={entry} />
        ))}
      </Card.Body>
    </Card>
  );
}

export default function Guestbook() {
  return (
    <Layout footer header headerProps={{ offsetHeight: 256 }}>
      <Grid columns="medium" gapX={4} gapY={12} all>
        <div>
          <H2>Guestbook</H2>
          <Text>
            Leave a comment below. It could be anything - appreciation,
            information, wisdom, or even humor. Surprise me!
          </Text>
          <Card>
            <Card.Header css={{ fontSize: "$5" }}>
              Sign the Guestbook
            </Card.Header>
            <Card.Body>
              <Text
                css={{
                  marginTop: 0,
                  marginBottom: "$2",
                }}
              >
                Share a message for a future visitor of my site.
              </Text>
              <GuestbookBody />
            </Card.Body>
          </Card>
          <GuestbookEntries />
          <Toaster />
        </div>
      </Grid>
    </Layout>
  );
}
