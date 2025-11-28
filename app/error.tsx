"use client";

interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  return <p>Could not fetch the list of cars. {error.message}</p>;
};

export default Error;
