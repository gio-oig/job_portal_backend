export class Company {
  constructor(
    public company_name: string,
    public company_description: string,
    public user_account_id: number,
    public avatar: string | undefined,
    public avatar_id: string | undefined
  ) {}
}
