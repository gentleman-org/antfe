import { Button } from '~/components/ui/button';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export interface SocialLinksProps {
  github?: string;
  twitter?: string;
  linkedin?: string;
  email?: string;
}

export default function SocialLinks({ github, twitter, linkedin, email }: SocialLinksProps) {
  const links = [
    { href: github, icon: Github, label: 'GitHub', platform: 'github' },
    { href: twitter, icon: Twitter, label: 'Twitter', platform: 'twitter' },
    { href: linkedin, icon: Linkedin, label: 'LinkedIn', platform: 'linkedin' },
    { href: `mailto:${email}`, icon: Mail, label: 'Email', platform: 'email' },
  ].filter((link) => link.href);

  return (
    <div className="my-6 flex flex-wrap gap-4">
      {links.map(({ href, icon: Icon, label, platform }) => (
        <Button key={platform} variant="outline" size="sm" asChild className="gap-2">
          <a href={href} target={platform !== 'email' ? '_blank' : undefined} rel={platform !== 'email' ? 'noopener noreferrer' : undefined} className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {label}
          </a>
        </Button>
      ))}
    </div>
  );
}
