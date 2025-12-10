export interface NavbarProps {
  isTransparent?: boolean;
}

export interface MenuItem {
  name: string;
  href: string;
}

export interface AccordionSection {
  title: string;
  links: string[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}
