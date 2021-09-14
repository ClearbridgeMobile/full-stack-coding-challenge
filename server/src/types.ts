
export interface Company {
  companyId?: string;
  founderId?: string;
  name: string;
  city: string;
  state: string;
  description: string;
  founded: Date;
  createdAt?: Date;
  updatedAt?: Date;

}

export interface Founder {
  founderId?: string;
  firstName: string;
  lastName: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}