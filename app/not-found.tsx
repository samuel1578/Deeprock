import { Container, Section } from '@/components/layout/Container';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Section className="bg-white flex items-center justify-center min-h-[60vh]">
      <Container>
        <div className="text-center">
          <h1 className="font-display text-6xl text-basalt mb-4">404</h1>
          <h2 className="font-display text-3xl text-basalt mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-graphite mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <ButtonLink href="/" variant="primary" size="lg">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
