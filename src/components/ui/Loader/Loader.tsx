"use client";

import { Container, Spinner, Text } from "./Loader.styles";

type LoaderProps = {
  message?: string;
};

const Loader = ({ message = "Loading matches..." }: LoaderProps) => {
  return (
    <Container>
      <Spinner />
      <Text>{message}</Text>
    </Container>
  );
};

export default Loader;
