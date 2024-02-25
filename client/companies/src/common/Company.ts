export interface Founder {
  full_name: string;
  title: string;
}

export interface Company {
  id: number;
  name: string;
  city: string;
  state: string;
  short_description: string;
  long_description: string;
  founded_date: Date;
  founders: Founder[];
}
