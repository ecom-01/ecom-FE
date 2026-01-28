import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { slug } = useParams();
  return <h1>Product Detail: {slug}</h1>;
}
