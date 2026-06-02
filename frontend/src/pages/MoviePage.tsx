import { useParams } from "react-router-dom";

export function MoviePage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Movie page</h1>
      <p>Movie ID: {id}</p>
    </div>
  );
}