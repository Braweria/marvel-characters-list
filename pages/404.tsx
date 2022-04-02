import Link from 'next/link';

export default function FourOhFour() {
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </div>
  );
}
