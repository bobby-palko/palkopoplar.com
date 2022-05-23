interface Props {
  name: string;
}

function PersonCard({ name }: Props) {
  return <p>Hello {name}!</p>;
}

export default PersonCard;
